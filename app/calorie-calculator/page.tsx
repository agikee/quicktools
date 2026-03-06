'use client';

import { useState, useMemo } from 'react';
import { Flame, Activity, Target, Scale } from 'lucide-react';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

const activityMultipliers: Record<ActivityLevel, { label: string; multiplier: number }> = {
  sedentary: { label: 'Sedentary (little or no exercise)', multiplier: 1.2 },
  light: { label: 'Light (exercise 1-3 days/week)', multiplier: 1.375 },
  moderate: { label: 'Moderate (exercise 3-5 days/week)', multiplier: 1.55 },
  active: { label: 'Active (exercise 6-7 days/week)', multiplier: 1.725 },
  'very-active': { label: 'Very Active (hard exercise daily)', multiplier: 1.9 },
};

export default function CalorieCalculatorPage() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('30');
  const [height, setHeight] = useState({ feet: '5', inches: '10' });
  const [weight, setWeight] = useState({ lbs: '160' });
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');

  const result = useMemo(() => {
    const ageNum = parseFloat(age);
    const heightInches = parseFloat(height.feet) * 12 + parseFloat(height.inches);
    const weightLbs = parseFloat(weight.lbs);

    if (!ageNum || !heightInches || !weightLbs) {
      return null;
    }

    // Convert to metric for Mifflin-St Jeor equation
    const weightKg = weightLbs * 0.453592;
    const heightCm = heightInches * 2.54;

    // Calculate BMR (Basal Metabolic Rate)
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultipliers[activityLevel].multiplier;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: {
        mild: Math.round(tdee - 250), // 0.25 kg/week
        moderate: Math.round(tdee - 500), // 0.5 kg/week
        aggressive: Math.round(tdee - 1000), // 1 kg/week
      },
      weightGain: {
        mild: Math.round(tdee + 250),
        moderate: Math.round(tdee + 500),
      },
    };
  }, [gender, age, height, weight, activityLevel]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Calorie Calculator</h1>
        <p className="text-gray-600">Calculate your daily calorie needs based on your goals</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Gender */}
        <div>
          <label className="block font-medium mb-2">Gender</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setGender('male')}
              className={`py-3 rounded-lg font-medium transition-colors ${
                gender === 'male'
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`py-3 rounded-lg font-medium transition-colors ${
                gender === 'female'
                  ? 'bg-pink-100 text-pink-700 border-2 border-pink-500'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block font-medium mb-2">
            Age
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="15"
            max="100"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Height */}
        <div>
          <label className="block font-medium mb-2">Height</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={height.feet}
                onChange={(e) => setHeight({ ...height, feet: e.target.value })}
                min="3"
                max="8"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-xs text-gray-500 mt-1 block">Feet</span>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={height.inches}
                onChange={(e) => setHeight({ ...height, inches: e.target.value })}
                min="0"
                max="11"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-xs text-gray-500 mt-1 block">Inches</span>
            </div>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block font-medium mb-2">
            Weight (lbs)
          </label>
          <input
            id="weight"
            type="number"
            value={weight.lbs}
            onChange={(e) => setWeight({ lbs: e.target.value })}
            min="50"
            max="500"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Activity Level */}
        <div>
          <label className="block font-medium mb-2">Activity Level</label>
          <div className="space-y-2">
            {(Object.keys(activityMultipliers) as ActivityLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setActivityLevel(level)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activityLevel === level
                    ? 'bg-orange-100 text-orange-800 border-2 border-orange-500'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {activityMultipliers[level].label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Maintenance Calories */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-center">
              <div className="text-sm text-gray-600 mb-1">Daily Calories to Maintain Weight</div>
              <div className="text-5xl font-bold text-orange-600 mb-2">
                {result.tdee.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                calories/day
              </div>
            </div>

            {/* BMR */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Basal Metabolic Rate (BMR)</div>
              <div className="text-2xl font-bold text-gray-800">
                {result.bmr.toLocaleString()} calories/day
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Calories burned at complete rest
              </div>
            </div>

            {/* Goal Calories */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4" /> Weight Loss
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mild (0.25 kg/week)</span>
                    <span className="font-medium text-blue-700">{result.weightLoss.mild}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Moderate (0.5 kg/week)</span>
                    <span className="font-medium text-blue-700">{result.weightLoss.moderate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Aggressive (1 kg/week)</span>
                    <span className="font-medium text-blue-700">{result.weightLoss.aggressive}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Weight Gain
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mild (0.25 kg/week)</span>
                    <span className="font-medium text-green-700">{result.weightGain.mild}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Moderate (0.5 kg/week)</span>
                    <span className="font-medium text-green-700">{result.weightGain.moderate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-orange-50 rounded-xl">
        <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
          <Flame className="w-5 h-5" /> 💡 Calorie Tips
        </h3>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• TDEE is your Total Daily Energy Expenditure</li>
          <li>• Eat 500 calories below TDEE to lose ~1 lb/week</li>
          <li>• Never eat below 1200 (women) or 1500 (men) calories</li>
          <li>• Combine with exercise for best results</li>
        </ul>
      </div>
    </div>
  );
}
