"use client";

import { useEffect } from "react";

export default function SEO() {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Format Pilot",
      url: "https://format-pilot.vercel.app",
      description:
        "Free online tool to convert, clean and format JSON, CSV, XML, YAML and text instantly.",
      sameAs: [
        "https://twitter.com/formatpilot",
        "https://github.com/zohaibnoman2021-png/format-pilot",
      ],
      potentialAction: {
        "@type": "SearchAction",
        target: "https://format-pilot.vercel.app/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }, []);

  return null;
}
