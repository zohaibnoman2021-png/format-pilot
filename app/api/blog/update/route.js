import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug)
      return Response.json({ error: "Slug required" }, { status: 400 });

    const data = await req.json();

    // ✅ Safely handle tags whether string, array, or empty
    let tagsArray = [];
    if (Array.isArray(data.tags)) {
      tagsArray = data.tags;
    } else if (typeof data.tags === "string" && data.tags.trim() !== "") {
      tagsArray = data.tags.split(",").map((t) => t.trim());
    }

    const frontmatter = `--- 
title: "${data.title}"
slug: "${data.slug}"
date: "${new Date().toISOString().split("T")[0]}"
author: "${data.author || "Admin"}"
excerpt: "${data.excerpt || ""}"
category: "${data.category || ""}"
tags: ${JSON.stringify(tagsArray)}
featuredImage: "${data.featuredImage || ""}"
featuredAlt: "${data.featuredAlt || ""}"
---

${data.content}
`;

    // ✅ Upload (overwrite) the Markdown file in Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      `data:text/markdown;base64,${Buffer.from(frontmatter).toString("base64")}`,
      {
        folder: "format-pilot/posts",
        public_id: slug,
        resource_type: "raw",
        overwrite: true, // replace existing file
        invalidate: true,
        use_filename: true,
        unique_filename: false,
      }
    );

    return Response.json({
      success: true,
      message: "✅ Post updated successfully",
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("❌ Error updating post:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
