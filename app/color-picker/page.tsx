'use client';

import { useState } from 'react';
import { Copy, Check, Palette } from 'lucide-react';

export default function ColorPickerPage() {
  const [color, setColor] = useState('#3b82f6');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const colorFormats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '' },
    { label: 'HSL', value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '' },
  ];

  const presetColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5ea', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Color Picker</h1>
        <p className="text-gray-600">Pick a color and get it in multiple formats</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Color Preview */}
        <div
          className="h-40 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <Palette className="w-12 h-12 text-white/80" />
        </div>

        {/* Color Input */}
        <div className="flex gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-20 h-12 rounded-lg cursor-pointer"
          />
          <input
            type="text"
            value={color.toUpperCase()}
            onChange={(e) => {
              const val = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                setColor(val);
              }
            }}
            className="flex-1 p-3 text-lg font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="#000000"
          />
        </div>

        {/* Preset Colors */}
        <div>
          <label className="block font-medium mb-2">Quick Colors</label>
          <div className="grid grid-cols-8 gap-2">
            {presetColors.map((preset) => (
              <button
                key={preset}
                onClick={() => setColor(preset)}
                className={`w-full aspect-square rounded-lg transition-transform hover:scale-110 ${
                  color === preset ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: preset }}
              />
            ))}
          </div>
        </div>

        {/* Color Formats */}
        <div className="space-y-3">
          <label className="block font-medium">Color Formats</label>
          {colorFormats.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span className="w-16 text-sm font-medium text-gray-500">{label}</span>
              <code className="flex-1 font-mono">{value}</code>
              <button
                onClick={() => copyToClipboard(value, label)}
                className="p-2 text-gray-400 hover:text-blue-600"
              >
                {copied === label ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Color Details */}
        {rgb && hsl && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Color Details</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Red:</span>
                <span className="ml-2 font-mono">{rgb.r}</span>
              </div>
              <div>
                <span className="text-gray-500">Green:</span>
                <span className="ml-2 font-mono">{rgb.g}</span>
              </div>
              <div>
                <span className="text-gray-500">Blue:</span>
                <span className="ml-2 font-mono">{rgb.b}</span>
              </div>
              <div>
                <span className="text-gray-500">Hue:</span>
                <span className="ml-2 font-mono">{hsl.h}°</span>
              </div>
              <div>
                <span className="text-gray-500">Saturation:</span>
                <span className="ml-2 font-mono">{hsl.s}%</span>
              </div>
              <div>
                <span className="text-gray-500">Lightness:</span>
                <span className="ml-2 font-mono">{hsl.l}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
