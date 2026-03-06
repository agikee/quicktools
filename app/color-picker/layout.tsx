import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Picker - Pick Colors & Convert HEX RGB HSL',
  description: 'Free color picker tool. Pick colors and convert between HEX, RGB, and HSL formats. Copy color codes instantly.',
  keywords: ['color picker', 'hex converter', 'rgb converter', 'hsl converter', 'color code', 'color palette'],
  openGraph: {
    title: 'Color Picker - Free Online Color Tool',
    description: 'Pick colors and get HEX, RGB, HSL codes instantly. Easy copy to clipboard.',
    url: 'https://quicktools-dusky.vercel.app/color-picker',
  },
};

export default function ColorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
