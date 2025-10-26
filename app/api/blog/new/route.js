import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const slug = formData.get("slug");
    const author = formData.get("author") || "Admin";
    const excerpt = formData.get("excerpt") || "";
    const category = formData.get("category") || "";
    const tags = formData.get("tags") || "";
    const content = formData.get("content") || "";
    const featuredImage = formData.get("featuredImage");
    const featuredAlt = formData.get("featuredAlt") || ""; // 🆕

    const date = new Date().toISOString().split("T")[0];
    const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);

    const imageUrl = typeof featuredImage === "string" ? featuredImage : "";

    const frontmatter = `---
title: "${title}"
slug: "${slug}"
date: "${date}"
author: "${author}"
excerpt: "${excerpt}"
category: "${category}"
tags: ${JSON.stringify(tagsArray)}
featuredImage: "${imageUrl}"
featuredAlt: "${featuredAlt}"
---

${content}
`;

    const dir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `${slug}.md`);
    fs.writeFileSync(filePath, frontmatter, "utf8");

    return Response.json({ success: true, post: { slug, title, imageUrl, filePath } });
  } catch (error) {
    console.error("Error creating post:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
