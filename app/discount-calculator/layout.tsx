import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discount Calculator - Calculate Sale Prices & Savings',
  description: 'Free discount calculator. Calculate sale prices, savings, and stacked discounts instantly. Find out the final price after multiple discounts.',
  keywords: ['discount calculator', 'sale calculator', 'price calculator', 'savings calculator', 'percentage off', 'stack discounts'],
  openGraph: {
    title: 'Discount Calculator - Calculate Sale Prices Free',
    description: 'Calculate sale prices and savings instantly. Supports multiple/stacked discounts.',
    url: 'https://quicktools-dusky.vercel.app/discount-calculator',
  },
};

export default function DiscountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
