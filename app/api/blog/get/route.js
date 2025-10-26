import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return Response.json({ error: "Slug required" }, { status: 400 });

  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  if (!fs.existsSync(filePath))
    return Response.json({ error: "Post not found" }, { status: 404 });

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return Response.json({
    post: {
      ...data,
      content,
    },
  });
}
