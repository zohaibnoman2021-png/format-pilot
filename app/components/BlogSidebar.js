"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogSidebar({ currentSlug, currentTags = [] }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/blog/list");
        const data = await res.json();
        if (data.success) {
          // Filter out the current post
          const others = data.posts.filter((p) => p.slug !== currentSlug);
          setPosts(others.slice(0, 5)); // show 5 recent
        }
      } catch (err) {
        console.error("Sidebar fetch error:", err);
      }
    })();
  }, [currentSlug]);

  if (posts.length === 0)
    return (
      <aside className="lg:col-span-1">
        <h3 className="font-semibold text-gray-700 mb-3">No other posts yet</h3>
      </aside>
    );

  return (
    <aside className="lg:col-span-1">
      <h3 className="font-semibold text-gray-700 mb-3">📚 Recent Posts</h3>
      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="block text-indigo-600 hover:underline"
            >
              {p.title}
            </Link>
            <p className="text-xs text-gray-500">
              {new Date(p.date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
