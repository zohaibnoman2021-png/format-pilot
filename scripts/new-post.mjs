import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Parse arguments
const [, , ...args] = process.argv;
const title = args.join(" ") || "New Post";
const slug = slugify(title, { lower: true, strict: true });
const date = new Date().toISOString().slice(0, 10);

// ✅ Prepare Markdown
const frontmatter = `---
title: "${title}"
slug: "${slug}"
excerpt: "Write a short excerpt here..."
date: "${date}"
author: "Format Pilot Team"
tags: []
featuredImage: ""
featuredAlt: ""
---

# ${title}

Write your content here in **Markdown**.
`;

// ✅ Upload to Cloudinary
async function uploadPost() {
  try {
    const result = await cloudinary.uploader.upload(
      `data:text/markdown;base64,${Buffer.from(frontmatter).toString("base64")}`,
      {
        folder: "format-pilot/posts",
        public_id: slug,
        resource_type: "raw",
        overwrite: false,
      }
    );

    console.log("✅ Created post in Cloudinary:");
    console.log(`📄 ${result.secure_url}`);
  } catch (err) {
    console.error("❌ Error creating post:", err.message);
  }
}

uploadPost();
