const { ethers } = require("hardhat");
const parseArgs = require("minimist");
<<<<<<< HEAD
const { ERC20_ABI, Tokens, WhaleAccounts } = require("../test/constants");
=======
const ERC20_ABI = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint)",
    "function balanceOf(address) view returns (uint)",
    "function approve(address spender, uint256 amount)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function transfer(address to, uint amount)",
    "function transferFrom(address sender, address recipient, uint256 amount)",
    "event Transfer(address indexed from, address indexed to, uint amount)",
];
>>>>>>> 0500905b79a13835b7d29f73043b02e84218729b

// const MANDATORY_PARAMETERS = Object.freeze([
//   ["amount", ["amount", "q"]],
//   ["token", ["token", "t"]],
//   ["address", ["address", "a"]],
//   ["whale", ["whale", "w"]],
// ]);

async function main() {
<<<<<<< HEAD
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
  const token = "0x514910771AF9Ca656af840dff83E8264EcF986CA"
  const address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  //parameters.address; 
  const whale = '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8';
  const amount = '50'
=======
  const argv = parseArgs(process.argv.slice(2), {
    string: ["address", "a", "token", "t", "whale", "w", "amount", "q"],
  });
  console.log(argv);

  const parametersAreOk = MANDATORY_PARAMETERS.every((parameterTuple) => {
    const [_name, [long, short]] = parameterTuple;
    return long in argv || short in argv;
  });

  if (!parametersAreOk) {
    console.log(`
      Missing mandatory parameter!

      Usage:

        yarn fund-wallet --token <TOKEN ADDRESS> --wallet <WALLET ADDRESS> --amount <AMOUNT>

      Parameters:

        --token     -m : ERC20 token (e.g. DAI 0x...)

        --address   -a : Ethereum wallet address

        --whale     -w : the whale address to grab tokens from

        --amount    -q : quantity of tokens to send to the desired wallet
    `);
  }

  const parameters = {};

  MANDATORY_PARAMETERS.forEach((param) => {
    const [name, [long, short]] = param;
    parameters[name] = argv[long] || argv[short];
  });

  const token = parameters.token;
  const address = parameters.address;
  const whale = parameters.whale;
  const amount = parameters.amount;
>>>>>>> 0500905b79a13835b7d29f73043b02e84218729b

  const tokenInstance = await ethers.getContractAt(
    ERC20_ABI,
    token
  );
  await ethers.provider.send("hardhat_impersonateAccount", [
    whale,
  ]);

  const impersonatedAccount = ethers.provider.getSigner(whale);

<<<<<<< HEAD
  console.log('fake account', impersonatedAccount)

=======
>>>>>>> 0500905b79a13835b7d29f73043b02e84218729b
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
<<<<<<< HEAD
  });
=======
});
>>>>>>> 0500905b79a13835b7d29f73043b02e84218729b
