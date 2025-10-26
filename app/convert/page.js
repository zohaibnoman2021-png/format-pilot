"use client";

import { useState } from "react";
import Papa from "papaparse";
import YAML from "yaml";
import { marked } from "marked";
import QuickActions from "../components/QuickActions";
import Toast from "../components/Toast";

import {
  removeDuplicates,
  normalizeWhitespace,
  reorderKeys,
  escapeCharacters,
  unescapeCharacters,
  convertDateFormats,
  truncateDataPreview,
  convertNumbers,
  mergeDatasets,
  splitDataset,
} from "../utils/cleaning";

/* ---------------- Utilities ---------------- */

function safeJsonParse(text) {
  try {
    return { data: JSON.parse(text), ok: true };
  } catch (e) {
    return { ok: false, error: e };
  }
}

function ensureArrayOfObjects(value) {
  if (Array.isArray(value)) {
    if (value.length && typeof value[0] !== "object") {
      return value.map((v, i) => ({ index: i, value: String(v) }));
    }
    return value;
  }
  if (value && typeof value === "object") return [value];
  return [{ value: String(value ?? "") }];
}

function xmlToJsonNode(node) {
  if (node.nodeType === 3) {
    const t = node.nodeValue.trim();
    return t ? t : undefined;
  }

  if (node.nodeType === 1) {
    const obj = {};
    if (node.attributes && node.attributes.length) {
      obj["@attributes"] = {};
      for (let i = 0; i < node.attributes.length; i++) {
        const a = node.attributes[i];
        obj["@attributes"][a.name] = a.value;
      }
    }

    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      const converted = xmlToJsonNode(child);
      if (converted === undefined) continue;
      const name = child.nodeName;
      if (child.nodeType === 3) {
        if (!obj["#text"]) obj["#text"] = converted;
      } else {
        if (!obj[name]) obj[name] = converted;
        else {
          if (!Array.isArray(obj[name])) obj[name] = [obj[name]];
          obj[name].push(converted);
        }
      }
    }
    return obj;
  }
  return undefined;
}

function jsonToXml(obj, tag) {
  if (obj == null) return tag ? `<${tag}/>` : "";
  if (typeof obj !== "object") {
    return tag ? `<${tag}>${String(obj)}</${tag}>` : String(obj);
  }
  let attrs = "";
  let inner = "";

  if (obj["@attributes"]) {
    for (const [k, v] of Object.entries(obj["@attributes"])) {
      attrs += ` ${k}="${String(v)}"`;
    }
  }
  if (obj["#text"]) inner += String(obj["#text"]);

  for (const [k, v] of Object.entries(obj)) {
    if (k === "@attributes" || k === "#text") continue;
    if (Array.isArray(v)) {
      v.forEach((item) => {
        inner += jsonToXml(item, k);
      });
    } else {
      inner += jsonToXml(v, k);
    }
  }
  return tag ? `<${tag}${attrs}>${inner}</${tag}>` : inner;
}

function jsonToMarkdownTable(json) {
  const arr = ensureArrayOfObjects(json);
  if (!arr.length) return "|  | \n| --- | \n| |\n";
  const keys = Object.keys(arr[0]);
  const header = `| ${keys.join(" | ")} |`;
  const divider = `| ${keys.map(() => "---").join(" | ")} |`;
  const rows = arr.map((row) => `| ${keys.map((k) => String(row[k] ?? "")).join(" | ")} |`);
  return [header, divider, ...rows].join("\n");
}

/* ---------------- Component ---------------- */

