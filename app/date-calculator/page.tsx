'use client';

import { useState, useMemo } from 'react';
import { Calendar, ArrowRightLeft, Clock, CalendarDays } from 'lucide-react';

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const result = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return null;
    }

    // Calculate difference in milliseconds
    const diffMs = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;

    // Calculate months and years
    let months = 0;
    let years = 0;
    let tempDate = new Date(start);

    if (end > start) {
      while (tempDate < end) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        if (tempDate <= end) months++;
      }
      years = Math.floor(months / 12);
      months = months % 12;
    }

    // Calculate total values
    const totalWeeks = Math.floor(diffDays / 7);
    const totalHours = diffDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    return {
      days: diffDays,
      weeks: diffWeeks,
      remainingDays,
      years,
      months,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      isPast: end < start,
    };
  }, [startDate, endDate]);

  const swapDates = () => {
    const temp = startDate;
    setStartDate(endDate);
    setEndDate(temp);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Date Calculator</h1>
        <p className="text-gray-600">Calculate the difference between two dates</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Date Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-date" className="block font-medium mb-2">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="end-date" className="block font-medium mb-2">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={swapDates}
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowRightLeft className="w-4 h-4" />
          Swap Dates
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Main Result */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">
                {result.days.toLocaleString()}
              </div>
              <div className="text-gray-600">Total Days</div>
              {result.isPast && (
                <div className="text-sm text-amber-600 mt-2">
                  ⚠️ End date is before start date (showing absolute difference)
                </div>
              )}
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {result.weeks} weeks, {result.remainingDays} days
                </div>
                <div className="text-sm text-gray-500">Weeks & Days</div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {result.years} years, {result.months} months
                </div>
                <div className="text-sm text-gray-500">Years & Months</div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                Time Breakdown
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-cyan-600">{result.totalWeeks.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Weeks</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-cyan-600">{result.totalHours.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Hours</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-cyan-600">{result.totalMinutes.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Minutes</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-cyan-600">{result.totalSeconds.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-cyan-50 rounded-xl">
        <h3 className="font-semibold text-cyan-900 mb-2 flex items-center gap-2">
          <CalendarDays className="w-5 h-5" /> 💡 Date Tips
        </h3>
        <ul className="text-sm text-cyan-800 space-y-1">
          <li>• Use this to calculate project deadlines, trip durations, or age</li>
          <li>• Weeks are calculated as 7-day periods</li>
          <li>• Months are approximate (30.44 days average)</li>
          <li>• Perfect for planning events or tracking milestones</li>
        </ul>
      </div>
    </div>
  );
}
