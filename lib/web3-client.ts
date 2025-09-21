'use client';

import { http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { filecoinMainnet, filecoinCalibration } from './web3-config';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '98bb90e81b815a06c389de956008d427';

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
  ssr: true,
});


