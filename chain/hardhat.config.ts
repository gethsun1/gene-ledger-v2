import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv';

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const FILECOIN_CALIBRATION_RPC = process.env.FILECOIN_CALIBRATION_RPC || 'https://api.calibration.node.glif.io';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    calibration: {
      url: FILECOIN_CALIBRATION_RPC,
      chainId: 314159,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};

export default config;
