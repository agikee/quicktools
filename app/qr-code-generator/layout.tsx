import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Code Generator - Create Free QR Codes Online',
  description: 'Free QR code generator. Create QR codes for URLs, text, emails, and more. Download as PNG or copy to clipboard.',
  keywords: ['QR code generator', 'QR code creator', 'free QR code', 'URL to QR code', 'QR maker'],
  openGraph: {
    title: 'QR Code Generator - Create Free QR Codes',
    description: 'Generate QR codes instantly for URLs, text, and more. Free and easy to use.',
    url: 'https://quicktools-dusky.vercel.app/qr-code-generator',
  },
};

export default function QRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
