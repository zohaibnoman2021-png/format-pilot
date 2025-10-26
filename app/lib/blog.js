import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ✅ Define paths
const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content", "blog");

// ✅ Get metadata for all posts (used for blog listing and static paths)
export function getAllPostsMeta() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);

      return {
        slug: data.slug || file.replace(/\.md$/, ""),
        title: data.title || "Untitled Post",
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        author: data.author || "Admin",
        category: data.category || "",
        featuredImage: data.featuredImage || "", // ✅ Make sure image path comes through
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ✅ Get full post content by slug (used for individual blog pages)
export function getPostBySlug(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug: data.slug || slug,
    title: data.title || "Untitled Post",
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || "",
    tags: data.tags || [],
    author: data.author || "Admin",
    category: data.category || "",
    featuredImage: data.featuredImage || "", // ✅ Image link from Cloudinary
    content,
  };
}
