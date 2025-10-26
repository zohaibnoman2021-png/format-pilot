"use client";

import { useState } from "react";
import Papa from "papaparse";

export default function CsvCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const cleanCsv = () => {
    try {
      const parsed = Papa.parse(input.trim(), { header: true });
      const data = parsed.data.filter((row) => Object.values(row).some(Boolean));
      const unique = Array.from(new Set(data.map(JSON.stringify))).map(JSON.parse);
      setOutput(Papa.unparse(unique));
    } catch {
      alert("Invalid CSV format!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">📊 CSV Cleaner</h1>
      <p className="text-center text-gray-600 mb-6">
        Paste your CSV data and clean duplicates or empty rows instantly.
      </p>

      <textarea
        className="w-full h-64 p-3 border rounded mb-4"
        placeholder="Paste CSV data here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex justify-center">
        <button
          onClick={cleanCsv}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Clean CSV
        </button>
      </div>

      <textarea
        className="w-full h-64 p-3 border rounded bg-gray-100 resize-none mt-4"
        readOnly
        value={output}
        placeholder="Cleaned CSV output..."
      />
    </div>
  );
}
