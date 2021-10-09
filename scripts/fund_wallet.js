const { ethers } = require("hardhat");
const parseArgs = require("minimist");
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

const MANDATORY_PARAMETERS = Object.freeze([
  ["amount", ["amount", "q"]],
  ["token", ["token", "t"]],
  ["address", ["address", "a"]],
  ["whale", ["whale", "w"]],
]);

async function main() {
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

  const tokenInstance = await ethers.getContractAt(
    ERC20_ABI,
    token
  );
  await ethers.provider.send("hardhat_impersonateAccount", [
    whale,
  ]);

  const impersonatedAccount = ethers.provider.getSigner(whale);

  const amountToken = ethers.utils.parseUnits(amount, 18);
  console.log("SENDING TOKENS");
  console.log("Amount => ", amountToken);
  console.log("Of => ", tokenInstance.address);
  console.log("From => ", impersonatedAccount.address);
  console.log("To => ", address);
  await tokenInstance
    .connect(impersonatedAccount)
    .transfer(address, amountToken);

  console.log("SENDING ETHERS");
  await impersonatedAccount.sendTransaction({
    to: address,
    value: ethers.utils.parseEther("1.0"),
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
