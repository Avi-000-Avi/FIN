const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const assert = require("assert");
const {loadFixture, deployContract} = waffle;
const { ERC20_ABI, TOKENS } = require("./constants");
const PredaDexQuoter = require("../../artifacts/contracts/PredaDexQuoter.sol/PredaDexQuoter.json");
const PredaDexSwapper = require("../../artifacts/contracts/PredaDexSwapper.sol/PredaDexSwapper.json");
const PositionManager = require("../../artifacts/contracts/PositionManager.sol/PositionManager.json");

describe("PositionManager Production tests", function () {
  this.timeout(200000);

  const tokens = [
    TOKENS.weth, TOKENS.dai, TOKENS.uni
  ];

  async function fixture(wallet, provider) {
    [deployer, user, ...addrs] = await ethers.getSigners();

    const positionManager = await deployContract(deployer);

    await positionManager.setFeeRate(1); // 1%

    return { positionManager, user };
  }

  async function fundUser(user, token, positionManager) {
    let whaleAddress = token["whale"];
    await ethers.provider.send("hardhat_impersonateAccount", [
      whaleAddress,
    ]);
    const impersonatedAccount = await ethers.provider.getSigner(
      whaleAddress
    );

    const amount = ethers.utils.parseUnits(token["amount"], token["decimals"]);
    if(token["symbol"] == "ETH") {
      // send ethers
      await impersonatedAccount.sendTransaction({
        to: user.address,
        value: amount
      });
    } else {
      // send ERC20 tokens
      const tokenContract = await ethers.getContractAt(ERC20_ABI, token["address"]);
      await tokenContract
        .connect(impersonatedAccount)
        .transfer(user.address, amount);
      await tokenContract.connect(user).approve(positionManager, amount);
    }

    await ethers.provider.send("hardhat_stopImpersonatingAccount", [
      whaleAddress,
    ]);
  }

  tokens.map((fromToken) => {
    tokens.map((destToken) => {

      if(fromToken != destToken) {
        it(("Should mint and burn a NFT on the couple " + fromToken["symbol"] + " - " + destToken["symbol"]), async function () {
          const { positionManager, user } = await loadFixture(fixture);

          await fundUser(user, fromToken, positionManager.address);

          const amount = ethers.utils.parseUnits(fromToken["amount"], fromToken["decimals"]);

          const fromTokenContract = await ethers.getContractAt(ERC20_ABI, fromToken["address"]);
          const initialBalance = await fromTokenContract.balanceOf(user.address);

          const mintTx = await positionManager.connect(user).mint({
            liquidity: amount,
            takeProfit: 0,
            stopLoss: 0,
            fromToken: fromToken["address"],
            toToken: destToken["address"],
            minOut: 0,
            slippage: 0,
            deadline: 100000000000,
            maxGasPrice: 1000
          });
      
          const tx = await mintTx.wait();
          const id = tx.events.find((e) => e.event == 'PositionWasOpened').args[0].id;
          
          const finalBalance = await fromTokenContract.balanceOf(user.address);
          assert(initialBalance.sub(finalBalance).eq(amount), "fromToken balance error");

          await positionManager.connect(user).burn(id);

          const positions = await positionManager.connect(user).getOwnedPositions();
          assert(positions.length == 0, "NFT burning error");

          const fees = await fromTokenContract.balanceOf(positionManager.address);
          assert(fees.gt(0), "No fees collected");
        });
      }
    });
  });
});
