import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Web3Provider } from '@/components/providers/Web3Provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
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