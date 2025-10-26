import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* 🌟 Hero Section */}
      <section className="hero text-center py-20">
        <h1 className="text-5xl font-extrabold mb-4 flex justify-center items-center gap-3">
          <span>🚀</span> Format Pilot
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Convert, clean, and format any data or text instantly — all in one simple, powerful workspace.
        </p>

        {/* 💬 CTA text (replaces Explore Tools button) */}
        <p className="mt-6 text-indigo-600 dark:text-indigo-400 font-medium">
          Choose a tool below to get started 👇
        </p>
      </section>

      {/* 🧰 Tools Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto pb-24 mt-10">
        {[
          {
            href: "/convert",
            emoji: "🧩",
            title: "Universal Data Formatter",
            desc: "Convert JSON, CSV, XML, YAML, Markdown, and more — all with a single click.",
          },
          {
            href: "/text-tools",
            emoji: "🧠",
            title: "Text Utilities Toolkit",
            desc: "Count words, change case, reverse text, and clean your writing instantly.",
          },
          {
            href: "/file-tools",
            emoji: "📂",
            title: "File Upload & Export Tools",
            desc: "Upload, preview, convert, and export structured data effortlessly.",
          },
          {
            href: "/dev-tools",
            emoji: "💻",
            title: "Developer Tools",
            desc: "Generate code snippets, convert JSON/YAML, and build SQL schemas quickly.",
          },
        ].map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block p-6 rounded-2xl bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <span className="text-2xl">{tool.emoji}</span> {tool.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {tool.desc}
            </p>
          </Link>
        ))}
      </section>

      
    </main>
  );
}
