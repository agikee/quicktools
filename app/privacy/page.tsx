import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | QuickTools',
  description: 'Privacy policy for QuickTools - how we handle your data and advertising practices.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-gray-700">
            QuickTools is designed with privacy in mind. All calculations are performed locally in your browser.
            We do not store, transmit, or have access to any data you enter into our tools.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. Cookies and Tracking</h2>
          <p className="text-gray-700">
            We use cookies for essential site functionality and to support our advertising partners.
            Third-party vendors, including Google, use cookies to serve ads based on your prior visits
            to this website or other websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Advertising</h2>
          <p className="text-gray-700">
            We use Google AdSense to display advertisements. Google may use cookies and web beacons
            to serve ads based on your visits to this and other websites. You can opt out of personalized
            advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
          <p className="text-gray-700">
            This site uses the following third-party services:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Google AdSense - for displaying advertisements</li>
            <li>Google Analytics - for website analytics (if enabled)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
          <p className="text-gray-700">
            Since all calculations happen locally in your browser, your data never leaves your device.
            We have no servers, databases, or storage systems that could be compromised.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">6. Children's Privacy</h2>
          <p className="text-gray-700">
            Our service is not directed to children under 13. We do not knowingly collect personal
            information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">7. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update our Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us through our website.
          </p>
        </section>
      </div>
    </div>
  );
}
