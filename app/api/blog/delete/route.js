import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug)
      return NextResponse.json({ success: false, message: "Missing slug" }, { status: 400 });

    const publicId = `format-pilot/posts/${slug}`;
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });

    if (result.result !== "ok") {
      console.error("Delete failed:", result);
      return NextResponse.json({ success: false, message: "Failed to delete on Cloudinary" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
