import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
  Heart,
} from "lucide-react";
import {
  addBlog,
  deleteBlog,
  getStoredBlogs,
  onBlogsUpdated,
  updateBlog,
} from "../utils/blogStorage";

const initialForm = {
  title: "",
  image: "",
  description: "",
  likes: 0,
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read selected image."));
    reader.readAsDataURL(file);
  });

const ManageBlog = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    setBlogs(getStoredBlogs());

    const unsubscribe = onBlogsUpdated((updatedBlogs) => {
      setBlogs(updatedBlogs);
    });

    return unsubscribe;
  }, []);

  const isEditing = editingId !== null;
  const totalBlogs = useMemo(() => blogs.length, [blogs]);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "likes" ? value : value,
    }));
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose a valid image file.");
      return;
    }

    try {
      setIsUploadingImage(true);
      setError("");
      const dataUrl = await readFileAsDataUrl(file);

      setForm((prev) => ({
        ...prev,
        image: dataUrl,
      }));
    } catch (uploadError) {
      setError(uploadError.message || "Failed to process selected image.");
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Blog title is required.";
    if (!form.image.trim()) return "Blog image is required.";
    if (!form.description.trim()) return "Description is required.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();
    setError(validationError);

    if (validationError) return;

    const payload = {
      title: form.title.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      likes: Number(form.likes) || 0,
    };

    if (isEditing) {
      updateBlog(editingId, payload);
    } else {
      addBlog(payload);
    }

    resetForm();
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setError("");

    setForm({
      title: blog.title || "",
      image: blog.image || "",
      description: blog.description || "",
      likes: blog.likes ?? 0,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (blogId, blogTitle) => {
    const confirmed = window.confirm(`Delete "${blogTitle}" from blog posts?`);
    if (!confirmed) return;

    deleteBlog(blogId);

    if (editingId === blogId) {
      resetForm();
    }
  };

  return (
    <div className="min-h-screen bg-[#050b16] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top */}
        <div className="rounded-[2rem] border border-cyan-900/30 bg-gradient-to-br from-[#08111f] via-[#0b1628] to-[#10223d] p-6 shadow-xl sm:p-8">
          <button
            onClick={() => navigate("/admin")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-lime-300"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
                Admin Blogs
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                Manage Blog Posts
              </h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Add, edit, and delete blog posts here. Changes made on this page
                will reflect on the public blog pages.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-900/30 bg-[#09111d] px-5 py-4">
              <p className="text-sm text-slate-400">Total Blogs</p>
              <p className="text-3xl font-bold text-lime-300">{totalBlogs}</p>
            </div>
          </div>
        </div>

        {/* Form + Preview */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-900/25 p-3 text-lime-300">
                {isEditing ? <Pencil size={22} /> : <Plus size={22} />}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {isEditing ? "Edit Blog Post" : "Post New Blog"}
                </h2>
                <p className="text-slate-400">
                  Keep it simple: image, title, and description.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Blog Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Upload from your device (phone/laptop files).
                  {isUploadingImage ? " Processing image..." : ""}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="7"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write the full blog description"
                  className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Initial Likes
                </label>
                <input
                  type="number"
                  name="likes"
                  min="0"
                  value={form.likes}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200"
                >
                  {isEditing ? <Save size={18} /> : <Plus size={18} />}
                  {isEditing ? "Update Blog" : "Add Blog"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
                  >
                    <X size={18} />
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Preview */}
          <div className="rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-xl sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-900/25 p-3 text-lime-300">
                <FileText size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Live Preview</h2>
                <p className="text-slate-400">Quick look at the blog card feel</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-cyan-900/30 bg-[#09111d]">
              <div className="h-72 overflow-hidden bg-[#050b16]">
                {form.image ? (
                  <img
                    src={form.image}
                    alt={form.title || "Blog preview"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-500">
                    Image preview
                  </div>
                )}
              </div>

              <div className="space-y-4 p-5">
                <h3 className="text-xl font-semibold text-white">
                  {form.title || "Blog title"}
                </h3>

                <p className="text-sm leading-7 text-slate-300">
                  {form.description
                    ? `${form.description.slice(0, 50)}${
                        form.description.length > 50 ? "..." : ""
                      }`
                    : "Blog preview description"}
                </p>

                <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                  <Heart size={16} className="text-lime-300" />
                  <span>{Number(form.likes) || 0} likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-xl sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Current Blog Posts</h2>
            <p className="mt-1 text-slate-400">
              Manage existing blog posts from here.
            </p>
          </div>

          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="overflow-hidden rounded-[1.5rem] border border-cyan-900/30 bg-[#09111d]"
                >
                  <div className="flex flex-col gap-4 p-4 sm:flex-row">
                    <div className="h-32 w-full shrink-0 overflow-hidden rounded-2xl bg-[#050b16] sm:w-32">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {blog.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {blog.description.slice(0, 120)}
                        {blog.description.length > 120 ? "..." : ""}
                      </p>

                      <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
                        <Heart size={16} className="text-lime-300" />
                        <span>{blog.likes || 0} likes</span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="inline-flex items-center gap-2 rounded-full border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-cyan-900/30 bg-[#09111d] px-6 py-12 text-center">
              <h3 className="text-xl font-bold text-white">No blog posts yet</h3>
              <p className="mt-2 text-slate-400">
                Add your first blog post using the form above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBlog;