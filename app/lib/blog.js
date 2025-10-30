import { v2 as cloudinary } from "cloudinary";
import matter from "gray-matter";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Get metadata for all posts (from Cloudinary)
export async function getAllPostsMeta() {
  try {
    const results = await cloudinary.search
      .expression("resource_type:raw AND folder=format-pilot/posts")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const posts = await Promise.all(
      results.resources.map(async (file) => {
        const res = await fetch(file.secure_url);
        const text = await res.text();
        const { data } = matter(text);

        return {
          slug: data.slug || file.public_id.split("/").pop(),
          title: data.title || "Untitled Post",
          date: data.date || file.created_at,
          excerpt: data.excerpt || "",
          tags: data.tags || [],
          author: data.author || "Admin",
          category: data.category || "",
          featuredImage: data.featuredImage || "",
        };
      })
    );

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("❌ Error fetching posts from Cloudinary:", error);
    return [];
  }
}

// ✅ Get full post content by slug (from Cloudinary)
export async function getPostBySlug(slug) {
  try {
    const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/format-pilot/posts/${slug}.md`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const text = await res.text();
    const { data, content } = matter(text);

    return {
      slug: data.slug || slug,
      title: data.title || "Untitled Post",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      author: data.author || "Admin",
      category: data.category || "",
      featuredImage: data.featuredImage || "",
      content,
    };
  } catch (error) {
    console.error("❌ Error fetching post from Cloudinary:", error);
    return null;
  }
}
