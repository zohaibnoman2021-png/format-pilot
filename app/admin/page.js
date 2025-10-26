"use client";

import { useState } from "react";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.url) {
      setFeaturedImage(data.url);
      alert("✅ Image uploaded successfully!");
    } else {
      alert("❌ Upload failed: " + data.error);
    }
  };

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

    // ✅ FIXED: Send URL instead of File Blob
    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    const res = await fetch("/api/blog/new", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Blog post published successfully!");
      console.log(result.post);
    } else {
      alert("❌ Failed to publish blog.");
      console.error(result.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">📝 Create New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* Slug */}
        <input
          type="text"
          placeholder="Slug (e.g. my-first-post)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* Author */}
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Excerpt */}
        <textarea
          placeholder="Short excerpt..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border p-2 rounded"
          rows={3}
        ></textarea>

        {/* Category */}
        <input
          type="text"
          placeholder="Category (e.g. Data Tools)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* Featured Image */}
        <div>
          <label className="block font-medium mb-2">Featured Image</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              📤 Upload Featured Image
            </label>
            {featuredImage && (
              <img
                src={featuredImage}
                alt="Preview"
                className="w-16 h-16 object-cover rounded border border-gray-300"
              />
            )}
          </div>
        </div>

        {/* Content */}
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
          rows={8}
        ></textarea>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
