import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const { title, slug, content, author } = data;

    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const blogDir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

    const date = new Date().toISOString().split("T")[0];
    const mdContent = `---
title: "${title}"
slug: "${slug}"
date: "${date}"
author: "${author || "Admin"}"
excerpt: "${content.substring(0, 120)}..."
---

${content}
`;

    fs.writeFileSync(path.join(blogDir, `${slug}.md`), mdContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog create error:", error);
    return NextResponse.json({ success: false, message: "Error creating blog" }, { status: 500 });
  }
}
