import { v2 as cloudinary } from "cloudinary";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import BlogSidebar from "../../components/BlogSidebar";

export const revalidate = 0; // Always serve live Cloudinary content

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getPostData(slug) {
  // ✅ Build Cloudinary URL for this post
  const fileUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/format-pilot/posts/${slug}.md`;

  // ✅ Fetch the markdown file
  const res = await fetch(fileUrl, { cache: "no-store" });
  if (!res.ok) return null;

  // ✅ Parse Markdown + frontmatter
  const text = await res.text();
  const { data, content } = matter(text);

  return {
    ...data,
    content,
    slug,
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPostData(params.slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold text-red-600">
          404 - Post not found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* 📝 Main Article */}
      <article className="lg:col-span-2 prose prose-lg max-w-none">
        {post.featuredImage && post.featuredImage.startsWith("http") && (
          <img
            src={post.featuredImage}
            alt={post.featuredAlt || post.title}
            className="w-full rounded-lg mb-8 border border-gray-200 shadow-sm"
          />
        )}

        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-10">
          {new Date(post.date).toLocaleDateString()} • {post.author || "Admin"}
        </p>

        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

      {/* 🧭 Sidebar */}
      <BlogSidebar currentSlug={post.slug} currentTags={post.tags || []} />
    </div>
  );
}
