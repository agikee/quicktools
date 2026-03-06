import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Date Calculator - Calculate Days Between Dates',
  description: 'Free date calculator. Calculate the number of days, weeks, months, and years between two dates. Easy and fast.',
  keywords: ['date calculator', 'days between dates', 'date difference', 'day counter', 'date duration'],
  openGraph: {
    title: 'Date Calculator - Calculate Days Between Dates Free',
    description: 'Calculate days, weeks, months, and years between any two dates instantly.',
    url: 'https://quicktools-dusky.vercel.app/date-calculator',
  },
};

export default function DateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
