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
    const results = await cloudinary.search
      .expression("resource_type:raw AND folder=format-pilot/posts")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const posts = await Promise.all(
      results.resources.map(async (file) => {
        const res = await fetch(file.secure_url, { cache: "no-store" });
        const text = await res.text();
        const { data } = matter(text);

        return {
          title: data.title || "Untitled",
          slug: data.slug || file.public_id.split("/").pop(),
          date: data.date || file.created_at,
          excerpt: data.excerpt || "",
          author: data.author || "Admin",
          featuredImage: data.featuredImage || "",
          featuredAlt: data.featuredAlt || "",
          url: file.secure_url,
        };
      })
    );

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
