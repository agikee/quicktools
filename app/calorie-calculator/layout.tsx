import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calorie Calculator - Calculate Daily Calorie Needs (TDEE)',
  description: 'Free calorie calculator. Calculate your TDEE (Total Daily Energy Expenditure) and calorie needs for weight loss, maintenance, or muscle gain.',
  keywords: ['calorie calculator', 'TDEE calculator', 'daily calorie needs', 'weight loss calculator', 'BMR calculator'],
  openGraph: {
    title: 'Calorie Calculator - Free TDEE & Daily Calorie Calculator',
    description: 'Calculate your daily calorie needs for weight loss, maintenance, or muscle gain. Based on Mifflin-St Jeor equation.',
    url: 'https://quicktools-dusky.vercel.app/calorie-calculator',
  },
};

export default function CalorieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
