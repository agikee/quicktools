'use client';

import { useState } from 'react';

type CalculationMode = 'percent-of' | 'what-percent' | 'percent-is';

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<CalculationMode>('percent-of');
  const [values, setValues] = useState({
    percent: '',
    of: '',
    is: '',
    result: '',
  });

  const calculate = () => {
    const { percent, of, is } = values;
    let result = '';

    switch (mode) {
      case 'percent-of': {
        // X% of Y = ?
        const p = parseFloat(percent);
        const y = parseFloat(of);
        if (!isNaN(p) && !isNaN(y)) {
          result = ((p / 100) * y).toFixed(2);
        }
        break;
      }
      case 'what-percent': {
        // X is what % of Y?
        const x = parseFloat(percent);
        const y = parseFloat(of);
        if (!isNaN(x) && !isNaN(y) && y !== 0) {
          result = ((x / y) * 100).toFixed(2) + '%';
        }
        break;
      }
      case 'percent-is': {
        // X is Y% of what?
        const x = parseFloat(percent);
        const y = parseFloat(of);
        if (!isNaN(x) && !isNaN(y) && y !== 0) {
          result = ((x * 100) / y).toFixed(2);
        }
        break;
      }
    }

    setValues({ ...values, result });
  };

  const reset = () => {
    setValues({ percent: '', of: '', is: '', result: '' });
  };

  const modes: { key: CalculationMode; label: string; description: string }[] = [
    { key: 'percent-of', label: 'X% of Y = ?', description: 'Calculate a percentage of a number' },
    { key: 'what-percent', label: 'X is what % of Y?', description: 'Find what percentage one number is of another' },
    { key: 'percent-is', label: 'X is Y% of what?', description: 'Find the whole given a part and percentage' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Percentage Calculator</h1>
        <p className="text-gray-600">Calculate percentages with three different modes</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Mode Selection */}
        <div className="space-y-2">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => {
                setMode(m.key);
                reset();
              }}
              className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                mode === m.key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{m.label}</div>
              <div className="text-sm text-gray-500">{m.description}</div>
            </button>
          ))}
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {mode === 'percent-of' && (
            <>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={values.percent}
                  onChange={(e) => setValues({ ...values, percent: e.target.value })}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                  placeholder="Percentage"
                />
                <span className="text-lg font-medium">%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">of</span>
                <input
                  type="number"
                  value={values.of}
                  onChange={(e) => setValues({ ...values, of: e.target.value })}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                  placeholder="Number"
                />
              </div>
            </>
          )}

          {mode === 'what-percent' && (
            <>
              <input
                type="number"
                value={values.percent}
                onChange={(e) => setValues({ ...values, percent: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Number (e.g., 25)"
              />
              <p className="text-center text-gray-500">is what percentage of</p>
              <input
                type="number"
                value={values.of}
                onChange={(e) => setValues({ ...values, of: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Number (e.g., 200)"
              />
            </>
          )}

          {mode === 'percent-is' && (
            <>
              <input
                type="number"
                value={values.percent}
                onChange={(e) => setValues({ ...values, percent: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Number (e.g., 25)"
              />
              <div className="flex items-center gap-2">
                <span className="text-gray-500">is</span>
                <input
                  type="number"
                  value={values.of}
                  onChange={(e) => setValues({ ...values, of: e.target.value })}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                  placeholder="Percentage"
                />
                <span className="text-lg font-medium">%</span>
              </div>
            </>
          )}
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Calculate
        </button>

        {/* Result */}
        {values.result && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-sm text-green-600 mb-1">Result</div>
            <div className="text-4xl font-bold text-green-700">{values.result}</div>
          </div>
        )}
      </div>

      {/* Quick Examples */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <h3 className="font-semibold mb-2">💡 Quick Examples</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• <strong>20% of $80</strong> = $16</li>
          <li>• <strong>$15 is what % of $60?</strong> = 25%</li>
          <li>• <strong>$30 is 15% of what?</strong> = $200</li>
        </ul>
      </div>
    </div>
  );
}
