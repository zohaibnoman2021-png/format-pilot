export const metadata = {
  title: "Terms & Conditions | Format Pilot",
  description:
    "Review the terms and conditions for using Format Pilot’s data formatting and cleaning tools.",
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-20 px-6 max-w-4xl mx-auto leading-relaxed">
      <h1 className="text-4xl font-bold mb-8 text-center">📜 Terms & Conditions</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400 text-center">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-4">
        These Terms and Conditions govern your access to and use of the Format Pilot
        website and its tools. By using our services, you agree to comply with these
        terms. Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Use of Our Services</h2>
      <p className="mb-4">
        You agree to use Format Pilot only for lawful purposes. You must not upload,
        input, or distribute content that is illegal, malicious, or infringes upon the
        rights of others.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Intellectual Property Rights</h2>
      <p className="mb-4">
        All software, design, branding, and content available on Format Pilot are
        protected by intellectual property laws. You may use the site for personal or
        professional use but may not copy, modify, or redistribute the service or code
        without written permission.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. User Content</h2>
      <p className="mb-4">
        Any content or data you upload remains your property. By submitting it, you
        grant us a temporary right to process it solely for the intended service
        (e.g., formatting or conversion). We do not claim ownership of your data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Disclaimers</h2>
      <p className="mb-4">
        The tools on Format Pilot are provided “as-is” without warranties. While we
        strive for accuracy, we make no guarantees regarding correctness, reliability,
        or completeness of results.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Limitation of Liability</h2>
      <p className="mb-4">
        Format Pilot and its team will not be liable for any damages resulting from
        data loss, corruption, or misuse arising from the use of our tools.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate access if a user violates these
        Terms, abuses the platform, or engages in prohibited activity.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">7. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by applicable international and local laws. Any
        disputes will be resolved under the jurisdiction of the operator’s country
        of registration.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">8. Updates to These Terms</h2>
      <p>
        Format Pilot may update these Terms periodically. The updated version will be
        effective once published on this page.
      </p>
    </main>
  );
}
