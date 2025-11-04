import Link from "next/link";
import { getAllPostsMeta } from "../../lib/blog";

export const revalidate = 60;

export const metadata = {
  title: "Blog | Format Pilot",
  description:
    "Tutorials, updates, and guides for data formatting and text utilities.",
};

// ✅ HTML decoding helper — handles single & double-escaped HTML
function decodeHTML(str = "") {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export default async function BlogIndex() {
  const posts = await getAllPostsMeta();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">📰 Format Pilot Blog</h1>
      <p className="text-gray-600 mb-8">
        News, tutorials, and best practices for formatting data and text.
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-500">No blog posts yet. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow transition"
            >
              {/* 🖼️ Featured Image */}
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.featuredAlt || post.title}
                  className="w-full h-56 object-cover rounded-lg mb-4 border border-gray-100"
                  loading="lazy"
                />
              )}

              {/* 🏷️ Title */}
              <h2 className="text-xl font-semibold text-indigo-600">
                {post.title}
              </h2>

              {/* 👤 Date & Author */}
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.date).toLocaleDateString()} •{" "}
                {post.author || "Admin"}
              </p>

              {/* ✍️ Formatted HTML Excerpt */}
              <div
                className="text-gray-700 text-sm mt-3 line-clamp-3 prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(
                    post.excerpt ||
                      post.content
                        ?.substring(0, 300)
                        ?.replace(/&lt;/g, "<")
                        ?.replace(/&gt;/g, ">")
                        ?.replace(/&amp;/g, "&")
                  ),
                }}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
