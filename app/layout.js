import "./globals.css";
import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ Footer now global

export const metadata = {
  title: "Format Pilot | Convert, Clean & Format Data or Text Instantly",
  description:
    "Free online toolkit to format, convert, and clean JSON, CSV, XML, YAML, Markdown or text instantly. Includes word counter, reverser, sentence rewriter, and more.",
  keywords:
    "json to csv, csv formatter, yaml converter, xml to json, text rewriter, word counter, format pilot, online formatter, data cleaner, sentence changer",
  authors: [{ name: "Format Pilot Team" }],
  creator: "Format Pilot",
  publisher: "Format Pilot",
  robots: "index, follow",
  openGraph: {
    title: "Format Pilot | Convert, Clean & Format Data or Text Instantly",
    description:
      "Free toolkit for developers and writers to clean, convert, and format any data or text online — fast and secure.",
    url: "https://format-pilot.vercel.app",
    siteName: "Format Pilot",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://format-pilot.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Format Pilot Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Format Pilot | Convert, Clean & Format Data or Text Instantly",
    description:
      "All-in-one data formatter and text tool for developers and writers.",
    images: ["https://format-pilot.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Mobile responsive meta tag */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta charSet="UTF-8" />
      </head>

      <body className="bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* ✅ Global SEO Schema */}
        <SEO />

        {/* ✅ Global Navbar */}
        <Navbar />

        {/* ✅ Page Content */}
        <main className="min-h-screen">{children}</main>

        {/* ✅ Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
