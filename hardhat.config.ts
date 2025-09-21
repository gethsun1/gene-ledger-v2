import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const FILECOIN_CALIBRATION_RPC = process.env.FILECOIN_CALIBRATION_RPC || process.env.NEXT_PUBLIC_FILECOIN_RPC_CALIBRATION || 'https://api.calibration.node.glif.io';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    hardhat: {},
    calibration: {
      url: FILECOIN_CALIBRATION_RPC,
      chainId: 314159,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      // Filecoin EVM verification is not through etherscan; left for other networks if needed
      mainnet: process.env.ETHERSCAN_API_KEY || '',
      sepolia: process.env.ETHERSCAN_API_KEY || '',
    },
  },
};

export default config;


