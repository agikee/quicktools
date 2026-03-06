import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tip Calculator - Calculate Tips & Split Bills',
  description: 'Free tip calculator. Calculate tips easily and split bills between friends. Supports custom tip percentages and bill splitting.',
  keywords: ['tip calculator', 'gratuity calculator', 'bill splitter', 'restaurant tip', 'tip percentage'],
  openGraph: {
    title: 'Tip Calculator - Calculate Tips & Split Bills Free',
    description: 'Calculate tips and split bills easily. Choose tip percentage and number of people.',
    url: 'https://quicktools-dusky.vercel.app/tip-calculator',
  },
};

export default function TipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
