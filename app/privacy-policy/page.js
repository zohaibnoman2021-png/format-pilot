export const metadata = {
  title: "Privacy Policy | Format Pilot",
  description:
    "Understand how Format Pilot protects your privacy, data, and information. We never sell or permanently store your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-20 px-6 max-w-4xl mx-auto leading-relaxed">
      <h1 className="text-4xl font-bold mb-8 text-center">🔒 Privacy Policy</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400 text-center">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-4">
        At <strong>Format Pilot</strong>, your privacy is our top priority. This Privacy
        Policy outlines how we collect, use, and safeguard your information when you
        visit our website or use our online tools.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
      <p className="mb-4">
        Format Pilot is designed to process your data locally and securely. We do not
        permanently store or track the data you upload or paste into our tools.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Input data:</strong> Text or files uploaded for processing are temporarily used in-memory.</li>
        <li><strong>Analytics:</strong> We may use anonymized analytics (such as Google Analytics or similar) to improve the site’s usability.</li>
        <li><strong>Cookies:</strong> Small session cookies may be stored to enhance functionality and remember user preferences.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. How We Use Your Data</h2>
      <p className="mb-4">
        Your input data is used exclusively for providing the service you requested — 
        such as converting, cleaning, or formatting. We do not sell, share, or reuse your data for any other purpose.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Data Retention & Security</h2>
      <p className="mb-4">
        We use encryption (HTTPS/TLS) to protect transmitted information. Any temporary
        data processed through our tools is deleted automatically when your session ends.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Third-Party Services</h2>
      <p className="mb-4">
        Some third-party services may be integrated (e.g., analytics, hosting, or image
        storage providers like Cloudinary). These providers follow their own privacy
        standards, which comply with data-protection laws such as GDPR and CCPA.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. User Rights</h2>
      <p className="mb-4">
        Depending on your location, you may have rights to access, modify, or delete
        any personal data we hold (though we rarely retain any). Contact us to request
        such access at <span className="text-indigo-500">support@formatpilot.com</span>.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Policy Updates</h2>
      <p className="mb-4">
        We may update this policy periodically to reflect improvements or legal
        requirements. Changes will be posted on this page with a new effective date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">7. Contact Us</h2>
      <p>
        For any privacy-related questions, please contact our data protection team at{" "}
        <span className="text-indigo-500">support@formatpilot.com</span>.
      </p>
    </main>
  );
}
