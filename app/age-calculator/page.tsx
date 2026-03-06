'use client';

import { useState } from 'react';
import { Calendar, Cake } from 'lucide-react';

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    nextBirthday: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      return;
    }

    // Calculate years, months, days
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate totals
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next birthday
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setAge({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: daysUntilBirthday,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Age Calculator</h1>
        <p className="text-gray-600">Calculate your exact age in years, months, and days</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Input */}
        <div>
          <label className="block font-medium mb-2">Enter Your Birth Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateAge}
          disabled={!birthDate}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Calculate Age
        </button>

        {/* Results */}
        {age && (
          <div className="space-y-4">
            {/* Main Result */}
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <Cake className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {age.years} Years, {age.months} Months, {age.days} Days
              </div>
              <p className="text-gray-600">Your exact age</p>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">{age.totalMonths.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Months</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">{age.totalWeeks.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Weeks</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center col-span-2">
                <div className="text-2xl font-bold">{age.totalDays.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Days</div>
              </div>
            </div>

            {/* Next Birthday */}
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-purple-600 font-medium">
                🎂 Your next birthday is in {age.nextBirthday} days!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fun Facts */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <h3 className="font-semibold mb-2">🎉 Age Fun Facts</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• You've taken approximately {((age?.totalDays || 0) * 22000).toLocaleString()} breaths</li>
          <li>• Your heart has beaten about {((age?.totalDays || 0) * 100000).toLocaleString()} times</li>
          <li>• You've slept approximately {Math.floor((age?.totalDays || 0) / 3)} days</li>
        </ul>
      </div>
    </div>
  );
}
