export const metadata = {
  title: "Cookies Policy | Format Pilot",
  description:
    "Learn how Format Pilot uses cookies to enhance your experience, ensure functionality, and improve analytics.",
};

export default function CookiesPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-20 px-6 max-w-4xl mx-auto leading-relaxed">
      <h1 className="text-4xl font-bold mb-8 text-center">🍪 Cookies Policy</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400 text-center">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-4">
        This Cookies Policy explains how <strong>Format Pilot</strong> uses cookies and
        similar technologies to enhance your experience and improve our website’s
        performance.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files stored on your device when you visit a website.
        They help remember your preferences, maintain session data, and analyze website
        usage for improvements.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Types of Cookies We Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Essential Cookies:</strong> Required for basic site functionality (e.g., session management).</li>
        <li><strong>Functional Cookies:</strong> Improve usability by remembering settings or inputs.</li>
        <li><strong>Analytics Cookies:</strong> Collect anonymous data about usage to improve performance.</li>
        <li><strong>Third-Party Cookies:</strong> May be used by embedded services (like Cloudinary or Google Analytics).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Managing Cookies</h2>
      <p className="mb-4">
        You can control or delete cookies through your browser settings. Disabling some
        cookies may affect the site’s functionality or prevent certain tools from working
        correctly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Data Protection</h2>
      <p className="mb-4">
        We do not use cookies to collect personal or sensitive information. Any analytics
        data is anonymized and used purely for technical and performance insights.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Updates to This Policy</h2>
      <p>
        We may update this Cookies Policy occasionally to reflect changes in technology
        or legal requirements. Any updates will appear on this page with a revised
        “Last Updated” date.
      </p>
    </main>
  );
}
