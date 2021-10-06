// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/interfaces/IQuoterV2.sol";
import "./IPositionManager.sol";
import "hardhat/console.sol";

contract PositionManager is ERC721, IPositionManager, Ownable {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    ISwapRouter internal constant ROUTER = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
    IQuoterV2 internal constant QUOTER = IQuoterV2(0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6);
    uint8 public feeRate;
    mapping(address => uint256) private collectedFees;
    mapping(uint256 => Position) private positions;
    mapping(address => uint256) private userPositionsCounter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Financially Intelligent NFT", "FIN") { }

    function setFeeRate(uint8 _fee) external onlyOwner() {
        feeRate = _fee;
        emit FeeWasUpdated(_fee);
    }

    // slither-disable-next-line external-function
    function tokenURI(uint256 tokenId) public view override(ERC721, IERC721Metadata) returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return "";
    }

    function getPosition(uint256 tokenId) external view override returns(Position memory) {
        return positions[tokenId];
    }

    function getOwnedPositions() external view override returns(uint256[] memory) {
        uint256[] memory results = new uint256[](userPositionsCounter[msg.sender]);
        uint256 counter = 0;
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            // slither-disable-next-line incorrect-equality
            if (positions[i].owner == msg.sender) {
                results[counter] = i;
                counter++;
            }
        }
        return results;
    }

    function mint(PositionParams calldata params) external override returns(uint256 tokenId) {
        IERC20 token = IERC20(params.fromToken);

        require(token.allowance(msg.sender, address(this)) >= params.amount, "Allowance error");
        require(token.balanceOf(msg.sender) >= params.amount, "Balance error");
        token.safeTransferFrom(msg.sender, address(this), params.amount);

        // collect fees
        uint256 fee = params.amount * feeRate / 100;
        collectedFees[address(params.fromToken)] += fee;
        uint256 newAmount = params.amount - fee;

        _tokenIds.increment();
        tokenId = _tokenIds.current();

        Position memory position = Position({
            id: tokenId,
            owner: msg.sender,
            amount: newAmount,
            amountOut: 0,
            takeProfit: params.takeProfit,
            stopLoss: params.stopLoss,
            fromToken: params.fromToken,
            toToken: params.toToken,
            maxGasPrice: params.maxGasPrice,
            createdAt: block.timestamp
        });

        _mint(msg.sender, tokenId);
        positions[tokenId] = position;
        userPositionsCounter[msg.sender]++;

        emit PositionWasOpened(position);
    }

    function burn(uint256 tokenId) external override {
        require(_exists(tokenId), "Position not found");
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not the owner");

        _exit(tokenId);
    }

    function deposit(uint256 tokenId, uint256 amount) external override {
        require(_exists(tokenId), "Position not found");
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not the owner");

        Position memory position = positions[tokenId];
        IERC20 fromToken = IERC20(position.fromToken);

        require(fromToken.allowance(msg.sender, address(this)) >= amount, "Allowance error");
        require(fromToken.balanceOf(msg.sender) >= amount, "Balance error");

        position.amount += amount;
        positions[tokenId] = position;

        fromToken.safeTransferFrom(msg.sender, address(this), amount);

        emit PositionWasUpdated(position);
    }

    function withdraw(uint256 tokenId, uint256 amount) external override {
        require(_exists(tokenId), "Position not found");
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not the owner");

        Position memory position = positions[tokenId];
        require(amount >= position.amount, "Not enough liquidity");
        position.amount -= amount;
        positions[tokenId] = position;

        IERC20 token = IERC20(position.fromToken);
        token.safeTransfer(position.owner, amount);

        emit PositionWasUpdated(position);
    }

    function _exit(uint256 tokenId) internal {
        Position memory position = positions[tokenId];
        _burn(tokenId);
        delete positions[tokenId];
        userPositionsCounter[msg.sender]--;

        IERC20 token = IERC20(position.fromToken);
        if(token.allowance(address(this), address(ROUTER)) < position.amount)
            token.safeApprove(address(ROUTER), type(uint256).max);

        ISwapRouter.ExactInputSingleParams memory swapParams = ISwapRouter.ExactInputSingleParams({
            tokenIn: position.fromToken,
            tokenOut: position.toToken,
            fee: 500, // TODO fixme
            recipient: position.owner,
            deadline: block.timestamp + 15,
            amountIn: position.amount,
            amountOutMinimum: 0, // TODO frontrun me please
            sqrtPriceLimitX96: 0
        });
        position.amountOut = ROUTER.exactInputSingle(swapParams);

        emit PositionWasClosed(position);
    }

    function checkUpkeep(bytes calldata /*checkData*/) external override returns (bool upkeepNeeded, bytes memory performData) {
        uint256[] memory results = new uint256[](_tokenIds.current());
        uint256 counter = 0;

        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if(positions[i].owner != address(0)) {
                Position memory position = positions[i];

                IQuoterV2.QuoteExactInputSingleParams memory quoterParams = IQuoterV2.QuoteExactInputSingleParams({
                    tokenIn: position.fromToken,
                    tokenOut: position.toToken,
                    amountIn: position.amount,
                    fee: 500, // TODO fix me
                    sqrtPriceLimitX96: 0
                });
                (uint256 amountOut, , ,uint256 gasEstimate) = QUOTER.quoteExactInputSingle(quoterParams);

                if(gasEstimate <= position.maxGasPrice && ( position.stopLoss <= amountOut || amountOut > position.takeProfit)) {
                    results[counter++] = i;
                }
            }
        }

        if(results.length != 0) {
            upkeepNeeded = true;
            performData = abi.encode(results);
        }
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256[] memory positionIDs = abi.decode(performData, (uint256[]));

        for (uint256 i = 0; i < positionIDs.length; i++) {
            if(positions[i].owner != address(0)) {
                _exit(i);
            }
        }
    }

}
