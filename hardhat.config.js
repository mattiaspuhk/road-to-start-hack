import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

/** @type {import('hardhat/config').HardhatUserConfig} */
const config = {
  solidity: "0.8.20",
  networks: {
    // Local development network
    hardhat: {},
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  // Etherscan verification (optional) - uncomment to enable
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
};

export default config;
