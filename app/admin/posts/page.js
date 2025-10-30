"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all posts from /api/blog/list
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog/list");
        const data = await res.json();
        if (res.ok) setPosts(data.posts);
        else alert("❌ Failed to load posts");
      } catch (err) {
        console.error("Error loading posts:", err);
        alert("Error fetching posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading posts...</p>;

  if (!posts.length)
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-600">No blog posts found.</h2>
        <Link
          href="/admin/dashboard"
          className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create New Post
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold flex items-center">
    <span className="mr-2">📰</span> All Blog Posts
  </h1>

  {/* ✅ New Blog Button */}
  <a
  href="/admin/dashboard"
  className="px-5 py-2.5 rounded-lg font-medium shadow 
             bg-gradient-to-r from-indigo-600 to-purple-600 
             !text-white hover:from-indigo-700 hover:to-purple-700 
             focus:outline-none focus:ring-2 focus:ring-indigo-500 
             transition"
  style={{ color: "#fff" }}
>
  + New Blog
</a>
</div>


      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Slug</th>
            <th className="p-3 border-b">Date</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(
  new Map(posts.map((p) => [p.slug, p])).values() // ✅ Deduplicate by slug
).map((post, index) => (
  <tr key={`${post.slug}-${index}`} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{post.title}</td>
              <td className="p-3 text-gray-600">{post.slug}</td>
              <td className="p-3 text-gray-500">
                {new Date(post.date).toLocaleDateString()}
              </td>
              <td className="p-3 flex gap-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-indigo-600 hover:underline"
                >
                  View
                </Link>
                <Link
                  href={`/admin/edit/${post.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // ✅ Delete post
  // ✅ Delete post
async function handleDelete(slug) {
  if (!confirm("Are you sure you want to delete this post?")) return;

  try {
    const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
    const data = await res.json();

    if (res.ok && data.success) {
      alert("✅ Post deleted successfully!");
      // Update state instantly so deleted post disappears
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } else {
      alert("❌ Failed to delete post: " + (data.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Error deleting post: " + err.message);
  }
}

    }
  

