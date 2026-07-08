
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: "cancun",
    },
  },
  networks: {
    hardhat: { chainId: 1337 },
    sepolia: {
      url: process.env.NEXT_PUBLIC_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY
        ? [`0x${process.env.PRIVATE_KEY.replace(/^0x/, "")}`]
        : [],
    },
  }
};
