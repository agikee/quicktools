'use client';

import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

type Category = 'length' | 'weight' | 'temperature';

const conversions = {
  length: {
    units: ['meters', 'kilometers', 'feet', 'miles', 'inches', 'centimeters'],
    toBase: {
      meters: 1,
      kilometers: 1000,
      feet: 0.3048,
      miles: 1609.344,
      inches: 0.0254,
      centimeters: 0.01,
    },
  },
  weight: {
    units: ['kilograms', 'grams', 'pounds', 'ounces', 'tons'],
    toBase: {
      kilograms: 1,
      grams: 0.001,
      pounds: 0.453592,
      ounces: 0.0283495,
      tons: 1000,
    },
  },
  temperature: {
    units: ['celsius', 'fahrenheit', 'kelvin'],
    special: true,
  },
};

function convertTemperature(value: number, from: string, to: string): number {
  // Convert to Celsius first
  let celsius: number;
  switch (from) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * (5 / 9);
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }

  // Convert from Celsius to target
  switch (to) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return celsius * (9 / 5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    default:
      return celsius;
  }
}

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const handleConvert = (value: string, from: string, to: string, cat: Category) => {
    setFromValue(value);
    const num = parseFloat(value);
    if (isNaN(num)) {
      setToValue('');
      return;
    }

    if (cat === 'temperature') {
      const result = convertTemperature(num, from, to);
      setToValue(result.toFixed(4).replace(/\.?0+$/, ''));
    } else {
      const config = conversions[cat] as { units: string[]; toBase: Record<string, number> };
      const baseValue = num * config.toBase[from];
      const result = baseValue / config.toBase[to];
      setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
    }
  };

  const handleSwap = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    handleConvert(toValue, toUnit, tempUnit, category);
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    const units = conversions[newCategory].units;
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setFromValue('1');
    handleConvert('1', units[0], units[1], newCategory);
  };

  const currentUnits = conversions[category].units;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Unit Converter</h1>
        <p className="text-gray-600">Convert between different units of measurement</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {[
          { key: 'length', label: 'Length', icon: '📏' },
          { key: 'weight', label: 'Weight', icon: '⚖️' },
          { key: 'temperature', label: 'Temperature', icon: '🌡️' },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key as Category)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              category === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* From */}
        <div className="space-y-3">
          <label className="block font-medium">From</label>
          <select
            value={fromUnit}
            onChange={(e) => {
              setFromUnit(e.target.value);
              handleConvert(fromValue, e.target.value, toUnit, category);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {currentUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => handleConvert(e.target.value, fromUnit, toUnit, category)}
            className="w-full p-4 text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter value"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowRightLeft className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* To */}
        <div className="space-y-3">
          <label className="block font-medium">To</label>
          <select
            value={toUnit}
            onChange={(e) => {
              setToUnit(e.target.value);
              handleConvert(fromValue, fromUnit, e.target.value, category);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {currentUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </option>
            ))}
          </select>
          <div className="w-full p-4 text-2xl bg-gray-50 border border-gray-200 rounded-lg">
            {toValue || '0'}
          </div>
        </div>

        {/* Result Display */}
        {fromValue && toValue && (
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-lg">
              <span className="font-semibold">{fromValue}</span> {fromUnit} ={' '}
              <span className="font-semibold text-blue-600">{toValue}</span> {toUnit}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
