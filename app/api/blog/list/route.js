import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  try {
    const blogDir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(blogDir)) return Response.json({ posts: [] });

    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
    const posts = files.map((file) => {
      const content = fs.readFileSync(path.join(blogDir, file), "utf8");
      const { data } = matter(content);
      return {
        title: data.title || "Untitled",
        slug: data.slug || file.replace(".md", ""),
        date: data.date || new Date().toISOString(),
      };
    });

    return Response.json({ posts });
  } catch (error) {
    console.error("Error listing posts:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
