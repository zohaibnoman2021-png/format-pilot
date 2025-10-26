import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 mt-auto border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🚀</span> Format Pilot
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Your all-in-one toolkit to convert, clean, and format any type of data —
            instantly and effortlessly.
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Format Pilot. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Tools</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/convert">Data Formatter</Link></li>
            <li><Link href="/text-tools">Text Utilities</Link></li>
            <li><Link href="/file-tools">File Upload & Export</Link></li>
            <li><Link href="/dev-tools">Developer Tools</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link href="/cookies-policy">Cookies Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
