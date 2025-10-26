"use client";

import { useState } from "react";

export default function WordCounter() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState("");

  const countWords = () => {
    const words = input.trim().split(/\s+/).filter(Boolean);
    const chars = input.length;
    const lines = input.split("\n").length;
    const paragraphs = input.split(/\n\s*\n/).filter(Boolean).length;
    const readingTime = Math.ceil(words.length / 200);
    setStats(
      `Words: ${words.length}\nCharacters: ${chars}\nLines: ${lines}\nParagraphs: ${paragraphs}\nEstimated Reading Time: ${readingTime} min`
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">📝 Word Counter</h1>
      <p className="text-center text-gray-600 mb-6">
        Paste or type your text below to get instant word and character stats.
      </p>

      <textarea
        className="w-full h-64 p-3 border rounded mb-4"
        placeholder="Paste your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex justify-center">
        <button onClick={countWords} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
          Count Words
        </button>
      </div>

      <textarea
        className="w-full h-48 p-3 border rounded bg-gray-100 resize-none mt-4"
        value={stats}
        readOnly
        placeholder="Word count results will appear here..."
      />
    </div>
  );
}
