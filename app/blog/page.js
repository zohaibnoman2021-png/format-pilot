import Link from "next/link";

export const revalidate = 0; // Always fetch fresh posts

export const metadata = {
  title: "Blog | Format Pilot",
  description:
    "Tutorials, updates, and guides for data formatting and text utilities.",
};

async function getPosts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blog/list`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    if (!data.success) return [];
    return data.posts;
  } catch (err) {
    console.error("Error loading posts:", err);
    return [];
  }
}

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">📰 Format Pilot Blog</h1>
      <p className="text-gray-600 mb-8">
        News, tutorials, and best practices for formatting data and text.
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-500">No blog posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow transition"
            >
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.featuredAlt || post.title}
                  className="w-full h-56 object-cover rounded-lg mb-4 border border-gray-100"
                  loading="lazy"
                />
              )}

              <h2 className="text-xl font-semibold text-indigo-600">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.date).toLocaleDateString()} •{" "}
                {post.author || "Admin"}
              </p>
              <p className="text-gray-600 mt-3">
                {post.excerpt || "No summary available."}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