export default function DataConverter() {
  const [inputFormat, setInputFormat] = useState("Auto Detect");
  const [outputFormat, setOutputFormat] = useState("JSON");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const detectFormat = (text) => {
    if (!text || !text.trim()) return "Plain Text";
    if (safeJsonParse(text).ok) return "JSON";
    const t = text.trim();
    if (t.startsWith("<") && t.endsWith(">")) return "XML";
    if (t.includes(",") && t.includes("\n")) return "CSV";
    if (/^---\s|:\s/m.test(t)) return "YAML";
    if (t.includes("|") && t.includes("---")) return "Markdown";
    if (/INSERT\s+INTO/i.test(t)) return "SQL";
    return "Plain Text";
  };

  const convertData = () => {
    setError("");
    setOutput("");

    try {
      const raw = input ?? "";
      const sourceFormat = inputFormat === "Auto Detect" ? detectFormat(raw) : inputFormat;
      let data;

      if (sourceFormat === "JSON") {
        const parsed = safeJsonParse(raw);
        if (!parsed.ok) throw new Error("Invalid JSON");
        data = parsed.data;
      } else if (sourceFormat === "CSV") {
        data = Papa.parse(raw, { header: true, skipEmptyLines: true }).data;
      } else if (sourceFormat === "YAML") {
        data = YAML.parse(raw);
      } else if (sourceFormat === "XML") {
        const parser = new DOMParser();
        const xml = parser.parseFromString(raw, "text/xml");
        const errNode = xml.getElementsByTagName("parsererror")[0];
        if (errNode) throw new Error("Invalid XML");
        const root = xml.documentElement;
        data = { [root.nodeName]: xmlToJsonNode(root) };
      } else if (sourceFormat === "Markdown") {
        data = raw;
      } else if (sourceFormat === "SQL") {
        const match = raw.match(/INSERT INTO (\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
        if (!match) throw new Error("Unsupported SQL format");
        const columns = match[2].split(",").map((c) => c.trim());
        const values = match[3].split(",").map((v) => v.trim().replace(/^['"]|['"]$/g, ""));
        const row = {};
        columns.forEach((c, i) => (row[c] = values[i]));
        data = [row];
      } else {
        data = { text: raw };
      }

      let result = "";

      switch (outputFormat) {
        case "JSON":
          result = JSON.stringify(data, null, 2);
          break;
        case "CSV":
          result = Papa.unparse(ensureArrayOfObjects(data));
          break;
        case "YAML":
          result = YAML.stringify(data);
          break;
        case "XML": {
          if (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 1) {
            const [root, obj] = Object.entries(data)[0];
            result = jsonToXml(obj, root);
          } else {
            result = jsonToXml(data, "root");
          }
          break;
        }
        case "Markdown":
          result = jsonToMarkdownTable(data);
          break;
        case "HTML":
          result = marked.parse(typeof data === "string" ? data : JSON.stringify(data, null, 2));
          break;
        case "SQL": {
          const arr = ensureArrayOfObjects(data);
          if (!arr.length) {
            result = "-- no rows --";
          } else {
            const keys = Object.keys(arr[0]);
            const values = arr
              .map((row) => `(${keys.map((k) => `'${String(row[k] ?? "")}'`).join(", ")})`)
              .join(",\n");
            result = `INSERT INTO table_name (${keys.join(", ")}) VALUES\n${values};`;
          }
          break;
        }
        case "Plain Text":
          result = typeof data === "string"
            ? data
            : JSON.stringify(data, null, 2).replace(/[{}[\]"]/g, "").replace(/,/g, "\n");
          break;
        default:
          result = "Unsupported output format.";
      }

      setOutput(result);
    } catch (e) {
      console.error(e);
      setError(`⚠️ Conversion failed: ${e.message}`);
    }
  };

  /* ---------------- Cleaning ---------------- */

  const handleClean = (action) => {
    if (!input)
      return setToast({ message: "⚠️ Please paste or upload data first!", type: "error" });

    try {
      let data;
      const detected = detectFormat(input);

      if (detected === "JSON") data = JSON.parse(input);
      else if (detected === "CSV") data = Papa.parse(input.trim(), { header: true }).data;
      else data = input;

      let cleaned;
      switch (action) {
        case "removeDuplicates":
          cleaned = removeDuplicates(data);
          break;
        case "normalizeWhitespace":
          cleaned = normalizeWhitespace(input);
          break;
        case "reorderKeys":
          cleaned = reorderKeys(data);
          break;
        case "escapeCharacters":
          cleaned = escapeCharacters(input);
          break;
        case "unescapeCharacters":
          cleaned = unescapeCharacters(input);
          break;
        case "convertDateFormats":
          cleaned = convertDateFormats(data);
          break;
        case "truncateDataPreview":
          cleaned = truncateDataPreview(data, 100);
          break;
        case "convertNumbers":
          cleaned = convertNumbers(data, "number");
          break;
        case "mergeDatasets":
          setToast({ message: "⚠️ Merge requires 2 datasets – coming soon!", type: "info" });
          return;
        case "splitDataset":
          cleaned = splitDataset(data, 50);
          break;
        default:
          return;
      }

      const result =
        detected === "CSV"
          ? Papa.unparse(cleaned)
          : typeof cleaned === "string"
          ? cleaned
          : JSON.stringify(cleaned, null, 2);

      setOutput(result);
      setToast({ message: `✅ ${action.replace(/([A-Z])/g, " $1")} completed!`, type: "success" });
    } catch (err) {
      setToast({ message: "⚠️ Error cleaning data: " + err.message, type: "error" });
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Universal Data Formatter</h1>

      <QuickActions
        onBeautify={() =>
          setOutput((prev) => {
            const parsed = safeJsonParse(prev);
            return parsed.ok ? JSON.stringify(parsed.data, null, 2) : prev;
          })
        }
        onMinify={() =>
          setOutput((prev) => {
            const parsed = safeJsonParse(prev);
            return parsed.ok ? JSON.stringify(parsed.data) : prev;
          })
        }
        onCopy={() => {
          navigator.clipboard.writeText(output || "");
        }}
        onDownload={() => {
          const blob = new Blob([output || ""], { type: "text/plain" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "output.txt";
          a.click();
        }}
      />

      <div className="flex flex-col md:flex-row gap-3 mb-6 justify-center">
        <select
          value={inputFormat}
          onChange={(e) => setInputFormat(e.target.value)}
          className="border rounded p-2 flex-1"
        >
          <option>Auto Detect</option>
          <option>JSON</option>
          <option>CSV</option>
          <option>YAML</option>
          <option>XML</option>
          <option>Markdown</option>
          <option>SQL</option>
          <option>Plain Text</option>
        </select>

        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="border rounded p-2 flex-1"
        >
          <option>JSON</option>
          <option>CSV</option>
          <option>YAML</option>
          <option>XML</option>
          <option>Markdown</option>
          <option>HTML</option>
          <option>SQL</option>
          <option>Plain Text</option>
        </select>

        <button
          type="button"
          onClick={convertData}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
        >
          Convert
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6 justify-center">
        <select
          onChange={(e) => handleClean(e.target.value)}
          className="border rounded p-2 flex-1"
          defaultValue=""
        >
          <option value="">🧹 Select a Cleaning Action</option>
          <option value="removeDuplicates">Remove Duplicates</option>
          <option value="normalizeWhitespace">Normalize Whitespace</option>
          <option value="reorderKeys">Reorder Keys</option>
          <option value="escapeCharacters">Escape Characters</option>
          <option value="unescapeCharacters">Unescape Characters</option>
          <option value="convertDateFormats">Convert Date Formats</option>
          <option value="truncateDataPreview">Truncate Data Preview</option>
          <option value="convertNumbers">Convert Numbers</option>
          <option value="mergeDatasets">Merge Datasets</option>
          <option value="splitDataset">Split Dataset</option>
        </select>
      </div>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      <div className="grid md:grid-cols-2 gap-6">
        <textarea
          className="w-full h-72 p-3 border rounded resize-none"
          placeholder="Paste your input data here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <textarea
          className="w-full h-72 p-3 border rounded bg-gray-100 resize-none"
          placeholder="Converted output will appear here..."
          readOnly
          value={output}
        />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
