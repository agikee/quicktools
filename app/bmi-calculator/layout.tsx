import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMI Calculator - Calculate Your Body Mass Index Free',
  description: 'Free online BMI calculator. Calculate your Body Mass Index instantly with metric or imperial units. See your BMI category and health indicator.',
  keywords: ['BMI calculator', 'body mass index', 'weight calculator', 'health calculator', 'BMI chart', 'obesity calculator'],
  openGraph: {
    title: 'BMI Calculator - Free Body Mass Index Calculator',
    description: 'Calculate your BMI instantly. Supports metric (kg/cm) and imperial (lbs/ft) units. See health categories.',
    url: 'https://quicktools-dusky.vercel.app/bmi-calculator',
  },
};

export default function BMILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
