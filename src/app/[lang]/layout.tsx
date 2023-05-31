import '@/app/[lang]/styles/globals.css';
import { Inter } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import ModalsProvider from './providers/ModalsProvider';
import { ThemeContextProvider } from './context/theme-context';

import dynamic from 'next/dynamic';
import getCurrentUser from './actions/getCurrentUser';
import Header from './components/Header/Header';

import { SessionProvider } from 'next-auth/react';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  console.log(currentUser);

  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Providers>
          <Header currentUser={currentUser} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
