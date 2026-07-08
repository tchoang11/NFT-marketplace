
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
    hardhat: { chainId: 1337 }
    // hardhat: {},
    // polygon_mumbai: {
    //   url: process.env.POLYGON_MUMBAI_URL,
    //   accounts:[
    //     `0x${process.env.PRIVATE_KEY_METAMASK_ACCOUNT}`,
    //   ],
    // }
  }
};
