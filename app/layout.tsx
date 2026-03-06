import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'QuickTools - Free Online Calculators',
    template: '%s | QuickTools',
  },
  description: 'Free online calculators and utilities. BMI calculator, tip calculator, percentage calculator, password generator, unit converter, and more. Fast, private, no sign-up required.',
  keywords: ['calculator', 'online tools', 'free calculators', 'BMI calculator', 'tip calculator', 'percentage calculator', 'password generator'],
  authors: [{ name: 'QuickTools' }],
  creator: 'QuickTools',
  publisher: 'QuickTools',
  metadataBase: new URL('https://quicktools-dusky.vercel.app'),
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quicktools-dusky.vercel.app',
    siteName: 'QuickTools',
    title: 'QuickTools - Free Online Calculators',
    description: 'Free online calculators and utilities. Fast, private, no sign-up required.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickTools - Free Online Calculators',
    description: 'Free online calculators and utilities. Fast, private, no sign-up required.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
