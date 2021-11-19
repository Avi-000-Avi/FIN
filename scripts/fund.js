const { ethers } = require("hardhat");

const tokenAddress = "0x514910771af9ca656af840dff83e8264ecf986ca" //LINK
const whaleAddress = "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503" //LINK team wallet
const userAddress  = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" //My wallet
const amount       = "1000";

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

async function main() {

  await ethers.provider.send("hardhat_impersonateAccount", [
      whaleAddress,
  ]);
  const impersonatedAccount = await ethers.provider.getSigner(
      whaleAddress
  );
  const tokenContract = await ethers.getContractAt(ERC20_ABI, tokenAddress);

  await tokenContract
      .connect(impersonatedAccount)
      .transfer(userAddress, ethers.utils.parseUnits(amount));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});