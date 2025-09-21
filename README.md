# Gene-Ledger: Decentralized Genomic Data Platform

Gene-Ledger is a Web3 DApp that enables secure storage, retrieval, and sharing of genetic datasets on Filecoin with programmable access controls and payment mechanisms.

## 🧬 Features

### Core Functionality
- **Secure Dataset Upload**: Upload genomic datasets with metadata to Filecoin
- **Dataset Discovery**: Search and filter genomic datasets with advanced filtering
- **DAO Governance**: Community-driven decision making for platform governance
- **Access Control**: Programmable permissions and payment mechanisms

### Technical Features
- **Modern UI**: Next.js App Router + shadcn/ui + Tailwind
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Type Safety**: Full TypeScript integration
- **Web3**: Wallet connection (RainbowKit/Wagmi), Filecoin storage (Web3.Storage), on-chain registry

## ✅ Implemented Phases

### Phase 1: Wallet & Network Integration
- RainbowKit + Wagmi + Viem provider
- Filecoin Mainnet & Calibration networks
- Wallet-based auth (nonce signature pattern, JWT cookie), basic profile/preferences
- Header with Connect Wallet, sign-in, and network status

### Phase 2: Filecoin Storage Integration
- Web3.Storage integration for IPFS/Filecoin
- `/api/storage/upload` API to upload and return CID
- Upload UI wired to API; shows CID on success
- IPFS gateway helper to open CID

### Phase 3: Smart Contracts (MVP)
- `DatasetRegistry` Solidity contract (register datasets, purchase access, escrow withdraw)
- Hardhat subproject under `chain/` with compile/deploy scripts
- Frontend wiring:
  - Register dataset on-chain after IPFS upload (with price/access level inputs)
  - Paywall in Retrieve cards: purchase access for Standard/Premium, retrieve if permitted
  - Withdraw escrow from DAO page

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later (recommend Node 20+)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone git@github.com:gethsun1/gene-ledger-v2.git
cd gene-ledger-v2/project
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Environment

Create `.env.local` in `project/` with:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
JWT_SECRET=your-long-random-secret

NEXT_PUBLIC_FILECOIN_RPC_MAINNET=https://api.node.glif.io
NEXT_PUBLIC_FILECOIN_RPC_CALIBRATION=https://api.calibration.node.glif.io

NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
WEB3_STORAGE_TOKEN=your_web3storage_token

NEXT_PUBLIC_APP_URL=http://localhost:3000
# After deploying the registry (see chain/ section):
NEXT_PUBLIC_REGISTRY_ADDRESS=0x...
```

Notes:
- API routes require server runtime. The current `next.config.js` uses `output: 'export'` (static export) which does not support API routes in production. For deployment with API routes, remove `output: 'export'` or host APIs separately.

## 📁 Project Structure

```
├── app/                    # Next.js 14+ App Router
│   ├── (routes)/          # Route groups
│   ├── globals.css        # Global styles with biotech theme
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, navigation components
│   ├── forms/             # Upload forms and inputs
│   ├── dashboard/         # DAO dashboard components
│   └── animations/        # Custom animations (DNA, hexagons)
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── constants.ts       # App constants
│   ├── mockData.ts        # Mock genomic datasets
│   ├── ipfs.ts            # IPFS gateway helpers
│   └── storage.ts         # Web3.Storage client utilities (server-side)
├── hooks/                 # Custom React hooks
│   ├── useWallet.ts       # Wallet state & helpers
│   ├── useAuth.ts         # Auth/profile hooks
│   └── useRegistry.ts     # On-chain DatasetRegistry interactions
├── abis/
│   └── datasetRegistry.ts # ABI
├── app/api/               # Next.js API routes (dev/server runtime)
│   ├── storage/upload     # Upload file to Web3.Storage
│   ├── storage            # Resolve gateway URL for a CID
│   ├── auth               # Signin/signout/profile
│   └── access             # Placeholder access check
├── chain/                 # Hardhat subproject (contracts & deploy)
│   ├── contracts          # Solidity contracts
│   ├── scripts            # Deployment scripts
│   └── hardhat.config.js  # Hardhat config (CJS)
└── types/                 # TypeScript type definitions
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3B82F6 (Trust, reliability)
- **Biotech Green**: #10B981 (Growth, life sciences)  
- **Accent Violet**: #8B5CF6 (Innovation, technology)

### Typography
- **Font**: Inter (clean, modern, highly readable)
- **Hierarchy**: Clear type scale for headers, body, and metadata
- **Line Height**: 150% for body text, 120% for headings

### Visual Elements
- **Glassmorphism**: Subtle transparency with backdrop blur
- **Rounded Corners**: 2xl radius (16px) for modern feel
- **Animations**: Framer Motion for smooth interactions
- **Patterns**: DNA strands and hexagonal backgrounds

## 🔧 How it Works (End-to-end)

1) Connect wallet (RainbowKit). Switch to Filecoin Calibration.
2) Sign in (wallet signature) to create a session/profile.
3) Upload dataset file. Backend stores file via Web3.Storage and returns a CID.
4) The app registers the dataset on-chain in `DatasetRegistry` (title, description, CID, price/access level).
5) Retrieve page shows datasets. If Open or previously purchased, “Retrieve” opens the IPFS gateway. Otherwise, you can “Purchase Access” which sends FIL to escrow and unlocks retrieval.

## 📊 Mock Data

The application includes realistic mock data for demonstration:
- 8 genomic datasets with authentic research titles
- Diverse data types (GWAS, WES, pharmacogenomics, etc.)
- Realistic file sizes, pricing, and metadata
- DAO proposals and member information

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

Chain subproject (`project/chain/`):
- `npm run compile` - Compile contracts and generate artifacts
- `npx hardhat run scripts/deploy.ts --network calibration` - Deploy `DatasetRegistry` to Filecoin Calibration

Environment for chain deploy:
```bash
# in project/chain/.env
PRIVATE_KEY=0xyour_private_key_with_tFIL
FILECOIN_CALIBRATION_RPC=https://api.calibration.node.glif.io
```
After deploy, copy the printed address to `NEXT_PUBLIC_REGISTRY_ADDRESS` in `project/.env.local`.

## 🌐 Pages

### Landing Page (`/`)
- Hero section with DNA visualization
- Feature highlights
- Call-to-action buttons

### Upload Dataset (`/upload`)
- File upload with drag-and-drop
- Metadata form (title, description, tags)
- Upload progress tracking

### Retrieve Dataset (`/retrieve`)
- Search and filter interface
- Dataset grid with cards
- Pricing and access controls

### DAO Dashboard (`/dao`)
- Overview metrics
- Governance proposals with voting
- Member directory

## 🎯 Roadmap

- Add price/access-level inputs in Upload form
- Persist indexed datasets (off-chain DB or subgraph)
- Reintroduce DAO governance stack (Governor/Timelock) with OZ v5 patterns
- ZK-proof gating for privacy-preserving verification
- Production deployment without `output: 'export'` or with external API hosting

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

---

Built with ❤️ for the decentralized science community