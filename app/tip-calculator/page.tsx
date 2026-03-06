'use client';

import { useState, useMemo } from 'react';

export default function TipCalculatorPage() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercent, setTipPercent] = useState('18');
  const [splitCount, setSplitCount] = useState('1');

  const result = useMemo(() => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercent);
    const split = parseInt(splitCount) || 1;

    if (!bill || bill <= 0) {
      return null;
    }

    const tipAmount = bill * (tip / 100);
    const total = bill + tipAmount;
    const perPerson = total / split;

    return {
      tipAmount,
      total,
      perPerson,
      bill,
      tipPercent: tip,
      splitCount: split,
    };
  }, [billAmount, tipPercent, splitCount]);

  const quickTips = [10, 15, 18, 20, 25];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Tip Calculator</h1>
        <p className="text-gray-600">Calculate tips and split bills easily</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Bill Amount */}
        <div>
          <label className="block font-medium mb-2">Bill Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-4 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tip Percentage */}
        <div>
          <label className="block font-medium mb-2">Tip Percentage</label>
          <div className="flex gap-2 mb-3">
            {quickTips.map((tip) => (
              <button
                key={tip}
                onClick={() => setTipPercent(tip.toString())}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  tipPercent === tip.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tip}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="50"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            className="w-full"
          />
          <div className="text-center text-2xl font-bold text-blue-600 mt-2">
            {tipPercent}%
          </div>
        </div>

        {/* Split */}
        <div>
          <label className="block font-medium mb-2">Split Between</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSplitCount(Math.max(1, parseInt(splitCount) - 1).toString())}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-2xl font-medium"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <div className="text-4xl font-bold">{splitCount}</div>
              <div className="text-gray-500 text-sm">people</div>
            </div>
            <button
              onClick={() => setSplitCount((parseInt(splitCount) + 1).toString())}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-2xl font-medium"
            >
              +
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Tip Amount</div>
                <div className="text-2xl font-bold text-green-600">
                  ${result.tipAmount.toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Total</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${result.total.toFixed(2)}
                </div>
              </div>
            </div>

            {result.splitCount > 1 && (
              <div className="border-t border-blue-200 pt-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Per Person</div>
                <div className="text-3xl font-bold text-indigo-600">
                  ${result.perPerson.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Each person pays ${(result.bill / result.splitCount).toFixed(2)} + ${(result.tipAmount / result.splitCount).toFixed(2)} tip
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <h3 className="font-semibold mb-2">💡 Tipping Guide</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>15-18%</strong> - Standard service</li>
          <li>• <strong>18-20%</strong> - Good service</li>
          <li>• <strong>20%+</strong> - Exceptional service</li>
        </ul>
      </div>
    </div>
  );
}
