'use client';

import { ThemeContextProvider } from '../context/theme-context';
import ModalsProvider from './ModalsProvider';
import ToasterProvider from './ToasterProvider';

import { SessionProvider } from "next-auth/react"


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ModalsProvider />
      <ToasterProvider />
      <SessionProvider>
          <ThemeContextProvider>{children}</ThemeContextProvider>
      </SessionProvider>
    </>
  );
};
export default Providers;
