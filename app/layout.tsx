import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Web3Provider } from '@/components/providers/Web3Provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Gene-Ledger | Decentralized Genomic Data Platform',
  description: 'Secure storage, retrieval, and sharing of genetic datasets on Filecoin with programmable access controls',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Web3Provider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}