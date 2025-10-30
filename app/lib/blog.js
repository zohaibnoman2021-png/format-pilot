import { v2 as cloudinary } from "cloudinary";
import matter from "gray-matter";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Fetch all posts from Cloudinary
export async function getAllPostsMeta() {
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
          slug: data.slug || file.public_id.split("/").pop(),
          title: data.title || "Untitled",
          date: data.date || file.created_at,
          excerpt: data.excerpt || "",
          author: data.author || "Admin",
          featuredImage: data.featuredImage || "",
          featuredAlt: data.featuredAlt || "",
        };
      })
    );

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error("❌ Error fetching posts from Cloudinary:", err);
    return [];
  }
}

// ✅ Fetch a single post by slug
export async function getPostBySlug(slug) {
  try {
    const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/format-pilot/posts/${slug}.md`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const text = await res.text();
    const { data, content } = matter(text);

    return {
      slug: data.slug || slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      author: data.author || "Admin",
      featuredImage: data.featuredImage || "",
      featuredAlt: data.featuredAlt || "",
      content,
    };
  } catch (err) {
    console.error("❌ Error fetching single post:", err);
    return null;
  }
}
