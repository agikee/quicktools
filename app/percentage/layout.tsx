import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Calculator - Calculate Percentages Free',
  description: 'Free percentage calculator. Calculate X% of Y, find what percentage X is of Y, and more. Three calculation modes available.',
  keywords: ['percentage calculator', 'percent calculator', 'calculate percentage', 'percentage increase', 'percentage decrease'],
  openGraph: {
    title: 'Percentage Calculator - Free Online Percentage Tool',
    description: 'Calculate percentages easily. Three modes: X% of Y, X is what % of Y, X is Y% of what.',
    url: 'https://quicktools-dusky.vercel.app/percentage',
  },
};

export default function PercentageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
