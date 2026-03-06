'use client';

import { useState, useMemo } from 'react';

export default function BMICalculatorPage() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState({ feet: '5', inches: '10' });
  const [heightCm, setHeightCm] = useState('178');
  const [weight, setWeight] = useState({ lbs: '160' });
  const [weightKg, setWeightKg] = useState('72');

  const bmi = useMemo(() => {
    let heightM: number;
    let weightKgValue: number;

    if (unit === 'imperial') {
      const totalInches = parseFloat(height.feet) * 12 + parseFloat(height.inches);
      heightM = totalInches * 0.0254;
      weightKgValue = parseFloat(weight.lbs) * 0.453592;
    } else {
      heightM = parseFloat(heightCm) / 100;
      weightKgValue = parseFloat(weightKg);
    }

    if (!heightM || !weightKgValue || heightM <= 0 || weightKgValue <= 0) {
      return null;
    }

    return weightKgValue / (heightM * heightM);
  }, [unit, height, heightCm, weight, weightKg]);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (bmi < 25) return { label: 'Normal weight', color: 'text-green-600', bg: 'bg-green-100' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const category = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
        <p className="text-gray-600">Calculate your Body Mass Index and check your health category</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Unit Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setUnit('metric')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              unit === 'metric' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
            }`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              unit === 'imperial' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
            }`}
          >
            Imperial (lbs/ft)
          </button>
        </div>

        {/* Height Input */}
        <div>
          <label className="block font-medium mb-2">Height</label>
          {unit === 'imperial' ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={height.feet}
                onChange={(e) => setHeight({ ...height, feet: e.target.value })}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Feet"
              />
              <input
                type="number"
                value={height.inches}
                onChange={(e) => setHeight({ ...height, inches: e.target.value })}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Inches"
              />
            </div>
          ) : (
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Height in cm"
            />
          )}
        </div>

        {/* Weight Input */}
        <div>
          <label className="block font-medium mb-2">Weight</label>
          <input
            type="number"
            value={unit === 'imperial' ? weight.lbs : weightKg}
            onChange={(e) =>
              unit === 'imperial'
                ? setWeight({ lbs: e.target.value })
                : setWeightKg(e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={unit === 'imperial' ? 'Weight in lbs' : 'Weight in kg'}
          />
        </div>

        {/* Results */}
        {bmi && category && (
          <div className="space-y-4">
            <div className={`${category.bg} rounded-xl p-6 text-center`}>
              <div className={`text-5xl font-bold ${category.color} mb-2`}>
                {bmi.toFixed(1)}
              </div>
              <div className={`text-lg font-medium ${category.color}`}>
                {category.label}
              </div>
            </div>

            {/* BMI Scale */}
            <div className="space-y-2">
              <div className="relative h-4 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 rounded-full">
                <div
                  className="absolute w-4 h-4 bg-white border-2 border-gray-800 rounded-full -translate-x-1/2 top-0"
                  style={{ left: `${Math.min(Math.max((bmi - 15) / 25, 0), 1) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Underweight (&lt;18.5)</span>
                <span>Normal (18.5-25)</span>
                <span>Overweight (25-30)</span>
                <span>Obese (&gt;30)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <h3 className="font-semibold text-blue-900 mb-2">What is BMI?</h3>
        <p className="text-sm text-blue-800">
          Body Mass Index (BMI) is a measure of body fat based on height and weight.
          It's a useful indicator of whether you're at a healthy weight, though it
          doesn't account for muscle mass or body composition.
        </p>
      </div>
    </div>
  );
}
