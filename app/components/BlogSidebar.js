import Link from "next/link";
import { headers } from "next/headers";

// ✅ Fixed async version — only one getBaseUrl
async function getBaseUrl() {
  const h = await headers(); // must be awaited in Next.js 15+
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

// ✅ Async fetch for posts
async function getPosts() {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/blog`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}

export default async function BlogSidebar({ currentSlug, currentTags = [] }) {
  const posts = await getPosts();

  // Latest = newest first
  const latest = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Related = by tag overlap, excluding current
  const related = posts
    .filter(
      (p) =>
        p.slug !== currentSlug &&
        p.tags?.some((t) => currentTags.includes(t))
    )
    .slice(0, 5);

  return (
    <aside className="w-full lg:w-80 space-y-8 mt-10 lg:mt-0 lg:sticky lg:top-20 self-start">
      {/* Latest Section */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
          🕓 Latest Articles
        </h2>
        <ul className="space-y-3">
          {latest.map((post) => (
            <li key={post.slug} className="flex items-start gap-3">
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-14 h-14 object-cover rounded-md border border-gray-200"
                />
              )}
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium leading-snug"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Related Section */}
      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-200 pb-2">
            🔗 Related Articles
          </h2>
          <ul className="space-y-3">
            {related.map((post) => (
              <li key={post.slug} className="flex items-start gap-3">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-14 h-14 object-cover rounded-md border border-gray-200"
                  />
                )}
                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium leading-snug"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}
