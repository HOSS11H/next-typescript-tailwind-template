import '@/app/[lang]/styles/globals.css';
import { Inter } from 'next/font/google';

import getCurrentUser from './actions/getCurrentUser';
import Header from './components/Header/Header';

import Providers from './providers';
import { siteConfig } from './config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default:  siteConfig.name,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "sourcya",
      url: "https://sourcya.com",
    },
  ],
  creator: "sourcya",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  /* twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@shadcn",
  }, */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icons/favicon-16x16.png",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: `/site.webmanifest`,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

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
