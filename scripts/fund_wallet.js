const { ethers } = require("hardhat");
const parseArgs = require("minimist");
const { ERC20_ABI, Tokens, WhaleAccounts } = require("../test/constants");

const MANDATORY_PARAMETERS = Object.freeze([
  ["amount", ["amount", "q"]],
  ["token", ["token", "t"]],
  ["address", ["address", "a"]],
  ["whale", ["whale", "w"]],
]);

async function main() {
  const argv = parseArgs(process.argv.slice(2), {
    string: ["address", "a", "amount", "q"],
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
// TOKEN AND WHALE NOT BEING PARSED PROPERLY SO HAVE TO HARD CODE
  const token = '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2';
  const address = parameters.address;
  const whale = '0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8';
  const amount = parameters.amount;

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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });