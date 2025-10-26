"use client";

import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const beautify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2));
    } catch {
      alert("Invalid JSON input!");
    }
  };

  const minify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
    } catch {
      alert("Invalid JSON input!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">🧾 JSON Formatter</h1>
      <p className="text-center text-gray-600 mb-6">
        Paste your JSON below to beautify or minify instantly.
      </p>

      <textarea
        className="w-full h-64 p-3 border rounded mb-4"
        placeholder="Paste JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

   <div className="flex flex-wrap justify-center gap-4 mb-6">
  <button
    onClick={beautify}
    type="button"
    className="appearance-none select-none !bg-indigo-600 !text-white !px-5 !py-2.5 !rounded-lg !font-medium !text-sm hover:!bg-indigo-700 focus:!outline-none focus:!ring-2 focus:!ring-indigo-500 shadow-sm transition-transform transform hover:-translate-y-0.5"
  >
    Beautify
  </button>

  <button
    onClick={minify}
    type="button"
    className="appearance-none select-none !bg-gray-600 !text-white !px-5 !py-2.5 !rounded-lg !font-medium !text-sm hover:!bg-gray-700 focus:!outline-none focus:!ring-2 focus:!ring-gray-500 shadow-sm transition-transform transform hover:-translate-y-0.5"
  >
    Minify
  </button>
</div>



      <textarea
        className="w-full h-64 p-3 border rounded bg-gray-100 resize-none"
        value={output}
        readOnly
        placeholder="Formatted JSON output will appear here..."
      />
    </div>
  );
}
