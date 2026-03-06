'use client';

import { useState, useMemo } from 'react';
import { Percent, DollarSign, Tag } from 'lucide-react';

export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [secondDiscount, setSecondDiscount] = useState('');

  const result = useMemo(() => {
    const price = parseFloat(originalPrice);
    const discount1 = parseFloat(discountPercent) || 0;
    const discount2 = parseFloat(secondDiscount) || 0;

    if (!price || price <= 0) {
      return null;
    }

    // Calculate first discount
    const savings1 = price * (discount1 / 100);
    const priceAfter1 = price - savings1;

    // Calculate second discount (if provided)
    const savings2 = discount2 > 0 ? priceAfter1 * (discount2 / 100) : 0;
    const finalPrice = priceAfter1 - savings2;
    const totalSavings = savings1 + savings2;
    const totalDiscountPercent = (totalSavings / price) * 100;

    return {
      originalPrice: price,
      discount1,
      discount2,
      savings1,
      savings2,
      totalSavings,
      priceAfterFirst: priceAfter1,
      finalPrice,
      totalDiscountPercent,
    };
  }, [originalPrice, discountPercent, secondDiscount]);

  const quickDiscounts = [10, 15, 20, 25, 30, 50];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Discount Calculator</h1>
        <p className="text-gray-600">Calculate sale prices and savings instantly</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Original Price */}
        <div>
          <label htmlFor="original-price" className="block font-medium mb-2">
            Original Price
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="original-price"
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-10 pr-4 py-3 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* First Discount */}
        <div>
          <label htmlFor="discount-1" className="block font-medium mb-2">
            Discount Percentage
          </label>
          <div className="flex gap-2 mb-3">
            {quickDiscounts.map((d) => (
              <button
                key={d}
                onClick={() => setDiscountPercent(d.toString())}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  discountPercent === d.toString()
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {d}%
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              id="discount-1"
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              min="0"
              max="100"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter percentage"
            />
            <Percent className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Additional Discount (Optional) */}
        <div>
          <label htmlFor="discount-2" className="block font-medium mb-2">
            Additional Discount (Optional)
            <span className="text-gray-400 text-sm ml-2">e.g., extra 15% off</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              id="discount-2"
              type="number"
              value={secondDiscount}
              onChange={(e) => setSecondDiscount(e.target.value)}
              min="0"
              max="100"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Additional discount %"
            />
            <Percent className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Main Result */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 text-center">
              <div className="text-sm text-gray-600 mb-1">Final Price</div>
              <div className="text-5xl font-bold text-red-600 mb-2">
                ${result.finalPrice.toFixed(2)}
              </div>
              {result.discount2 > 0 && (
                <div className="text-sm text-gray-500">
                  Original: ${result.originalPrice.toFixed(2)} → After 1st discount: ${result.priceAfterFirst.toFixed(2)} → Final: ${result.finalPrice.toFixed(2)}
                </div>
              )}
            </div>

            {/* Savings Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">You Save</div>
                <div className="text-2xl font-bold text-green-600">
                  ${result.totalSavings.toFixed(2)}
                </div>
                <div className="text-sm text-green-700 mt-1">
                  {result.totalDiscountPercent.toFixed(1)}% off
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">You Pay</div>
                <div className="text-2xl font-bold text-blue-600">
                  {((result.finalPrice / result.originalPrice) * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  of original price
                </div>
              </div>
            </div>

            {/* Comparison */}
            {result.discount2 > 0 && (
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium mb-3">Savings Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">First discount ({result.discount1}%):</span>
                    <span className="font-medium">-${result.savings1.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Second discount ({result.discount2}%):</span>
                    <span className="font-medium">-${result.savings2.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total savings:</span>
                    <span className="text-green-600">${result.totalSavings.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-red-50 rounded-xl">
        <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
          <Tag className="w-5 h-5" /> 💡 Shopping Tips
        </h3>
        <ul className="text-sm text-red-800 space-y-1">
          <li>• Stack discounts: Use coupons on already discounted items</li>
          <li>• Compare the final price, not just the discount percentage</li>
          <li>• 50% off + extra 20% off ≠ 70% off (it's actually 60% off total)</li>
          <li>• Look for price matching policies at competing stores</li>
        </ul>
      </div>
    </div>
  );
}
