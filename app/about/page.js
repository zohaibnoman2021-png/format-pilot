export const metadata = {
  title: "About Us | Format Pilot",
  description:
    "Learn about Format Pilot — our mission to simplify data formatting and cleaning for everyone.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-20 px-6 max-w-4xl mx-auto leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-center">👋 About Format Pilot</h1>
      <p className="mb-4">
        Format Pilot was built to solve a simple but universal problem: working with
        messy data and unformatted text. Our goal is to empower developers, writers, and
        analysts to clean and convert data instantly — without needing complex software.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">🚀 Our Mission</h2>
      <p className="mb-4">
        We aim to make data formatting accessible to everyone. Whether you need to
        convert JSON to CSV, format YAML, or re-structure text, Format Pilot gives you
        professional-grade tools in your browser.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">💡 Why We Built It</h2>
      <p className="mb-4">
        Traditional tools require installations, coding knowledge, or paid software.
        Format Pilot removes all friction — it’s fast, lightweight, and privacy-first.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">🌍 Our Values</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Transparency — clear, honest communication.</li>
        <li>Privacy — no permanent data storage.</li>
        <li>Accessibility — simple tools for all skill levels.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">🤝 Get in Touch</h2>
      <p>
        We love hearing feedback and ideas! Contact us anytime at{" "}
        <span className="text-indigo-500">support@formatpilot.com</span>.
      </p>
    </main>
  );
}
