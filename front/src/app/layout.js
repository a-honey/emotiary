'use client';

import Header from '@/components/common/Header';
import './globals.css';
import { useRouter } from 'next/navigation';
import Providers from '@/utils/Provider';

export default function RootLayout({ children }) {
  const router = useRouter();

  return (
    <html lang="en">
      <body className={`bg-bg`}>
        <Providers pathname={router.pathname}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
