import seededBlogs from "../data/blogs";

const BLOG_STORAGE_KEY = "sbl_blogs";

const emitBlogsUpdated = (blogs) => {
  window.dispatchEvent(
    new CustomEvent("blogsUpdated", {
      detail: blogs,
    })
  );
};

export const getStoredBlogs = () => {
  const existing = localStorage.getItem(BLOG_STORAGE_KEY);

  if (!existing) {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(seededBlogs));
    return seededBlogs;
  }

  try {
    return JSON.parse(existing);
  } catch (error) {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(seededBlogs));
    return seededBlogs;
  }
};

export const saveBlogs = (blogs) => {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogs));
  emitBlogsUpdated(blogs);
  return blogs;
};

export const generateBlogSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const generateBlogId = (blogs) => {
  if (!blogs.length) return 1;
  return Math.max(...blogs.map((item) => Number(item.id) || 0)) + 1;
};

export const addBlog = (blogData) => {
  const blogs = getStoredBlogs();

  const baseSlug = generateBlogSlug(blogData.title);
  let slug = baseSlug;
  let counter = 1;

  while (blogs.some((item) => item.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  const newBlog = {
    id: generateBlogId(blogs),
    slug,
    likes: Number(blogData.likes) || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...blogData,
  };

  const updatedBlogs = [newBlog, ...blogs];
  saveBlogs(updatedBlogs);
  return newBlog;
};

export const updateBlog = (blogId, updates) => {
  const blogs = getStoredBlogs();

  const updatedBlogs = blogs.map((blog) => {
    if (blog.id !== blogId) return blog;

    let nextSlug = blog.slug;

    if (updates.title && updates.title !== blog.title) {
      const baseSlug = generateBlogSlug(updates.title);
      nextSlug = baseSlug;
      let counter = 1;

      while (blogs.some((item) => item.id !== blogId && item.slug === nextSlug)) {
        nextSlug = `${baseSlug}-${counter}`;
        counter += 1;
      }
    }

    return {
      ...blog,
      ...updates,
      slug: nextSlug,
      updatedAt: new Date().toISOString(),
    };
  });

  saveBlogs(updatedBlogs);
  return updatedBlogs.find((item) => item.id === blogId);
};

export const deleteBlog = (blogId) => {
  const blogs = getStoredBlogs();
  const updatedBlogs = blogs.filter((item) => item.id !== blogId);
  saveBlogs(updatedBlogs);
  return updatedBlogs;
};

export const getBlogBySlug = (slug) => {
  const blogs = getStoredBlogs();
  return blogs.find((item) => item.slug === slug);
};

export const onBlogsUpdated = (callback) => {
  const handler = (event) => {
    callback(event.detail || getStoredBlogs());
  };

  window.addEventListener("blogsUpdated", handler);
  return () => window.removeEventListener("blogsUpdated", handler);
};