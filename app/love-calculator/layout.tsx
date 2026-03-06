import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Love Calculator - Fun Compatibility Calculator',
  description: 'Free love calculator. Calculate the compatibility percentage between two names for fun! Shareable results.',
  keywords: ['love calculator', 'compatibility calculator', 'name compatibility', 'love test', 'relationship calculator'],
  openGraph: {
    title: 'Love Calculator - Fun Compatibility Test',
    description: 'Calculate the love compatibility between two names. Fun and shareable!',
    url: 'https://quicktools-dusky.vercel.app/love-calculator',
  },
};

export default function LoveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
