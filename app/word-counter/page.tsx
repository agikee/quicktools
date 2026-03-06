'use client';

import { useState, useMemo } from 'react';
import { FileText, Hash, Type, AlignLeft, BookOpen, MessageSquare } from 'lucide-react';

export default function WordCounterPage() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed
    const speakingTime = Math.ceil(words / 150); // Average speaking speed

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    };
  }, [text]);

  const statCards = [
    { icon: Hash, label: 'Words', value: stats.words },
    { icon: Type, label: 'Characters', value: stats.characters },
    { icon: FileText, label: 'Characters (no spaces)', value: stats.charactersNoSpaces },
    { icon: MessageSquare, label: 'Sentences', value: stats.sentences },
    { icon: BookOpen, label: 'Paragraphs', value: stats.paragraphs },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Word Counter</h1>
        <p className="text-gray-600">Count words, characters, sentences, and more</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Statistics</h2>

          {statCards.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{value.toLocaleString()}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            </div>
          ))}

          {/* Reading/Speaking Time */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-medium mb-2">Estimated Time</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Reading</span>
                <span className="font-medium">{stats.readingTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Speaking</span>
                <span className="font-medium">{stats.speakingTime} min</span>
              </div>
            </div>
          </div>

          {/* Clear Button */}
          {text && (
            <button
              onClick={() => setText('')}
              className="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear Text
            </button>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <h3 className="font-semibold mb-2">💡 Did You Know?</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Average reading speed is 200-250 words per minute</li>
          <li>• Average speaking speed is 125-150 words per minute</li>
          <li>• A typical novel has 80,000-100,000 words</li>
        </ul>
      </div>
    </div>
  );
}
