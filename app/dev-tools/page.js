"use client";
import { useState } from "react";
import YAML from "yaml";
import Toast from "../components/Toast";

/* 🧠 Utility: Convert JSON to Code Snippets */
function jsonToCode(json, language) {
  try {
    if (typeof json === "string") json = JSON.parse(json);
    switch (language) {
      case "python":
        return (
          "data = " +
          JSON.stringify(json, null, 2)
            .replace(/"/g, "'")
            .replace(/: /g, ": ")
        );
      case "javascript":
        return "const data = " + JSON.stringify(json, null, 2) + ";";
      case "php":
        return (
          "<?php\n$data = json_decode('" +
          JSON.stringify(json).replace(/'/g, "\\'") +
          "', true);\n?>"
        );
      default:
        return JSON.stringify(json, null, 2);
    }
  } catch (err) {
    return "⚠️ Invalid JSON: " + err.message;
  }
}

/* 🧩 Utility: Render JSON Tree Recursively */
function JSONTree({ data, level = 0 }) {
  const indent = " ".repeat(level * 2);
  return (
    <div className="font-mono text-sm">
      {Object.entries(data).map(([key, value], idx) => (
        <div key={idx} className="ml-4">
          {typeof value === "object" && value !== null ? (
            <details className="mb-1">
              <summary className="cursor-pointer text-indigo-600 dark:text-indigo-400">
                {indent}"{key}": {"{"}
              </summary>
              <div className="ml-4 border-l pl-2 border-gray-300 dark:border-gray-700">
                <JSONTree data={value} level={level + 1} />
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {indent}{"}"}
              </div>
            </details>
          ) : (
            <div className="text-gray-700 dark:text-gray-300">
              {indent}"{key}":{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                {JSON.stringify(value)}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function DevTools() {
    const [toast, setToast] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState("json");
  const [error, setError] = useState("");
  const [parsedJSON, setParsedJSON] = useState(null);

  /* 🔁 JSON ↔ YAML */
  const convertFormat = () => {
    try {
      if (format === "json") {
        const parsed = JSON.parse(input);
        setOutput(YAML.stringify(parsed));
      } else {
        const parsed = YAML.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      }
    } catch (err) {
      setOutput("⚠️ Conversion error: " + err.message);
    }
  };

  /* 💻 Generate Code Snippets */
  const generateSnippet = (lang) => {
    const snippet = jsonToCode(input, lang);
    setOutput(snippet);
  };

  /* 🧩 JSON → SQL */
  const convertToSQL = () => {
    setError("");
    try {
      const json = JSON.parse(input);
      if (Array.isArray(json)) {
        const tableName = "my_table";
        const columns = Object.keys(json[0]);
        const createTable = `
CREATE TABLE ${tableName} (
  ${columns.map((col) => `${col} TEXT`).join(",\n  ")}
);`;
        const insertStatements = json
          .map((row) => {
            const values = columns
              .map((col) => `'${String(row[col]).replace(/'/g, "''")}'`)
              .join(", ");
            return `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values});`;
          })
          .join("\n");
        setOutput(`${createTable}\n\n${insertStatements}`);
      } else {
        throw new Error("JSON should be an array of objects.");
      }
    } catch (err) {
      setError("⚠️ Invalid JSON: " + err.message);
      setOutput("");
    }
  };

  /* 🔄 SQL → JSON */
  const convertToJSON = () => {
    setError("");
    try {
      const lines = input.split("\n").filter((l) => l.trim().startsWith("INSERT INTO"));
      const result = lines.map((line) => {
        const match = line.match(/\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
        if (!match) return null;
        const columns = match[1].split(",").map((c) => c.trim());
        const values = match[2].split(",").map((v) => v.trim().replace(/['"]/g, ""));
        const obj = {};
        columns.forEach((col, i) => (obj[col] = values[i]));
        return obj;
      });
      setOutput(JSON.stringify(result.filter(Boolean), null, 2));
    } catch (err) {
      setError("⚠️ Conversion failed: " + err.message);
      setOutput("");
    }
  };

  /* 🧭 Parse & Visualize JSON Schema */
  const visualizeSchema = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setParsedJSON(parsed);
      setOutput("// Schema visualization generated below 👇");
    } catch (err) {
      setParsedJSON(null);
      setError("⚠️ Invalid JSON: " + err.message);
    }
  };

  /* 📋 Copy */
  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setToast({ message: "✅ Output copied to clipboard!", type: "success" });

  };

  /* 🧱 UI */
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">
        💻 Developer Tools Suite
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Convert JSON ↔ YAML, generate code snippets, build SQL schemas, or visualize data structures.
      </p>

      {/* Input */}
      <textarea
        className="w-full h-64 p-3 border rounded mb-4 resize-none dark:bg-gray-900 dark:text-gray-100"
        placeholder="Paste your JSON, YAML, or SQL here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="border rounded p-2"
        >
          <option value="json">JSON → YAML</option>
          <option value="yaml">YAML → JSON</option>
        </select>
        <button
          onClick={convertFormat}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Convert Format
        </button>
        <button
          onClick={() => generateSnippet("python")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Python
        </button>
        <button
          onClick={() => generateSnippet("javascript")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          JavaScript
        </button>
        <button
          onClick={() => generateSnippet("php")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          PHP
        </button>
        <button
          onClick={convertToSQL}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          JSON → SQL
        </button>
        <button
          onClick={convertToJSON}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded"
        >
          SQL → JSON
        </button>
        <button
          onClick={visualizeSchema}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
        >
          Visualize Schema
        </button>
        <button
          onClick={copyOutput}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Copy Output
        </button>
      </div>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      {/* Output */}
      <textarea
        className="w-full h-64 p-3 border rounded bg-gray-100 resize-none dark:bg-gray-800 dark:text-gray-100"
        placeholder="Converted result or code snippet will appear here..."
        value={output}
        readOnly
      />

      {/* JSON Schema Visualization */}
      {parsedJSON && (
        <div className="mt-10 p-4 bg-gray-50 dark:bg-gray-900 rounded border">
          <h2 className="text-xl font-semibold mb-3 text-indigo-700 dark:text-indigo-300">
            🧩 JSON Schema Visualization
          </h2>
          <JSONTree data={parsedJSON} />
        </div>
      )}
      {toast && (
  <Toast
    message={toast.message}
    type={toast.type}
  />
)}

    </div>
  );
}
