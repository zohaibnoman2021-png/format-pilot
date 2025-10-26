"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
const mdParser = new MarkdownIt();

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("author", author);
    formData.append("excerpt", excerpt);
    formData.append("tags", tags);
    formData.append("category", category);
    formData.append("content", content);

    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
      formData.append("featuredAlt", featuredAlt);
    }

    try {
      const res = await fetch("/api/blog/new", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        showToast("✅ Blog created successfully!");
        setTitle("");
        setSlug("");
        setAuthor("");
        setExcerpt("");
        setTags("");
        setCategory("");
        setContent("");
        setFeaturedImage(null);
        setFeaturedAlt("");

        setTimeout(() => {
          window.location.href = "/admin/posts";
        }, 1500);
      } else {
        showToast("❌ Failed to publish: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      showToast("❌ Something went wrong while publishing.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* ✅ Header fixed (no duplicate) */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span>📝</span> Create New Blog Post
        </h1>

        {/* ✅ Force white text to override global `a { color: ... }` */}
        <a
          href="/admin/posts"
          className="px-5 py-2.5 rounded-lg font-medium shadow
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     !text-white hover:from-indigo-700 hover:to-purple-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     transition"
          style={{ color: "#fff" }}
        >
          View All Blogs
        </a>
      </div>

      {/* ✅ Form section */}
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

        {/* ✅ Featured Image Upload */}
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

        {/* ✅ Markdown Editor */}
        <div className="mt-6">
          <label className="block font-medium mb-2">Content</label>
          <MdEditor
            value={content}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }) => setContent(text)}
            onImageUpload={async (file) => {
              const formData = new FormData();
              formData.append("file", file);
              const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });
              const data = await res.json();
              return data.url;
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 !text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
          style={{ color: "#fff" }}
        >
          Publish Blog
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
