'use client';

import { useState } from 'react';
import { Heart, Sparkles, RefreshCw, Share2 } from 'lucide-react';

export default function LoveCalculatorPage() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<{
    percentage: number;
    message: string;
    emoji: string;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;

    setIsCalculating(true);
    setResult(null);

    // Fun "calculation" - deterministic but feels random
    const combined = (name1.toLowerCase() + name2.toLowerCase()).split('').reverse();
    const code = combined.reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const percentage = (code % 51) + 50; // Always between 50-100 for fun

    setTimeout(() => {
      let message: string;
      let emoji: string;

      if (percentage >= 95) {
        message = "Soulmates! 💫 A love written in the stars!";
        emoji = "💕";
      } else if (percentage >= 85) {
        message = "Incredible connection! You two are magic together!";
        emoji = "💖";
      } else if (percentage >= 75) {
        message = "Strong chemistry! This could be something special!";
        emoji = "💗";
      } else if (percentage >= 65) {
        message = "Good compatibility! Worth exploring further!";
        emoji = "💓";
      } else if (percentage >= 55) {
        message = "There's potential here. Give it a chance!";
        emoji = "💝";
      } else {
        message = "Friendship might be the path for you two!";
        emoji = "💛";
      }

      setResult({ percentage, message, emoji });
      setIsCalculating(false);
    }, 1500);
  };

  const share = async () => {
    if (!result) return;
    const text = `${name1} ❤️ ${name2} = ${result.percentage}% compatibility! ${result.message} Calculate yours at QuickTools!`;
    try {
      await navigator.share({ text });
    } catch {
      await navigator.clipboard.writeText(text);
    }
  };

  const reset = () => {
    setName1('');
    setName2('');
    setResult(null);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Love Calculator 💕</h1>
        <p className="text-gray-600">Calculate the compatibility between two names</p>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl shadow-lg p-6 space-y-6">
        {/* Name Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name1" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              id="name1"
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              maxLength={30}
            />
          </div>

          <div className="text-center text-3xl">❤️</div>

          <div>
            <label htmlFor="name2" className="block text-sm font-medium text-gray-700 mb-1">
              Their Name
            </label>
            <input
              id="name2"
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Enter their name"
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
              maxLength={30}
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateLove}
          disabled={!name1.trim() || !name2.trim() || isCalculating}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:scale-100"
        >
          {isCalculating ? (
            <>
              <Sparkles className="w-5 h-5 animate-pulse" />
              Calculating...
            </>
          ) : (
            <>
              <Heart className="w-5 h-5" />
              Calculate Love
            </>
          )}
        </button>

        {/* Result */}
        {result && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-xl p-6 text-center shadow-inner">
              <div className="text-6xl mb-3">{result.emoji}</div>
              <div className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-3">
                {result.percentage}%
              </div>
              <div className="text-lg text-gray-700">
                {name1} & {name2}
              </div>
            </div>

            <div className="bg-white/70 rounded-xl p-4 text-center">
              <p className="text-gray-700">{result.message}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <button
                onClick={share}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-lg font-medium text-pink-600 hover:bg-pink-50 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fun Note */}
      <div className="mt-8 p-4 bg-pink-50 rounded-xl text-center">
        <p className="text-sm text-pink-700">
          🎉 Just for fun! Share with friends and see your compatibility!
        </p>
      </div>
    </div>
  );
}
