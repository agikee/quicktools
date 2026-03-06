import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About QuickTools - Free Online Calculators',
  description: 'QuickTools provides free, fast, and private online calculators and utilities. No data collection, no sign-up required.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About QuickTools</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-700 mb-6">
          QuickTools is a collection of free, fast, and private online calculators and utilities.
          We believe simple tools should be easy to use and respect your privacy.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700">
            To provide the fastest, simplest, and most private online tools for everyday calculations.
            No accounts, no tracking, no complicated interfaces — just tools that work.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Why QuickTools?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Fast:</strong> All calculations happen instantly in your browser</li>
            <li><strong>Private:</strong> Your data never leaves your device — we don't store anything</li>
            <li><strong>Free:</strong> All tools are free to use, supported by non-intrusive ads</li>
            <li><strong>Mobile-friendly:</strong> Works perfectly on any device</li>
            <li><strong>No sign-up:</strong> Just open and use — no accounts required</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Our Tools</h2>
          <p className="text-gray-700 mb-4">
            We offer a variety of calculators and utilities:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>BMI Calculator</li>
            <li>Tip Calculator</li>
            <li>Percentage Calculator</li>
            <li>Password Generator</li>
            <li>Unit Converter</li>
            <li>Color Picker</li>
            <li>Word Counter</li>
            <li>Age Calculator</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Support</h2>
          <p className="text-gray-700">
            QuickTools is supported by advertising. We keep ads minimal and non-intrusive
            to maintain a great user experience while keeping our tools free for everyone.
          </p>
        </section>
      </div>
    </div>
  );
}
