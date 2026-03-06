import Link from 'next/link';
import { Calculator, DollarSign, Percent, Lock, ArrowRightLeft, Palette, FileText, Calendar } from 'lucide-react';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'QuickTools',
  description: 'Free online calculators and utilities',
  url: 'https://quicktools-dusky.vercel.app',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://quicktools-dusky.vercel.app/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const tools = [
  {
    href: '/bmi-calculator',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and see health categories',
    icon: Calculator,
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    href: '/tip-calculator',
    title: 'Tip Calculator',
    description: 'Calculate tips and split bills between friends',
    icon: DollarSign,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    href: '/percentage',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases',
    icon: Percent,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    href: '/password-generator',
    title: 'Password Generator',
    description: 'Generate secure, random passwords instantly',
    icon: Lock,
    color: 'bg-rose-100 text-rose-600',
  },
  {
    href: '/unit-converter',
    title: 'Unit Converter',
    description: 'Convert length, weight, and temperature units',
    icon: ArrowRightLeft,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    href: '/color-picker',
    title: 'Color Picker',
    description: 'Pick colors and convert between HEX, RGB, and HSL',
    icon: Palette,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    href: '/word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, and sentences in text',
    icon: FileText,
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    href: '/age-calculator',
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days',
    icon: Calendar,
    color: 'bg-indigo-100 text-indigo-600',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            ⚡ QuickTools
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Free Online Tools
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Fast, private, and easy-to-use calculators and utilities.
          No sign-up required. Your data stays on your device.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md p-6 transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h2>
              <p className="text-sm text-gray-600">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-t py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Use QuickTools?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">
                All calculations happen instantly in your browser
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Private</h3>
              <p className="text-gray-600 text-sm">
                Your data never leaves your device
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600 text-sm">
                Works perfectly on any device
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>⚡ QuickTools - Free online calculators and utilities</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
            {' • '}
            <Link href="/about" className="hover:text-gray-700">About</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
