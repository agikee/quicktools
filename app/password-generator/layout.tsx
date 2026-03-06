import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Generator - Create Secure Random Passwords',
  description: 'Free password generator. Create strong, secure, random passwords instantly. Customizable length and character types. No data stored.',
  keywords: ['password generator', 'secure password', 'random password', 'strong password', 'password creator'],
  openGraph: {
    title: 'Password Generator - Free Secure Password Tool',
    description: 'Generate secure random passwords instantly. Customize length and character types.',
    url: 'https://quicktools-dusky.vercel.app/password-generator',
  },
};

export default function PasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
