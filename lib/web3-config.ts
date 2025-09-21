import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// Filecoin network configurations
export const filecoinMainnet = {
  id: 314,
  name: 'Filecoin Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Filecoin',
    symbol: 'FIL',
  },
  rpcUrls: {
    default: {
      http: ['https://api.node.glif.io'],
    },
    public: {
      http: ['https://api.node.glif.io'],
    },
  },
  blockExplorers: {
    default: { name: 'Filfox', url: 'https://filfox.info' },
  },
  testnet: false,
} as const;

export const filecoinCalibration = {
  id: 314159,
  name: 'Filecoin Calibration',
  nativeCurrency: {
    decimals: 18,
    name: 'Test Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: {
      http: ['https://api.calibration.node.glif.io'],
    },
    public: {
      http: ['https://api.calibration.node.glif.io'],
    },
  },
  blockExplorers: {
    default: { name: 'Calibration Filfox', url: 'https://calibration.filfox.info' },
  },
  testnet: true,
} as const;

// Project info for WalletConnect
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '98bb90e81b815a06c389de956008d427';

// RainbowKit configuration
export const config = getDefaultConfig({
  appName: 'Gene-Ledger',
  projectId,
  chains: [filecoinMainnet, filecoinCalibration, mainnet, sepolia],
  transports: {
    [filecoinMainnet.id]: http(),
    [filecoinCalibration.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true, // Enable server-side rendering
});

// Alternative Wagmi configuration (if not using RainbowKit)
export const wagmiConfig = createConfig({
  chains: [filecoinMainnet, filecoinCalibration, mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId }),
  ],
  transports: {
    [filecoinMainnet.id]: http(),
    [filecoinCalibration.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Network configuration constants
export const SUPPORTED_CHAINS = {
  FILECOIN_MAINNET: filecoinMainnet.id,
  FILECOIN_CALIBRATION: filecoinCalibration.id,
  ETHEREUM_MAINNET: mainnet.id,
  ETHEREUM_SEPOLIA: sepolia.id,
} as const;

export const DEFAULT_CHAIN = filecoinCalibration; // Use testnet by default

// Filecoin-specific configuration
export const FILECOIN_CONFIG = {
  // Lotus API endpoints
  LOTUS_ENDPOINTS: {
    MAINNET: 'https://api.node.glif.io',
    CALIBRATION: 'https://api.calibration.node.glif.io',
  },
  
  // IPFS gateways
  IPFS_GATEWAYS: [
    'https://ipfs.io/ipfs/',
    'https://gateway.pinata.cloud/ipfs/',
    'https://cloudflare-ipfs.com/ipfs/',
  ],
  
  // Web3.Storage configuration
  WEB3_STORAGE: {
    ENDPOINT: 'https://api.web3.storage',
  },
  
  // Storage deal parameters
  STORAGE_DEALS: {
    DEFAULT_DURATION: 1555200, // ~1 year in epochs
    MIN_PRICE: '0', // Free storage for now
    VERIFIED_DEAL: true,
  },
} as const;

// Utility functions
export const getChainById = (chainId: number) => {
  switch (chainId) {
    case filecoinMainnet.id:
      return filecoinMainnet;
    case filecoinCalibration.id:
      return filecoinCalibration;
    case mainnet.id:
      return mainnet;
    case sepolia.id:
      return sepolia;
    default:
      return filecoinCalibration;
  }
};

export const isFilecoinNetwork = (chainId: number) => {
  return chainId === filecoinMainnet.id || chainId === filecoinCalibration.id;
};

export const getExplorerUrl = (chainId: number, hash: string, type: 'tx' | 'address' = 'tx') => {
  const chain = getChainById(chainId);
  const baseUrl = chain.blockExplorers?.default.url;
  
  if (!baseUrl) return '';
  
  if (isFilecoinNetwork(chainId)) {
    return type === 'tx' ? `${baseUrl}/en/message/${hash}` : `${baseUrl}/en/address/${hash}`;
  }
  
  return type === 'tx' ? `${baseUrl}/tx/${hash}` : `${baseUrl}/address/${hash}`;
};
