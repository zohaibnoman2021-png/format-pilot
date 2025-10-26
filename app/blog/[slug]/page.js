import { headers } from "next/headers";
import BlogSidebar from "../../components/BlogSidebar";

// ✅ Build full base URL that works in dev & production (now async)
async function getBaseUrl() {
  const h = await headers(); // must be awaited in Next.js 15+
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

// ✅ Fetch post data by slug from your API
async function getPostData(slug) {
  const baseUrl = await getBaseUrl(); // now await properly
  const res = await fetch(`${baseUrl}/api/blog`, {
    next: { revalidate: 60 }, // revalidate every 60 seconds
  });

  if (!res.ok) throw new Error("Failed to fetch posts");

  const posts = await res.json();
  return posts.find((p) => p.slug === slug);
}

export const revalidate = 60; // ISR - refresh every 60s

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

        <div
          dangerouslySetInnerHTML={{
            __html: post.content || "<p>Coming soon...</p>",
          }}
        />
      </article>

      {/* 🧭 Sidebar */}
      <BlogSidebar currentSlug={post.slug} currentTags={post.tags || []} />
    </div>
  );
}
