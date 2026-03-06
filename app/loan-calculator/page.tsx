'use client';

import { useState, useMemo } from 'react';
import { DollarSign, Calculator, TrendingDown, PieChart } from 'lucide-react';

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('250000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [termType, setTermType] = useState<'years' | 'months'>('years');

  const result = useMemo(() => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const months = termType === 'years' ? parseFloat(loanTerm) * 12 : parseFloat(loanTerm);

    if (!principal || !rate || !months || principal <= 0 || rate <= 0 || months <= 0) {
      return null;
    }

    // Calculate monthly payment using amortization formula
    const monthlyPayment =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal,
      months,
      years: months / 12,
    };
  }, [loanAmount, interestRate, loanTerm, termType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Loan Calculator</h1>
        <p className="text-gray-600">Calculate monthly payments, interest, and total cost</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Loan Amount */}
        <div>
          <label htmlFor="loan-amount" className="block font-medium mb-2">
            Loan Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="loan-amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              min="0"
              step="1000"
              className="w-full pl-10 pr-4 py-3 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label htmlFor="interest-rate" className="block font-medium mb-2">
            Annual Interest Rate (%)
          </label>
          <input
            id="interest-rate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            min="0"
            max="50"
            step="0.1"
            className="w-full p-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Loan Term */}
        <div>
          <label htmlFor="loan-term" className="block font-medium mb-2">
            Loan Term
          </label>
          <div className="flex gap-2">
            <input
              id="loan-term"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              min="1"
              className="flex-1 p-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setTermType('years')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  termType === 'years'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-600'
                }`}
              >
                Years
              </button>
              <button
                onClick={() => setTermType('months')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  termType === 'months'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-600'
                }`}
              >
                Months
              </button>
            </div>
          </div>
        </div>

        {/* Quick Loan Amounts */}
        <div className="flex flex-wrap gap-2">
          {[100000, 250000, 500000, 750000].map((amount) => (
            <button
              key={amount}
              onClick={() => setLoanAmount(amount.toString())}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                loanAmount === amount.toString()
                  ? 'bg-green-100 text-green-700 border-2 border-green-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ${amount.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Monthly Payment */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
              <div className="text-sm text-gray-600 mb-1">Monthly Payment</div>
              <div className="text-5xl font-bold text-green-600 mb-2">
                {formatCurrency(result.monthlyPayment)}
              </div>
              <div className="text-sm text-gray-500">
                for {result.months} months ({result.years.toFixed(1)} years)
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Total of {result.months} Payments</div>
                <div className="text-2xl font-bold text-gray-800">
                  {formatCurrency(result.totalPayment)}
                </div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <div className="text-sm text-orange-700 mb-1">Total Interest</div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrency(result.totalInterest)}
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-gray-500" />
                Payment Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-600 flex-1">Principal</span>
                  <span className="font-medium">{formatCurrency(result.principal)}</span>
                  <span className="text-sm text-gray-500">
                    {((result.principal / result.totalPayment) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-sm text-gray-600 flex-1">Interest</span>
                  <span className="font-medium">{formatCurrency(result.totalInterest)}</span>
                  <span className="text-sm text-gray-500">
                    {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: `${(result.principal / result.totalPayment) * 100}%` }}
                  />
                  <div
                    className="bg-orange-500 h-full"
                    style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-green-50 rounded-xl">
        <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
          <Calculator className="w-5 h-5" /> 💡 Loan Tips
        </h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• A 15-year mortgage typically has a lower rate than a 30-year</li>
          <li>• Making extra payments can save thousands in interest</li>
          <li>• Consider total cost, not just monthly payment</li>
          <li>• Shop around for the best interest rate</li>
        </ul>
      </div>
    </div>
  );
}
