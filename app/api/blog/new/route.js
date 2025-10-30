import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.json();
    const { title, slug, content, author, featuredImage, featuredAlt } = data;

    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const date = new Date().toISOString().split("T")[0];
    const excerpt = content.substring(0, 150).replace(/\n/g, " ") + "...";

    const mdContent = `---
title: "${title}"
slug: "${slug}"
date: "${date}"
author: "${author || "Admin"}"
excerpt: "${excerpt}"
featuredImage: "${featuredImage || ""}"
featuredAlt: "${featuredAlt || ""}"
---

${content}
`;

    // ✅ Upload Markdown to Cloudinary as a raw file
    const uploadResult = await cloudinary.uploader.upload(
      `data:text/markdown;base64,${Buffer.from(mdContent).toString("base64")}`,
      {
        folder: "format-pilot/posts",
        public_id: slug,
        resource_type: "raw",
        overwrite: true,
      }
    );

    console.log("✅ Uploaded post to Cloudinary:", uploadResult.secure_url);

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      message: "Blog post published successfully!",
    });
  } catch (error) {
    console.error("❌ Error publishing post:", error);
    return NextResponse.json({ success: false, message: "Error publishing blog" }, { status: 500 });
  }
}
