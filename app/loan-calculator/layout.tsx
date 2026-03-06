import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan Calculator - Calculate Monthly Payments & Interest',
  description: 'Free loan calculator. Calculate monthly payments, total interest, and loan costs for mortgages, car loans, and personal loans.',
  keywords: ['loan calculator', 'mortgage calculator', 'car loan calculator', 'monthly payment calculator', 'interest calculator'],
  openGraph: {
    title: 'Loan Calculator - Free Mortgage & Loan Payment Calculator',
    description: 'Calculate monthly payments and total interest for any loan. Works for mortgages, auto loans, and personal loans.',
    url: 'https://quicktools-dusky.vercel.app/loan-calculator',
  },
};

export default function LoanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
