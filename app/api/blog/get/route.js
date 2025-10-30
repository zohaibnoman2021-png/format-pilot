import { v2 as cloudinary } from "cloudinary";
import matter from "gray-matter";
import { NextResponse } from "next/server"; // ✅ Add this!

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug required" },
        { status: 400 }
      );
    }

    // ✅ Build the raw file URL for this post on Cloudinary
    const fileUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/format-pilot/posts/${slug}.md`;

    // ✅ Try fetching the Markdown file
    const res = await fetch(fileUrl, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const text = await res.text();
    const { data, content } = matter(text);

    return NextResponse.json({
      post: {
        ...data,
        content,
        slug,
      },
    });
  } catch (error) {
    console.error("❌ Error reading post from Cloudinary:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
