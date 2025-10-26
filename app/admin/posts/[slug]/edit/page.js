import { getPostBySlug } from "../../../../lib/blog";

function EditForm({ post }) {
  "use client";
  const [title, setTitle] = React.useState(post.title || "");
  const [author, setAuthor] = React.useState(post.author || "");
  const [excerpt, setExcerpt] = React.useState(post.excerpt || "");
  const [category, setCategory] = React.useState(post.category || "");
  const [tags, setTags] = React.useState((post.tags || []).join(", "));
  const [content, setContent] = React.useState(post.content || "");
  const [featuredImage, setFeaturedImage] = React.useState(post.featuredImage || "");
  const [featuredAlt, setFeaturedAlt] = React.useState(post.featuredAlt || "");
  const [uploading, setUploading] = React.useState(false);

  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    setUploading(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setFeaturedImage(data.url);
        alert("✅ Image uploaded!");
      } else {
        alert("❌ Upload failed");
      }
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("slug", post.slug);
    fd.append("title", title);
    fd.append("author", author);
    fd.append("excerpt", excerpt);
    fd.append("category", category);
    fd.append("tags", tags);
    fd.append("content", content);
    fd.append("featuredImage", featuredImage || "");
    fd.append("featuredAlt", featuredAlt || "");

    const res = await fetch("/api/blog/update", { method: "POST", body: fd });
    const data = await res.json();
    if (data.success) {
      alert("✅ Updated!");
      location.href = "/admin/posts";
    } else {
      alert("❌ " + (data.error || "Failed"));
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input className="w-full border p-2 rounded" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <input className="w-full border p-2 rounded" value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Author" />
      <textarea className="w-full border p-2 rounded" rows={3} value={excerpt} onChange={e=>setExcerpt(e.target.value)} placeholder="Excerpt" />
      <input className="w-full border p-2 rounded" value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" />
      <input className="w-full border p-2 rounded" value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags (comma separated)" />

      <div>
        <label className="block font-medium mb-2">Featured Image</label>
        {featuredImage && (
          <img src={featuredImage} alt={featuredAlt || title} className="w-48 h-32 object-cover rounded border mb-2" />
        )}
        <label className="inline-flex items-center px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer">
          {uploading ? "Uploading..." : "Replace Image"}
          <input type="file" accept="image/*" className="hidden" onChange={(e)=>e.target.files?.[0] && uploadImage(e.target.files[0])} disabled={uploading} />
        </label>
      </div>

      <input className="w-full border p-2 rounded" value={featuredAlt} onChange={e=>setFeaturedAlt(e.target.value)} placeholder="Image alt text" />

      <textarea className="w-full border p-2 rounded" rows={10} value={content} onChange={e=>setContent(e.target.value)} placeholder="Content (Markdown)" />

      <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700">Save Changes</button>
    </form>
  );
}

export default function EditPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return <div className="max-w-3xl mx-auto px-6 py-16">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit: {post.title}</h1>
      {/* @ts-expect-error Server/Client boundary */}
      <EditForm post={post} />
    </div>
  );
}
