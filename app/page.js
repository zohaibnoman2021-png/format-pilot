export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* 🧭 Header / Navbar */}
      <header className="py-4 border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Format Pilot</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:text-indigo-600">Tools</a>
            <a href="#" className="hover:text-indigo-600">Blog</a>
            <a href="#" className="hover:text-indigo-600">About</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
          </nav>
        </div>
      </header>

    {/* 🌟 Hero Section */}
<section className="relative flex flex-col items-center justify-center py-32 text-center overflow-hidden">
  {/* Background gradient animation */}
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 animate-pulse-slow" />

  <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 relative z-10">
    Convert, Clean & Format Data or Text Instantly
  </h2>
  <p className="text-lg md:text-xl text-gray-600 max-w-2xl relative z-10">
    All-in-one toolkit for developers, writers, and analysts — format JSON, CSV, text, and more with ease.
  </p>

  <div className="mt-8 space-x-4 relative z-10">
    <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition transform hover:scale-105">
      Try Free Tools
    </button>
    <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition transform hover:scale-105">
      Explore Features
    </button>
  </div>
</section>


      {/* 🧰 Features Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h3 className="text-3xl font-bold mb-10 text-gray-900">
      🚀 Key Features
    </h3>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {/* Feature 1 */}
      <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
        <div className="text-indigo-600 text-4xl mb-4">🔁</div>
        <h4 className="text-xl font-semibold mb-2">Multi-Format Converter</h4>
        <p className="text-gray-600">
          Convert between JSON, CSV, XML, YAML, Markdown, and more — instantly in your browser.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
        <div className="text-indigo-600 text-4xl mb-4">🧹</div>
        <h4 className="text-xl font-semibold mb-2">Data Cleaner & Validator</h4>
        <p className="text-gray-600">
          Beautify, format, and validate any data structure — no more syntax errors.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
        <div className="text-indigo-600 text-4xl mb-4">✍️</div>
        <h4 className="text-xl font-semibold mb-2">Text Utilities</h4>
        <p className="text-gray-600">
          Count words, find synonyms, reverse text, or rewrite sentences with AI assistance.
        </p>
      </div>

      {/* Feature 4 */}
      <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
        <div className="text-indigo-600 text-4xl mb-4">⚙️</div>
        <h4 className="text-xl font-semibold mb-2">Developer Tools</h4>
        <p className="text-gray-600">
          Create and compare schemas, clean API responses, or format your code snippets easily.
        </p>
      </div>

      {/* Feature 5 */}
      <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
        <div className="text-indigo-600 text-4xl mb-4">🔒</div>
        <h4 className="text-xl font-semibold mb-2">Secure & Private</h4>
        <p className="text-gray-600">
          Everything runs locally in your browser — your data is never sent to our servers.
        </p>
      </div>

      {/* Feature 6 */}
      <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
        <div className="text-indigo-600 text-4xl mb-4">⚡</div>
        <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
        <p className="text-gray-600">
          Minimal load time, instant conversions — optimized for productivity.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* 🧩 Popular Tools Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h3 className="text-3xl font-bold mb-10 text-gray-900">
      🧩 Popular Tools
    </h3>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {/* Tool 1 */}
      <a href="#" className="block bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition hover:-translate-y-1">
        <div className="text-indigo-600 text-4xl mb-4">📄</div>
        <h4 className="text-xl font-semibold mb-2">JSON to CSV Converter</h4>
        <p className="text-gray-600">
          Convert JSON data to CSV in one click — no formatting errors.
        </p>
      </a>

      {/* Tool 2 */}
      <a href="#" className="block bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition hover:-translate-y-1">
        <div className="text-indigo-600 text-4xl mb-4">🧾</div>
        <h4 className="text-xl font-semibold mb-2">XML to JSON Converter</h4>
        <p className="text-gray-600">
          Easily transform XML documents into clean, readable JSON.
        </p>
      </a>

      {/* Tool 3 */}
      <a href="#" className="block bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition hover:-translate-y-1">
        <div className="text-indigo-600 text-4xl mb-4">🪶</div>
        <h4 className="text-xl font-semibold mb-2">Word Counter</h4>
        <p className="text-gray-600">
          Count words, characters, and sentences instantly — great for writers.
        </p>
      </a>

      {/* Tool 4 */}
      <a href="#" className="block bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition hover:-translate-y-1">
        <div className="text-indigo-600 text-4xl mb-4">🔁</div>
        <h4 className="text-xl font-semibold mb-2">Text Reverser</h4>
        <p className="text-gray-600">
          Flip text backwards perfectly — for fun or formatting checks.
        </p>
      </a>

      {/* Tool 5 */}
      <a href="#" className="block bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition hover:-translate-y-1">
        <div className="text-indigo-600 text-4xl mb-4">🧠</div>
        <h4 className="text-xl font-semibold mb-2">Sentence Rewriter (AI)</h4>
        <p className="text-gray-600">
          Rewrite and simplify any sentence using AI assistance.
        </p>
      </a>

      {/* Tool 6 */}
      <a href="#" className="block bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition hover:-translate-y-1">
        <div className="text-indigo-600 text-4xl mb-4">⚙️</div>
        <h4 className="text-xl font-semibold mb-2">YAML Formatter</h4>
        <p className="text-gray-600">
          Clean and structure YAML files instantly — no indentation pain.
        </p>
      </a>
    </div>
  </div>
</section>


      {/* 🦶 Footer */}
<footer className="bg-gray-900 text-gray-300 py-12">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
    
    {/* Brand */}
    <div>
      <h4 className="text-xl font-bold text-white mb-4">Format Pilot</h4>
      <p className="text-gray-400 text-sm leading-relaxed">
        The all-in-one toolkit to format, clean, and transform your data or text effortlessly. 
        Fast. Secure. 100% browser-based.
      </p>
    </div>

    {/* Tools */}
    <div>
      <h5 className="text-lg font-semibold text-white mb-3">Tools</h5>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-indigo-400">JSON to CSV</a></li>
        <li><a href="#" className="hover:text-indigo-400">Text Reverser</a></li>
        <li><a href="#" className="hover:text-indigo-400">Word Counter</a></li>
        <li><a href="#" className="hover:text-indigo-400">YAML Formatter</a></li>
      </ul>
    </div>

    {/* Company */}
    <div>
      <h5 className="text-lg font-semibold text-white mb-3">Company</h5>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-indigo-400">About</a></li>
        <li><a href="#" className="hover:text-indigo-400">Blog</a></li>
        <li><a href="#" className="hover:text-indigo-400">Contact</a></li>
      </ul>
    </div>

    {/* Legal */}
    <div>
      <h5 className="text-lg font-semibold text-white mb-3">Legal</h5>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-indigo-400">Terms & Conditions</a></li>
        <li><a href="#" className="hover:text-indigo-400">Cookie Policy</a></li>
      </ul>
    </div>

  </div>

  <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Format Pilot — All Rights Reserved.
  </div>
</footer>
</main>
  );
}
