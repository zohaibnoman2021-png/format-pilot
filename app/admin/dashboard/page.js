"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// ✅ Lazy-load React Quill only on the client
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredAlt, setFeaturedAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // ✅ Handle image upload
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
        setFeaturedImage(data.url);
        showToast("✅ Image uploaded successfully!");
      } else {
        showToast("❌ Upload failed: " + (data?.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      showToast("❌ Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle blog submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishing(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("author", author);
      formData.append("excerpt", excerpt);
      formData.append("tags", tags);
      formData.append("category", category);
      formData.append("content", content); // HTML content from Quill

      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
        formData.append("featuredAlt", featuredAlt);
      }

      const res = await fetch("/api/blog/new", {
        method: "POST",
        body: formData,
      });

      let result = {};
      try {
        result = await res.json();
      } catch {}

      if (res.ok && result?.success) {
        showToast("✅ Blog created successfully!");

        // Reset all fields
        setTitle("");
        setSlug("");
        setAuthor("");
        setExcerpt("");
        setTags("");
        setCategory("");
        setContent("");
        setFeaturedImage(null);
        setFeaturedAlt("");

        setTimeout(() => (window.location.href = "/admin/posts"), 1500);
      } else {
        showToast("❌ Failed to publish: " + (result?.message || result?.error || `HTTP ${res.status}`));
      }
    } catch (err) {
      console.error(err);
      showToast("❌ Something went wrong while publishing: " + err.message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* 🏷️ Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          📝 Create New Blog Post
        </h1>
        <a
          href="/admin/posts"
          className="px-5 py-2.5 rounded-lg font-medium shadow bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          View All Blogs
        </a>
      </div>

      {/* 🧩 Blog Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Slug (e.g. my-first-post)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Short excerpt..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <input
          type="text"
          placeholder="Category (e.g. Data Tools)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* 🖼️ Featured Image */}
        <div>
          <label className="block font-medium mb-2">Featured Image</label>
          <label className="inline-flex items-center px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer">
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={uploading}
            />
          </label>

          {featuredImage && (
            <img
              src={featuredImage}
              alt={featuredAlt || "Preview"}
              className="mt-4 w-48 h-32 object-cover rounded border"
            />
          )}
        </div>

        <input
          type="text"
          placeholder="Image description (for accessibility)"
          value={featuredAlt}
          onChange={(e) => setFeaturedAlt(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* 🧠 React Quill Editor */}
        <div className="mt-6">
          <label className="block font-medium mb-2">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="bg-white border rounded"
            placeholder="Write or paste your HTML blog content here..."
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image", "code-block"],
                ["clean"],
              ],
            }}
          />
        </div>

        <button
          type="submit"
          disabled={publishing}
          className={`px-6 py-3 rounded text-white transition ${
            publishing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {publishing ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}

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
