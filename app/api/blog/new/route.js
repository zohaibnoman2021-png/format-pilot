import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const form = await req.formData();

    const title = form.get("title");
    const slug = form.get("slug");
    const author = form.get("author") || "Admin";
    const excerpt = form.get("excerpt");
    const tags = form.get("tags");
    const category = form.get("category");
    const content = form.get("content");
    const featuredImage = form.get("featuredImage");
    const featuredAlt = form.get("featuredAlt");

    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const date = new Date().toISOString().split("T")[0];
    const excerptText =
      excerpt || content.substring(0, 150).replace(/\n/g, " ") + "...";

    const mdContent = `---
title: "${title}"
slug: "${slug}"
date: "${date}"
author: "${author}"
excerpt: "${excerptText}"
category: "${category || ""}"
tags: ${JSON.stringify(tags?.split(",").map((t) => t.trim()) || [])}
featuredImage: "${featuredImage || ""}"
featuredAlt: "${featuredAlt || ""}"
---

${content}
`;

    // ✅ Upload as a Markdown (text) file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      `data:text/markdown;charset=utf-8;base64,${Buffer.from(mdContent).toString("base64")}`,
      {
        folder: "format-pilot/posts",
        public_id: slug,
        resource_type: "raw",
        format: "md", // ensure .md extension
        type: "upload",
        overwrite: true,
        invalidate: true,
        use_filename: true,
        unique_filename: false,
      }
    );

    console.log("✅ Uploaded post to Cloudinary:", uploadResult.secure_url);

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      message: "✅ Blog post published successfully!",
    });
  } catch (error) {
    console.error("❌ Error publishing post:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
