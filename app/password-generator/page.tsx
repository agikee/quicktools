'use client';

import { useState, useCallback } from 'react';
import { RefreshCw, Copy, Check, Shield } from 'lucide-react';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong' | 'very-strong'>('weak');

  const generatePassword = useCallback(() => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars === '') {
      setPassword('Select at least one option');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }

    setPassword(result);

    // Calculate strength
    const typesSelected = Object.values(options).filter(Boolean).length;
    if (length >= 16 && typesSelected >= 3) setStrength('very-strong');
    else if (length >= 12 && typesSelected >= 2) setStrength('strong');
    else if (length >= 8) setStrength('medium');
    else setStrength('weak');
  }, [length, options]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
    'very-strong': 'bg-emerald-500',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Password Generator</h1>
        <p className="text-gray-600">Generate secure, random passwords instantly</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Password Display */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between gap-4">
            <code className="text-lg font-mono break-all flex-1">
              {password || 'Click Generate'}
            </code>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-50"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Strength Bar */}
          {password && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 capitalize">{strength.replace('-', ' ')}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${strengthColors[strength]}`}
                  style={{ width: strength === 'very-strong' ? '100%' : strength === 'strong' ? '75%' : strength === 'medium' ? '50%' : '25%' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Length Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium">Password Length</label>
            <span className="text-blue-600 font-semibold">{length}</span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="font-medium">Character Types</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'uppercase', label: 'Uppercase (A-Z)' },
              { key: 'lowercase', label: 'Lowercase (a-z)' },
              { key: 'numbers', label: 'Numbers (0-9)' },
              { key: 'symbols', label: 'Symbols (!@#$...)' },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={options[key as keyof typeof options]}
                  onChange={(e) =>
                    setOptions({ ...options, [key]: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-blue-600"
                />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Password
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Password Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use at least 16 characters for maximum security</li>
          <li>• Include all character types when possible</li>
          <li>• Use a unique password for each account</li>
          <li>• Consider using a password manager</li>
        </ul>
      </div>
    </div>
  );
}
