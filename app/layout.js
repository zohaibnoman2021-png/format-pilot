export const metadata = {
  title: "Format Pilot | Convert, Clean & Format Data or Text Instantly",
  description:
    "Free online toolkit to format, convert, and clean JSON, CSV, XML, YAML, Markdown, or text instantly. Includes word counter, reverser, sentence rewriter, and more.",
  keywords:
    "json to csv, csv formatter, yaml converter, xml to json, text rewriter, word counter, format pilot, online formatter, data cleaner, sentence changer",
  authors: [{ name: "Format Pilot Team" }],
  openGraph: {
    title: "Format Pilot | Convert, Clean & Format Data or Text Instantly",
    description:
      "Free toolkit for developers and writers to clean, convert, and format any data or text online — fast and secure.",
    url: "https://formatpilot.com",
    siteName: "Format Pilot",
    images: [
      {
        url: "https://formatpilot.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Format Pilot Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
