import fs from "fs";
import path from "path";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) return Response.json({ error: "Slug is required" }, { status: 400 });

    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
    if (!fs.existsSync(filePath))
      return Response.json({ error: "File not found" }, { status: 404 });

    fs.unlinkSync(filePath);

    return Response.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
