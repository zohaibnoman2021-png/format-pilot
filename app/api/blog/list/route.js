import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import matter from "gray-matter";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // ✅ Fetch all Markdown files in your Cloudinary folder
    const results = await cloudinary.search
      .expression("resource_type:raw AND folder=format-pilot/posts")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    // ✅ Parse front matter for each Markdown file
    const posts = await Promise.all(
      results.resources.map(async (file) => {
        const res = await fetch(file.secure_url);
        const text = await res.text();
        const { data } = matter(text);

        return {
          title: data.title || "Untitled",
          slug: data.slug || file.public_id.split("/").pop(),
          date: data.date || file.created_at,
          excerpt: data.excerpt || "",
          featuredImage: data.featuredImage || "",
          url: file.secure_url,
        };
      })
    );

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("❌ Error fetching posts from Cloudinary:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
