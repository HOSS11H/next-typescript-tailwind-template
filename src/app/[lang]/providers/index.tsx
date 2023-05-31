'use client';

import { ThemeContextProvider } from '../context/theme-context';
import { ThemeProvider } from 'next-themes'
import ModalsProvider from './ModalsProvider';
import ToasterProvider from './ToasterProvider';

import { SessionProvider } from "next-auth/react"


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ModalsProvider />
      <ToasterProvider />
      <SessionProvider>
        <ThemeProvider attribute="class" >
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};
export default Providers;
