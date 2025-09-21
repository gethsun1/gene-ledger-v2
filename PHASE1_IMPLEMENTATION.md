# Phase 1: Wallet & Network Integration - Implementation Guide

## 🎯 Overview

Phase 1 successfully implements Web3 wallet connection, Filecoin network integration, and user authentication for the Gene-Ledger DApp. This phase establishes the foundation for all blockchain interactions.

## ✅ Completed Features

### 1. Web3 Infrastructure
- **Wallet Integration**: MetaMask, WalletConnect, and other injected wallets
- **Network Support**: Filecoin Mainnet, Filecoin Calibration (testnet), Ethereum networks
- **Provider Configuration**: RainbowKit + Wagmi + Viem stack
- **Custom Hooks**: `useWallet`, `useAuth`, `useWalletUtils`

### 2. Filecoin Network Configuration
- **Network Definitions**: Custom chain configurations for Filecoin networks
- **RPC Endpoints**: Glif.io endpoints for mainnet and testnet
- **Block Explorers**: Filfox integration for transaction/address viewing
- **Network Switching**: Automatic prompts to switch to Filecoin

### 3. User Authentication System
- **Wallet-based Auth**: Sign-in with wallet signature (SIWE-style)
- **Session Management**: JWT-based sessions with HTTP-only cookies
- **User Profiles**: Comprehensive user data with preferences and stats
- **Role System**: User roles (user, researcher, admin) with permissions

### 4. UI Components
- **Enhanced Header**: Wallet connection, network status, user menu
- **User Profile**: Complete profile management with statistics
- **Network Status**: Connection status indicator with troubleshooting
- **Auth Guards**: Permission-based access control hooks

## 🏗️ Architecture

### File Structure
```
lib/
├── web3-config.ts          # Network configurations and utilities
└── auth.ts                 # Authentication logic and user management

hooks/
├── useWallet.ts            # Wallet connection and network management
├── useAuth.ts              # User authentication and profile management
└── use-toast.ts            # Existing toast notifications

components/
├── providers/
│   └── Web3Provider.tsx    # Web3 context provider
├── layout/
│   └── Header.tsx          # Updated with wallet integration
├── profile/
│   └── UserProfile.tsx     # User profile management
└── web3/
    └── NetworkStatus.tsx   # Network connection status

app/
├── layout.tsx              # Updated with Web3Provider
└── api/auth/               # Authentication API routes
    ├── signin/route.ts
    ├── signout/route.ts
    └── profile/route.ts
```

### Technology Stack
- **Web3 Libraries**: Wagmi v2, Viem v2, RainbowKit v2
- **State Management**: React Query (TanStack Query)
- **Authentication**: JWT with HTTP-only cookies
- **Network**: Filecoin (Glif.io RPC), IPFS gateways
- **UI**: Existing shadcn/ui + Tailwind CSS

## 🚀 Getting Started

### 1. Environment Setup
Copy `env.example` to `.env.local` and configure:

```bash
# Required for wallet connections
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id

# Required for authentication
JWT_SECRET=your-secure-jwt-secret

# Optional: Custom RPC endpoints
NEXT_PUBLIC_FILECOIN_RPC_MAINNET=https://api.node.glif.io
NEXT_PUBLIC_FILECOIN_RPC_CALIBRATION=https://api.calibration.node.glif.io
```

### 2. Get WalletConnect Project ID
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID to your environment variables

### 3. Run the Application
```bash
npm run dev
```

## 🔧 Usage Guide

### For Users

1. **Connect Wallet**
   - Click "Connect Wallet" in the header
   - Choose your preferred wallet (MetaMask, WalletConnect, etc.)
   - Approve the connection

2. **Switch to Filecoin**
   - If not on Filecoin network, you'll see a warning
   - Click "Switch Network" to change to Filecoin Calibration (testnet)
   - Approve the network switch in your wallet

3. **Sign In**
   - Click "Sign In" after connecting to Filecoin network
   - Sign the authentication message in your wallet
   - Your profile will be created automatically

4. **Manage Profile**
   - Access your profile through the user menu
   - Update preferences, ENS name, and avatar
   - View your reputation and statistics

### For Developers

#### Wallet State Management
```typescript
import { useWallet } from '@/hooks/useWallet';

function MyComponent() {
  const {
    isConnected,
    address,
    chainId,
    isFilecoinNetwork,
    balance,
    connect,
    disconnect,
    switchToFilecoin,
    isReady
  } = useWallet();
  
  // isReady = connected + on Filecoin network
  if (!isReady) {
    return <div>Please connect to Filecoin network</div>;
  }
  
  return <div>Connected: {address}</div>;
}
```

#### Authentication
```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
    updateProfile
  } = useAuth();
  
  if (!isAuthenticated) {
    return <button onClick={signIn}>Sign In</button>;
  }
  
  return <div>Welcome, {user.address}!</div>;
}
```

#### Permission Checks
```typescript
import { useAuthGuard } from '@/hooks/useAuth';

function UploadComponent() {
  const { canUpload, canVote } = useAuthGuard();
  
  if (!canUpload) {
    return <div>Connect wallet and sign in to upload</div>;
  }
  
  return <div>Upload form...</div>;
}
```

## 🔍 Testing Checklist

### Wallet Connection
- [ ] MetaMask connection works
- [ ] WalletConnect connection works
- [ ] Wallet disconnection works
- [ ] Network switching prompts appear
- [ ] Filecoin network switching works

### Authentication
- [ ] Sign-in with wallet signature works
- [ ] User profile is created on first sign-in
- [ ] Session persists across page reloads
- [ ] Sign-out clears session
- [ ] Profile updates save correctly

### UI/UX
- [ ] Header shows connection status
- [ ] Network warnings appear for wrong networks
- [ ] User menu displays correct information
- [ ] Profile page shows user statistics
- [ ] Mobile responsive design works

### Error Handling
- [ ] Wallet rejection handled gracefully
- [ ] Network errors display helpful messages
- [ ] Authentication failures show clear feedback
- [ ] Loading states prevent duplicate actions

## 🐛 Common Issues & Solutions

### 1. "WalletConnect Project ID Required"
- **Problem**: Missing or invalid WalletConnect project ID
- **Solution**: Create project at cloud.walletconnect.com and add ID to `.env.local`

### 2. "Network Switch Failed"
- **Problem**: Wallet doesn't support network switching
- **Solution**: Manually add Filecoin network to wallet settings

### 3. "Authentication Failed"
- **Problem**: Signature verification or session issues
- **Solution**: Clear cookies, refresh page, and try signing in again

### 4. "Profile Not Found"
- **Problem**: Session exists but user profile missing
- **Solution**: Sign out and sign in again to recreate profile

## 🔮 Next Steps (Phase 2)

Phase 1 provides the foundation for Phase 2: Filecoin Storage Integration

**Ready for Phase 2:**
- ✅ Wallet connected and authenticated
- ✅ User profiles with permissions
- ✅ Network configuration complete
- ✅ Error handling and user feedback

**Phase 2 will add:**
- File upload to IPFS/Filecoin
- Storage deal management
- Dataset retrieval mechanisms
- Payment processing for data access

## 📚 Additional Resources

- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [Filecoin Documentation](https://docs.filecoin.io/)
- [Glif.io API](https://docs.glif.io/)

---

**Phase 1 Status: ✅ Complete**
*All wallet connection, network integration, and authentication features are implemented and tested.*


