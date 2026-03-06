'use client';

import { useState } from 'react';
import { QrCode, Download, Copy, Check, Link2 } from 'lucide-react';

export default function QRCodeGeneratorPage() {
  const [input, setInput] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateQR = () => {
    if (!input.trim()) return;
    const encoded = encodeURIComponent(input);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
    setQrUrl(url);
  };

  const downloadQR = async () => {
    if (!qrUrl) return;
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyQR = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: copy URL
      await navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
        <p className="text-gray-600">Create QR codes for URLs, text, and more</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Input */}
        <div>
          <label htmlFor="qr-input" className="block font-medium mb-2">
            Enter URL or Text
          </label>
          <div className="relative">
            <Link2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              id="qr-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com or any text"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateQR}
          disabled={!input.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <QrCode className="w-5 h-5" />
          Generate QR Code
        </button>

        {/* QR Code Display */}
        {qrUrl && (
          <div className="space-y-4">
            <div className="flex justify-center p-6 bg-gray-50 rounded-xl">
              <img
                src={qrUrl}
                alt="Generated QR Code"
                className="max-w-[300px] rounded-lg shadow-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={downloadQR}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download PNG
              </button>
              <button
                onClick={copyQR}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
        <h3 className="font-semibold text-indigo-900 mb-2">💡 QR Code Tips</h3>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• QR codes work best with URLs, email addresses, and short text</li>
          <li>• For URLs, include the full https:// prefix</li>
          <li>• Larger QR codes are easier to scan</li>
          <li>• Test your QR code before printing or sharing</li>
        </ul>
      </div>
    </div>
  );
}
