"use client";
import { useState, useEffect } from "react";
import Toast from "../components/Toast";

export default function TextTools() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [toast, setToast] = useState(null);


  // 🌙 Match global theme
  useEffect(() => {
    document.title = "Text Utilities Toolkit | Format Pilot";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Free text utility toolkit — count words, convert case, clean lines, and analyze text instantly online with Format Pilot."
      );
  }, []);

  // 🔤 Word, Char, Line, Paragraph Counter
  const wordCount = () => {
    const words = input.trim().split(/\s+/).filter(Boolean);
    const chars = input.length;
    const lines = input.split("\n").filter(Boolean).length;
    const paragraphs = input.split(/\n\s*\n/).filter(Boolean).length;
    const readingTime = Math.ceil(words.length / 200);
    setOutput(
      `📝 Words: ${words.length}\n🔠 Characters: ${chars}\n📄 Lines: ${lines}\n📑 Paragraphs: ${paragraphs}\n⏱ Estimated Reading Time: ${readingTime} min`
    );
  };

  // 🔡 Case Converters
  const toUpperCase = () => setOutput(input.toUpperCase());
  const toLowerCase = () => setOutput(input.toLowerCase());
  const toTitleCase = () =>
    setOutput(
      input
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    );
  const toSentenceCase = () =>
    setOutput(
      input
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
    );

  // 🔄 Text Reversal
  const reverseText = () => setOutput(input.split("").reverse().join(""));

  // 📜 Line Tools
  const sortLines = () => {
    const lines = input.split("\n").sort((a, b) => a.localeCompare(b));
    setOutput(lines.join("\n"));
  };
  const removeDuplicateLines = () => {
    const unique = [...new Set(input.split("\n"))];
    setOutput(unique.join("\n"));
  };
  const cleanSpaces = () => setOutput(input.replace(/\s+/g, " ").trim());

  // 📋 Copy to Clipboard
  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setToast({ message: "✅ Output copied to clipboard!", type: "success" });

  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">
        🧠 Text Utilities Toolkit
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Transform, analyze, and clean text instantly — no signup or upload.
      </p>

      {/* Input Area */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-48 p-3 border rounded mb-4 resize-none dark:bg-gray-900 dark:text-gray-100"
        placeholder="Enter or paste your text here..."
      />

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white" onClick={wordCount}>
          Count Words
        </button>

        {/* Case Converters */}
        <button className="btn bg-blue-600 hover:bg-blue-700 text-white" onClick={toUpperCase}>
          UPPERCASE
        </button>
        <button className="btn bg-blue-600 hover:bg-blue-700 text-white" onClick={toLowerCase}>
          lowercase
        </button>
        <button className="btn bg-blue-600 hover:bg-blue-700 text-white" onClick={toTitleCase}>
          Title Case
        </button>
        <button className="btn bg-blue-600 hover:bg-blue-700 text-white" onClick={toSentenceCase}>
          Sentence Case
        </button>

        {/* Reversal */}
        <button className="btn bg-teal-600 hover:bg-teal-700 text-white" onClick={reverseText}>
          Reverse
        </button>

        {/* Line Tools */}
        <button className="btn bg-amber-600 hover:bg-amber-700 text-white" onClick={sortLines}>
          Sort Lines
        </button>
        <button className="btn bg-amber-600 hover:bg-amber-700 text-white" onClick={removeDuplicateLines}>
          Remove Duplicates
        </button>
        <button className="btn bg-amber-600 hover:bg-amber-700 text-white" onClick={cleanSpaces}>
          Clean Spaces
        </button>

        {/* Copy */}
        <button className="btn bg-green-600 hover:bg-green-700 text-white" onClick={copyOutput}>
          Copy Output
        </button>
      </div>

      {/* Output Area */}
      <textarea
        value={output}
        readOnly
        className="w-full h-48 p-3 border rounded bg-gray-100 resize-none dark:bg-gray-800 dark:text-gray-100"
        placeholder="Your output will appear here..."
      />
      {toast && (
  <Toast
    message={toast.message}
    type={toast.type}
  />
)}

    </div>
  );
}
