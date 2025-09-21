/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_FONT_GOOGLE_FETCH_TIMEOUT: '60000',
  },
  transpilePackages: [
    '@radix-ui/react-progress',
    '@radix-ui/react-dialog',
    '@radix-ui/react-slot',
    '@radix-ui/react-separator',
    '@radix-ui/react-scroll-area',
    '@radix-ui/react-radio-group',
    '@radix-ui/react-select',
    '@radix-ui/react-popover',
    '@radix-ui/react-tabs',
    '@radix-ui/react-tooltip',
    'cmdk',
    'vaul',
    'lucide-react',
    'wagmi',
    '@wagmi',
    'viem',
    '@walletconnect/logger',
    '@walletconnect/ethereum-provider',
    '@walletconnect/universal-provider'
  ],
  // Ignore the chain/ subproject during Next.js builds
  webpack: (config) => {
    config.ignoreWarnings = config.ignoreWarnings || [];
    config.ignoreWarnings.push({
      module: /chain\//,
    });
    return config;
  },
};

module.exports = nextConfig;
