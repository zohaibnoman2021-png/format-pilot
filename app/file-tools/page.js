"use client";
import { useState } from "react";
import Papa from "papaparse";
import YAML from "yaml";

export default function FileTools() {
  const [fileName, setFileName] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [outputContent, setOutputContent] = useState("");
  const [outputFormat, setOutputFormat] = useState("JSON");
  const [error, setError] = useState("");

  // 🧩 Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setInputContent(content);
    };
    reader.readAsText(file);
  };

  // 🧠 Detect File Type Automatically
  const detectFormat = (text) => {
    try {
      JSON.parse(text);
      return "JSON";
    } catch {}
    if (text.includes(",") && text.includes("\n")) return "CSV";
    if (text.trim().startsWith("<")) return "XML";
    if (text.includes(": ") && !text.includes("{")) return "YAML";
    return "TXT";
  };

  // 🔄 Convert Logic
  const convertFile = () => {
    setError("");
    try {
      const detectedFormat = detectFormat(inputContent);
      let data;

      // Parse Input
      switch (detectedFormat) {
        case "JSON":
          data = JSON.parse(inputContent);
          break;
        case "CSV":
          data = Papa.parse(inputContent.trim(), { header: true }).data;
          break;
        case "YAML":
          data = YAML.parse(inputContent);
          break;
        case "XML":
          const parser = new DOMParser();
          const xml = parser.parseFromString(inputContent, "text/xml");
          data = xmlToJson(xml);
          break;
        default:
          data = { text: inputContent };
      }

      // Convert to Output
      let result;
      switch (outputFormat) {
        case "JSON":
          result = JSON.stringify(data, null, 2);
          break;
        case "CSV":
          result = Papa.unparse(data);
          break;
        case "YAML":
          result = YAML.stringify(data);
          break;
        case "XML":
          result = jsonToXml(data);
          break;
        case "TXT":
          result = JSON.stringify(data, null, 2)
            .replace(/[{}[\]"]/g, "")
            .replace(/,/g, "\n");
          break;
        default:
          result = "Unsupported format";
      }

      setOutputContent(result);
    } catch (err) {
      setError("⚠️ Conversion failed: " + err.message);
    }
  };

  // 💾 Download File
  const downloadFile = () => {
    const blob = new Blob([outputContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `converted_${fileName.split(".")[0]}.${outputFormat.toLowerCase()}`;
    link.click();
  };

  // 📋 Copy Output
  const copyOutput = () => {
    navigator.clipboard.writeText(outputContent);
    alert("✅ Output copied to clipboard!");
  };

  // Helper Functions
  const xmlToJson = (xml) => {
    let obj = {};
    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      obj = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        if (typeof obj[nodeName] === "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };

  const jsonToXml = (obj) => {
    let xml = "";
    for (let prop in obj) {
      if (Array.isArray(obj[prop])) {
        for (let arrayElem of obj[prop]) {
          xml += `<${prop}>${jsonToXml(arrayElem)}</${prop}>`;
        }
      } else if (typeof obj[prop] === "object") {
        xml += `<${prop}>${jsonToXml(obj[prop])}</${prop}>`;
      } else {
        xml += `<${prop}>${obj[prop]}</${prop}>`;
      }
    }
    return xml;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-xl rounded-2xl p-8 transition-all">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          File Upload & Export Tools
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Upload, preview, convert, and download your files easily.
        </p>

        {/* Upload Section */}
        <div className="flex flex-col items-center mb-6">
          <input
            type="file"
            accept=".json,.csv,.xml,.yaml,.yml,.txt"
            onChange={handleFileUpload}
            className="mb-4 cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />
          {fileName && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📄 Uploaded: <strong>{fileName}</strong>
            </p>
          )}
        </div>

        {/* Conversion Options */}
        <div className="flex flex-col md:flex-row justify-center gap-3 mb-6">
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="border rounded p-2 dark:bg-gray-800 dark:text-gray-200"
          >
            <option>JSON</option>
            <option>CSV</option>
            <option>YAML</option>
            <option>XML</option>
            <option>TXT</option>
          </select>

          <button
            onClick={convertFile}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
          >
            Convert
          </button>

          <button
            onClick={downloadFile}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Download
          </button>

          <button
            onClick={copyOutput}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
          >
            Copy
          </button>
        </div>

        {/* Error */}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        {/* Input / Output */}
        <div className="grid md:grid-cols-2 gap-6">
          <textarea
            className="w-full h-72 p-3 border rounded resize-none dark:bg-gray-800 dark:text-gray-100"
            value={inputContent}
            readOnly
            placeholder="Uploaded file preview..."
          />
          <textarea
            className="w-full h-72 p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100 resize-none"
            value={outputContent}
            readOnly
            placeholder="Converted output will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
