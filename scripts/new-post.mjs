import fs from "fs";
import path from "path";
import slugify from "slugify";

const [, , ...args] = process.argv;
const title = args.join(" ") || "New Post";
const slug = slugify(title, { lower: true, strict: true });
const date = new Date().toISOString().slice(0, 10);

const frontmatter = `---
title: "${title}"
slug: "${slug}"
excerpt: "Write a short excerpt here..."
date: "${date}"
author: "Format Pilot Team"
tags: []
---

# ${title}

Write your content here in **Markdown**.
`;

const dir = path.join(process.cwd(), "content", "blog");
fs.mkdirSync(dir, { recursive: true });
const filePath = path.join(dir, `${slug}.md`);
if (fs.existsSync(filePath)) {
  console.error("⚠️ A post with this slug already exists:", slug);
  process.exit(1);
}
fs.writeFileSync(filePath, frontmatter, "utf8");
console.log("✅ Created:", filePath);
