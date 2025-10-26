"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPostPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    author: "",
    excerpt: "",
    category: "",
    tags: "",
    content: "",
    featuredImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // ✅ Load existing post data
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/get?slug=${slug}`);
        const data = await res.json();
        if (res.ok && data.post) {
          setForm({
            title: data.post.title,
            slug: data.post.slug,
            author: data.post.author,
            excerpt: data.post.excerpt,
            category: data.post.category,
            tags: (data.post.tags || []).join(", "),
            content: data.post.content,
            featuredImage: data.post.featuredImage || "",
          });
        } else {
          alert("⚠️ Post not found");
          router.push("/admin/posts");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        alert("Error loading post");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug, router]);

  // ✅ Handle image re-upload
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, featuredImage: data.url }));
        alert("✅ New image uploaded!");
      } else {
        alert("❌ Image upload failed");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle form submission
  // ✅ Handle form submission with toast + redirect
const handleSubmit = async (e) => {
  e.preventDefault();

  const updatedPost = { ...form, tags: form.tags.split(",").map((t) => t.trim()) };

  const res = await fetch(`/api/blog/update?slug=${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  });

  const data = await res.json();

  if (res.ok) {
    showToast("✅ Post updated successfully!");
    setTimeout(() => router.push("/admin/posts"), 1500);
  } else {
    showToast("❌ Failed to update post: " + (data.error || "Unknown error"));
  }
};


  if (loading) return <p className="text-center py-10">Loading post...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Post Title"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="Slug"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
          className="w-full border p-2 rounded"
        />

        <textarea
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          placeholder="Excerpt"
          className="w-full border p-2 rounded"
          rows={3}
        ></textarea>

        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded"
        />

        <div>
          <label className="block font-medium mb-2">Featured Image</label>
          <label className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700">
            {uploading ? "Uploading..." : "Upload New Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
          {form.featuredImage && (
            <img
              src={form.featuredImage}
              alt="Preview"
              className="mt-4 w-48 h-32 object-cover rounded border"
            />
          )}
        </div>

        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Write content..."
          className="w-full border p-2 rounded"
          rows={8}
        ></textarea>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
// ✅ Toast notification helper
function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#4f46e5";
  toast.style.color = "white";
  toast.style.padding = "10px 16px";
  toast.style.borderRadius = "6px";
  toast.style.fontSize = "14px";
  toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  toast.style.zIndex = "9999";
  toast.style.transition = "opacity 0.3s ease";
  toast.style.opacity = "1";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}


}
