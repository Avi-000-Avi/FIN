const { ethers } = require("hardhat");
const parseArgs = require("minimist");
const { ERC20_ABI, Tokens, WhaleAccounts } = require("../test/constants");

// const MANDATORY_PARAMETERS = Object.freeze([
//   ["amount", ["amount", "q"]],
//   ["token", ["token", "t"]],
//   ["address", ["address", "a"]],
//   ["whale", ["whale", "w"]],
// ]);

async function main() {
//   const argv = parseArgs(process.argv.slice(2), {
//     string: ["address", "a", "amount", "q"],
//   });
//   console.log(argv);

//   const parametersAreOk = MANDATORY_PARAMETERS.every((parameterTuple) => {
//     const [_name, [long, short]] = parameterTuple;
//     return long in argv || short in argv;
//   });

//   if (!parametersAreOk) {
//     console.log(`
//       Missing mandatory parameter!
//       Usage:
//         yarn fund-wallet --token <TOKEN ADDRESS> --wallet <WALLET ADDRESS> --amount <AMOUNT>
//       Parameters:
//         --token     -m : ERC20 token (e.g. DAI 0x...)
//         --address   -a : Ethereum wallet address
//         --whale     -w : the whale address to grab tokens from
//         --amount    -q : quantity of tokens to send to the desired wallet
//     `);
//   }

//   const parameters = {};

//   MANDATORY_PARAMETERS.forEach((param) => {
//     const [name, [long, short]] = param;
//     parameters[name] = argv[long] || argv[short];
//   });
// TOKEN AND WHALE NOT BEING PARSED PROPERLY SO HAVE TO HARD CODE
  const token = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
  const address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  //parameters.address; 
  const whale = '0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8';
  const amount = '1000'

  const tokenInstance = await ethers.getContractAt(
    ERC20_ABI,
    token
  );
  await ethers.provider.send("hardhat_impersonateAccount", [
    whale,
  ]);

  const impersonatedAccount = ethers.provider.getSigner(whale);

  console.log('fake account', impersonatedAccount)

  const amountToken = ethers.utils.parseUnits(amount, 18);
  console.log("SENDING TOKENS");
  console.log("Amount => ", amountToken);
  console.log("Of => ", tokenInstance.address);
  console.log("From => ", impersonatedAccount._address);
  console.log("To => ", address);
  await tokenInstance
    .connect(impersonatedAccount)
    .transfer(address, amountToken);

  console.log("SENDING ETHERS");
  await impersonatedAccount.sendTransaction({
    to: address,
    value: ethers.utils.parseEther("1.0"),
  });

  const balance = (await tokenInstance.balanceOf(address))
  console.log('new balance', ethers.utils.formatEther(balance));
  


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });