// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "./interfaces/IPositionManager.sol";
import "hardhat/console.sol";

contract PositionManager is ERC721Burnable, IPositionManager, Ownable {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    ISwapRouter internal constant ROUTER = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
    uint8 public feeRate;
    mapping(address => uint256) private collectedFees;
    mapping(uint256 => Position) private positions;
    mapping(address => uint256) private userPositionsCounter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Financially Intelligent NFT", "FIN") {
    }

    function setFeeRate(uint8 _fee) external onlyOwner() {
        feeRate = _fee;
        emit FeeWasUpdated(_fee);
    }

    // slither-disable-next-line external-function
    function tokenURI(uint256 tokenId) public view override(ERC721, IERC721Metadata) returns (string memory) {
        require(_exists(tokenId), "Token doesn't exist");
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

    function mint(address holdToken, uint256 amount, uint256 stopLoss, uint256 takeProfit) external override returns(uint256 tokenId) {
        IERC20 token = IERC20(holdToken);

        require(token.allowance(msg.sender, address(this)) >= amount, "Allowance error");
        require(token.balanceOf(msg.sender) >= amount, "Balance error");
        token.safeTransferFrom(msg.sender, address(this), amount);

        _tokenIds.increment();
        tokenId = _tokenIds.current();

        Position memory position = Position({
            id: tokenId,
            owner: msg.sender,
            amount: amount,
            takeProfit: takeProfit,
            stopLoss: stopLoss,
            holdToken: holdToken,
            collateralToken: address(0),
            createdAt: block.timestamp
        });

        _mint(msg.sender, tokenId);
        positions[tokenId] = position;
        userPositionsCounter[msg.sender]++;

        emit PositionWasOpened(position);
    }

/*
    function mint(address holdToken, address collateralToken, uint256 amount, bool swapOnMint, uint256 stopLoss, uint256 takeProfit) external override returns(uint256 tokenId) {
        IERC20 token;
        if(swapOnMint)
            token = IERC20(collateralToken);
        else
            token = IERC20(holdToken);

        require(token.allowance(msg.sender, address(this)) >= amount, "Allowance error");
        require(token.balanceOf(msg.sender) >= amount, "Balance error");
        token.safeTransferFrom(msg.sender, address(this), amount);
        
        // collect fees
        uint256 fee = amount * feeRate / 100;
        collectedFees[address(token)] = fee;
        uint256 newAmount = amount - fee;

        _tokenIds.increment();
        tokenId = _tokenIds.current();
        
        Position memory position = Position({
            id: tokenId,
            owner: msg.sender,
            amount: newAmount,
            takeProfit: takeProfit,
            stopLoss: stopLoss,
            holdToken: holdToken,
            collateralToken: collateralToken,
            createdAt: block.timestamp
        });

        if(swapOnMint) {
            position.amount = _swap(position.collateralToken, position.holdToken, position.amount, position.owner);
        }

        _mint(msg.sender, tokenId);
        positions[tokenId] = position;
        userPositionsCounter[msg.sender]++;

        emit PositionWasOpened(position);
    }
*/

    // slither-disable-next-line external-function
    function burn(uint256 tokenId, bool swapOnBurn) external override {
        require(_exists(tokenId), "Position not found");
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not the owner");

        Position memory position = positions[tokenId];

        if(swapOnBurn) {
            position.amount = _swap(position.holdToken, position.collateralToken, position.amount, position.owner);
        } else {
            IERC20 token = IERC20(position.holdToken);
            token.safeTransfer(position.owner, position.amount);
        }

        _burn(tokenId);
        delete positions[tokenId];
        userPositionsCounter[msg.sender]--;

        emit PositionWasClosed(position);
    }

    function _swap(address fromToken, address toToken, uint256 amount, address recipient) internal returns(uint256) {
        IERC20 token = IERC20(fromToken);
        if(token.allowance(address(this), address(ROUTER)) < amount)
            token.safeApprove(address(ROUTER), type(uint256).max);
        
        ISwapRouter.ExactInputSingleParams memory swapParams = ISwapRouter.ExactInputSingleParams({
            tokenIn: fromToken,
            tokenOut: toToken,
            fee: 500, // TODO fixme
            recipient: recipient,
            deadline: block.timestamp + 15,
            amountIn: amount,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });
        
        return ROUTER.exactInputSingle(swapParams);
    }

    /*
    function checker() external view returns (bool canExec, bytes memory execPayload) {
        uint256[] memory results = new uint256[](_tokenIds.current());
        uint256 counter = 0;
        uint256 price;

        // for each NFT
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            if(positions[i].owner != address(0) && positions[i].maxGasPrice <= tx.gasprice) {
                (price, ) = oracleQuoter.getExpectedReturn(IERC20(positions[i].fromToken), IERC20(positions[i].toToken), positions[i].fromTokenAmount, 10, 0);

                if(price <= positions[i].stopLoss || price >= positions[i].takeProfit) {
                    results[counter] = i;
                }
            }
        }

        if(results.length != 0) {
            canExec = true;
            execPayload = abi.encode(results);
        }
    }

    function execute(bytes calldata execPayload) external {
        uint256[] memory positionIDs = abi.decode(execPayload, (uint256[]));
        uint256 id;
        uint256 price;

        for (uint256 i = 0; i < positionIDs.length; i++) {
            id = positionIDs[i];

            if(positions[id].owner != address(0) && positions[id].maxGasPrice <= tx.gasprice) {
                (price, ) = oracleQuoter.getExpectedReturn(IERC20(positions[i].fromToken), IERC20(positions[i].toToken), positions[i].fromTokenAmount, 10, 0);

                if(price <= positions[id].stopLoss || price >= positions[id].takeProfit) {
                    uint256 usedGas = _estimateUsedGas();
                    _swapAndBurn(id, usedGas);
                }
            }
        }
    }
    */
}
