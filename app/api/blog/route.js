import { NextResponse } from "next/server";
import { getAllPostsMeta } from "../../../lib/blog";

export async function GET() {
  try {
    const posts = getAllPostsMeta();

    // ✅ Cloudinary fallback for demo posts
    if (!posts || posts.length === 0) {
      const fallback = [
        {
          slug: "json-formatting-tips",
          title: "Mastering JSON Formatting in 2025",
          date: "2025-10-22",
          tags: ["json", "data", "formatting"],
          featuredImage: "https://res.cloudinary.com/demo/image/upload/v1729953101/json-formatting.jpg",
          featuredAlt: "Colorful JSON code example",
        },
        {
          slug: "csv-cleaning-guide",
          title: "10 CSV Cleaning Tricks You Didn’t Know",
          date: "2025-10-15",
          tags: ["csv", "data", "tools"],
          featuredImage: "https://res.cloudinary.com/demo/image/upload/v1729953122/csv-tips.jpg",
          featuredAlt: "Spreadsheet cleaning illustration",
        },
        {
          slug: "yaml-vs-json",
          title: "YAML vs JSON: Which One Wins?",
          date: "2025-10-10",
          tags: ["yaml", "json", "comparison"],
          featuredImage: "https://res.cloudinary.com/demo/image/upload/v1729953150/yaml-vs-json.jpg",
          featuredAlt: "Comparison between YAML and JSON formats",
        },
      ];
      return NextResponse.json(fallback);
    }

    return NextResponse.json(posts);
  } catch (err) {
    console.error("❌ Error loading blog posts:", err);
    return NextResponse.json({ error: "Failed to load blog posts" }, { status: 500 });
  }
}
