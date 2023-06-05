'use client';

import { ThemeContextProvider } from '../context/ThemeContext';
import { ThemeProvider } from 'next-themes'
import ModalsProvider from './ModalsProvider';
import ToasterProvider from './ToasterProvider';

import AuthContext from '../context/AuthContext';


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ModalsProvider />
      <ToasterProvider />
      <AuthContext>
        <ThemeProvider attribute="class" >
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </ThemeProvider>
      </AuthContext>
    </>
  );
};
export default Providers;
