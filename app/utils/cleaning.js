// /app/utils/cleaning.js
// 🌐 Format Pilot – Data Cleaning & Transformation Suite
// Each function is standalone so you can import individually or all at once.

// ------------------------------------------------------
// 🧹 1. Remove duplicate rows / objects
export function removeDuplicates(data) {
  if (Array.isArray(data)) {
    const seen = new Set();
    const unique = [];

    for (const item of data) {
      const key = typeof item === "object" ? JSON.stringify(item) : item;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    return unique;
  }
  if (typeof data === "object" && data !== null) {
    const uniqueKeys = {};
    for (const [key, value] of Object.entries(data)) {
      if (!(value in uniqueKeys)) uniqueKeys[key] = value;
    }
    return uniqueKeys;
  }
  return data;
}

// ------------------------------------------------------
// 🧽 2. Normalize whitespace and indentation
export function normalizeWhitespace(text) {
  if (typeof text !== "string") text = JSON.stringify(text, null, 2);
  return text
    .replace(/\r\n/g, "\n")      // normalize line endings
    .replace(/[ \t]+/g, " ")     // collapse spaces/tabs
    .replace(/\n{2,}/g, "\n")    // limit empty lines
    .trim();
}

// ------------------------------------------------------
// 🔤 3. Reorder keys alphabetically (for JSON)
export function reorderKeys(obj) {
  if (Array.isArray(obj)) return obj.map(reorderKeys);
  if (typeof obj !== "object" || obj === null) return obj;

  const sorted = {};
  Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .forEach((key) => {
      sorted[key] = reorderKeys(obj[key]);
    });
  return sorted;
}

// ------------------------------------------------------
// ✂️ 4. Escape & unescape characters
export function escapeCharacters(str) {
  if (typeof str !== "string") str = JSON.stringify(str);
  return str
    .replace(/\\/g, "\\\\")
    .replace(/\"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t");
}

export function unescapeCharacters(str) {
  if (typeof str !== "string") str = JSON.stringify(str);
  return str
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

// ------------------------------------------------------
// 🗓️ 5. Convert date formats
export function convertDateFormats(data, target = "ISO") {
  const dateRegex =
    /\b(0?[1-9]|1[0-2])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](\d{2,4})\b/g;

  const convert = (str) => {
    return str.replace(dateRegex, (match, m, d, y) => {
      if (target === "ISO") return `${y.length === 2 ? "20" + y : y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      else return `${m}/${d}/${y}`;
    });
  };

  if (typeof data === "string") return convert(data);
  if (Array.isArray(data))
    return data.map((row) =>
      typeof row === "object"
        ? Object.fromEntries(
            Object.entries(row).map(([k, v]) => [k, convert(String(v))])
          )
        : convert(String(row))
    );
  if (typeof data === "object")
    return Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, convert(String(v))])
    );

  return data;
}

// ------------------------------------------------------
// 🔍 6. Truncate large data previews
export function truncateDataPreview(data, limit = 100) {
  if (Array.isArray(data)) {
    const truncated = data.slice(0, limit);
    if (data.length > limit) truncated.push({ notice: `+ ${data.length - limit} more items truncated` });
    return truncated;
  }
  if (typeof data === "string") {
    const lines = data.split("\n");
    if (lines.length > limit) {
      return lines.slice(0, limit).join("\n") + `\n...(${lines.length - limit} lines truncated)`;
    }
    return lines.join("\n");
  }
  return data;
}


// ------------------------------------------------------
// 🔢 7. Convert numeric strings ↔ numbers
export function convertNumbers(data, to = "number") {
  const convertValue = (v) => {
    if (to === "number" && !isNaN(v)) return Number(v);
    if (to === "string") return String(v);
    return v;
  };

  if (Array.isArray(data))
    return data.map((row) =>
      typeof row === "object"
        ? Object.fromEntries(Object.entries(row).map(([k, v]) => [k, convertValue(v)]))
        : convertValue(row)
    );

  if (typeof data === "object" && data !== null)
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, convertValue(v)]));

  if (typeof data === "string" || typeof data === "number") return convertValue(data);
  return data;
}

// ------------------------------------------------------
// 🧩 8. Merge & split datasets
export function mergeDatasets(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) throw new Error("Both datasets must be arrays");
  return [...a, ...b];
}

export function splitDataset(data, chunkSize = 100) {
  if (!Array.isArray(data)) throw new Error("Data must be an array");
  const result = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    result.push(data.slice(i, i + chunkSize));
  }
  return result;
}
