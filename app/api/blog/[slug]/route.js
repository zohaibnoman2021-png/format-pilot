import { NextResponse } from "next/server";
import { getPostBySlug } from "../../../lib/blog.js";

export async function GET(_, { params }) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}
