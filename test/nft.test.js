const { ethers, deployments } = require("hardhat");
const assert = require("assert");
const { ERC20_ABI, TOKENS } = require("./constants");

describe("PositionManager tests", function () {
  this.timeout(200000);

  // PARAMETERS
  const DEBUG = true;
  const fromToken = TOKENS.uni;
  const toToken = TOKENS.usdc;
  const amount = ethers.utils.parseUnits(fromToken["amount"], fromToken["decimals"]);

  async function getTokenBalance(token, user) {
    const contract = await ethers.getContractAt(
        ERC20_ABI,
        token
    );

    const balance = await contract.balanceOf(user);

    return balance;
  }

  async function setup() {
    [deployer, user, ...addrs] = await ethers.getSigners();

    await deployments.fixture(["PositionManager"]);
    const positionManager = await ethers.getContract('PositionManager');

    await positionManager.setFeeRate(1); // 1%

    return { positionManager, user };
  }

  async function fundUserAndApproveAddress(user, token, address) {
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
      await tokenContract.connect(user).approve(address, amount);
    }

    await ethers.provider.send("hardhat_stopImpersonatingAccount", [
      whaleAddress,
    ]);
  }

  it(("Should mint and burn a NFT on the couple " + fromToken["symbol"] + " - " + toToken["symbol"]), async function () {
    const { positionManager, user } = await setup();

    await fundUserAndApproveAddress(user, fromToken, positionManager.address);
    const initialBalance = await getTokenBalance(fromToken["address"], user.address);

    if(DEBUG) console.log("Minting...");
    const mintTx = await positionManager.connect(user).mint({
      fromToken: fromToken["address"],
      toToken: toToken["address"],
      amount: amount,
      takeProfit: 0,
      stopLoss: 10,
      maxGasPrice: 10000
    });
    if(DEBUG) console.log("OK");

    const finalBalance = await getTokenBalance(fromToken["address"], user.address);
    assert(initialBalance.sub(finalBalance).eq(amount), "fromToken balance error");

    const tx = await mintTx.wait();
    const id = tx.events.find((e) => e.event == 'PositionWasOpened').args[0].id;
    assert(id.eq(1), "ID mismatch");

    if(DEBUG) console.log("Burning...");
    await positionManager.connect(user).burn(id);
    if(DEBUG) console.log("OK");

    const positions = await positionManager.connect(user).getOwnedPositions();
    assert(positions.length == 0, "NFT burning error");

    const fees = await getTokenBalance(fromToken["address"], positionManager.address);
    assert(fees.eq(amount.mul(1).div(100)), "No fees collected");
  });

  it(("Should mint and burn a NFT on the couple " + fromToken["symbol"] + " - " + toToken["symbol"]), async function () {
    const { positionManager, user } = await setup();

    await fundUserAndApproveAddress(user, fromToken, positionManager.address);
    const initialBalance = await getTokenBalance(fromToken["address"], user.address);

    if(DEBUG) console.log("Minting...");
    const mintTx = await positionManager.connect(user).mint({
      fromToken: fromToken["address"],
      toToken: toToken["address"],
      amount: amount,
      takeProfit: 250,
      stopLoss: 10,
      maxGasPrice: 100000
    });
    if(DEBUG) console.log("OK");

    const finalBalance = await getTokenBalance(fromToken["address"], user.address);
    assert(initialBalance.sub(finalBalance).eq(amount), "fromToken balance error");

    const tx = await mintTx.wait();
    const id = tx.events.find((e) => e.event == 'PositionWasOpened').args[0].id;
    assert(id.eq(1), "ID mismatch");

    if(DEBUG) console.log("Checking Upkeep...");
    const { upkeepNeeded, performData } = await positionManager.connect(user).callStatic.checkUpkeep();

    // TODO: Make large shift in the liquidity in the pool as to simulate large price shift

    if(upkeepNeeded) {
      if(DEBUG) console.log("Preforming Upkeep...");
      await positionManager.connect(user).performUpkeep(performData);
      if(DEBUG) console.log("OK");
    }
    else {
      if(DEBUG) console.log("Burning...");
      await positionManager.connect(user).burn(id);
      if(DEBUG) console.log("OK");
    }

    const positions = await positionManager.connect(user).getOwnedPositions();
    assert(positions.length == 0, "NFT burning error");

    const fees = await getTokenBalance(fromToken["address"], positionManager.address);
    assert(fees.eq(amount.mul(1).div(100)), "No fees collected");
  });
});
