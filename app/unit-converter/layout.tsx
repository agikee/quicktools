import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unit Converter - Convert Length, Weight & Temperature',
  description: 'Free unit converter. Convert between length, weight, and temperature units. Supports metric and imperial measurements.',
  keywords: ['unit converter', 'length converter', 'weight converter', 'temperature converter', 'metric converter'],
  openGraph: {
    title: 'Unit Converter - Free Online Conversion Tool',
    description: 'Convert units of length, weight, and temperature instantly. Metric and imperial support.',
    url: 'https://quicktools-dusky.vercel.app/unit-converter',
  },
};

export default function UnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
