const { ethers } = require("hardhat");

module.exports = Object.freeze({ 
    TOKENS: {
        weth:           {address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",   symbol: "WETH",    decimals: 18,  amount: "0.1",      whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        dai:            {address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",   symbol: "DAI",     decimals: 18,  amount: "100.0",    whale: "0x7641a5E890478Bea2bdC4CAFfF960AC4ae96886e"},
        usdc:           {address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",   symbol: "USDC",    decimals: 6,   amount: "100.0",    whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        usdt:           {address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",   symbol: "USDT",    decimals: 6,   amount: "100.0"},
        renbtc:         {address: "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D",   symbol: "RENBTC",  decimals: 8,   amount: "0.001"},
        wbtc:           {address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",   symbol: "WBTC",    decimals: 8,   amount: "0.001",    whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        hbtc:           {address: "0x66a79d23e58475d2738179ca52cd0b41d73f0bea",   symbol: "HBTC",    decimals: 18,  amount: "0.001",    whale: "0xd5fd1bc99d5801278345e9d29be2225d06c26e93"},
        uni:            {address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",   symbol: "UNI",     decimals: 18,  amount: "1.0",      whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        link:           {address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",   symbol: "LINK",    decimals: 18,  amount: "1.0",      whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        maker:          {address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",   symbol: "MKR",     decimals: 18,  amount: "1.0",      whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        aave:           {address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",   symbol: "AAVE",    decimals: 18,  amount: "1.0",      whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        compound:       {address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",   symbol: "COMP",    decimals: 18,  amount: "1.0",      whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        matic:          {address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",   symbol: "MATIC",   decimals: 18,  amount: "100.0",    whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        sushi:          {address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",   symbol: "SUSHI",   decimals: 18,  amount: "1.0",      whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        graph:          {address: "0xc944E90C64B2c07662A292be6244BDf05Cda44a7",   symbol: "GRT",     decimals: 18,  amount: "100.0",    whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        balancer:       {address: "0xba100000625a3754423978a60c9317c58a424e3D",   symbol: "BAL",     decimals: 18,  amount: "1.0",      whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"},
        eth:            {address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",   symbol: "ETH",     decimals: 18,  amount: "0.1",      whale: "0x6555e1CC97d3cbA6eAddebBCD7Ca51d75771e0B8"}
    },

    // The ERC-20 Contract ABI, which is a common contract interface
    // for tokens (this is the Human-Readable ABI format)
    ERC20_ABI: [
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
    ],

});

