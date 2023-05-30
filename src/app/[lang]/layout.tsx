import '@/app/[lang]/styles/globals.css';
import { Inter } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import ModalsProvider from './providers/ModalsProvider';
import { ThemeContextProvider } from './context/theme-context';

import dynamic from 'next/dynamic';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <ModalsProvider />
        <ToasterProvider />
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
