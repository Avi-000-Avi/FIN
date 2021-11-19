export const ERC20abi = [
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
    ]