export const metadata = {
  title: "Contact Us | Format Pilot",
  description:
    "Get in touch with the Format Pilot team for support, feedback, or collaboration inquiries.",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-20 px-6 max-w-3xl mx-auto leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-center">📬 Contact Us</h1>
      <p className="text-center mb-10 text-gray-600 dark:text-gray-400">
        Have a question, suggestion, or issue? We’d love to hear from you.
      </p>

      <form className="space-y-5 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-3"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-3"
        />
        <textarea
          placeholder="Your Message"
          required
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg w-full transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
        Or email us directly at{" "}
        <span className="text-indigo-500">support@formatpilot.com</span>
      </div>
    </main>
  );
}
