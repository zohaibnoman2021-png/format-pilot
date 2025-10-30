import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(_req, { params }) {
  try {
    const { slug } = params;
    if (!slug)
      return NextResponse.json(
        { success: false, message: "Missing slug" },
        { status: 400 }
      );

    const result = await cloudinary.uploader.destroy(
      `format-pilot/posts/${slug}`,
      {
        resource_type: "raw",
        invalidate: true,
      }
    );

    if (result.result === "ok" || result.result === "not found") {
      return NextResponse.json({
        success: true,
        message: "Blog deleted successfully",
      });
    } else {
      throw new Error(result.result || "Unknown error");
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
