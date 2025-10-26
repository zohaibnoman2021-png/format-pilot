import fs from "fs";
import path from "path";

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) return Response.json({ error: "Slug required" }, { status: 400 });

    const data = await req.json();
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);

    if (!fs.existsSync(filePath))
      return Response.json({ error: "Post not found" }, { status: 404 });

    const tagsArray = (data.tags || []).map((t) => t.trim());

    const frontmatter = `---
title: "${data.title}"
slug: "${data.slug}"
date: "${new Date().toISOString().split("T")[0]}"
author: "${data.author || "Admin"}"
excerpt: "${data.excerpt || ""}"
category: "${data.category || ""}"
tags: ${JSON.stringify(tagsArray)}
featuredImage: "${data.featuredImage || ""}"
---

${data.content}
`;

    fs.writeFileSync(filePath, frontmatter, "utf8");

    return Response.json({ success: true, message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
