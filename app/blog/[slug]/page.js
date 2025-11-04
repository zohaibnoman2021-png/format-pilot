import { v2 as cloudinary } from "cloudinary";
import matter from "gray-matter";
import BlogSidebar from "../../components/BlogSidebar";

// ✅ Decode escaped HTML so <h1> and <p> render correctly
function decodeHTMLEntities(text) {
  if (!text) return text;
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

export const revalidate = 0; // Always serve fresh Cloudinary content

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Fetch and parse a single post from Cloudinary
async function getPostData(slug) {
  const fileUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/format-pilot/posts/${slug}.md`;

  const res = await fetch(fileUrl, { cache: "no-store" });
  if (!res.ok) return null;

  const text = await res.text();
  const { data, content } = matter(text);

  return {
    ...data,
    content,
    slug,
  };
}

// ✅ Main Blog Post Page
export default async function BlogPostPage({ params }) {
  // Fix: Await params in Next.js 15+
  const { slug } = await params;
  const post = await getPostData(slug);

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

        {/* ✅ Decode HTML entities and render as true HTML */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: decodeHTMLEntities(post.content),
          }}
        />
      </article>

      {/* 🧭 Sidebar */}
      <BlogSidebar currentSlug={post.slug} currentTags={post.tags || []} />
    </div>
  );
}
