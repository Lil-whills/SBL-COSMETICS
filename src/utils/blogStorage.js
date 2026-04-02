import seededBlogs from "../data/blogs";

const BLOG_STORAGE_KEY = "sbl_blogs";
const BLOG_STORAGE_VERSION_KEY = "sbl_blogs_version";
const BLOG_STORAGE_VERSION = "2";

const migrateSeededBlogs = (storedBlogs) => {
  if (!Array.isArray(storedBlogs)) return seededBlogs;

  const seededBySlug = new Map(seededBlogs.map((blog) => [blog.slug, blog]));
  const storedSeededSlugs = new Set();

  const mergedBlogs = storedBlogs.map((storedBlog) => {
    const seededBlog = seededBySlug.get(storedBlog.slug);

    if (!seededBlog) return storedBlog;

    storedSeededSlugs.add(storedBlog.slug);

    // Keep user-facing mutable fields like likes/ids while refreshing seed content.
    return {
      ...storedBlog,
      ...seededBlog,
      id: storedBlog.id,
      likes: Number(storedBlog.likes) || seededBlog.likes || 0,
      createdAt: storedBlog.createdAt || seededBlog.createdAt,
      updatedAt: new Date().toISOString(),
    };
  });

  const missingSeededBlogs = seededBlogs.filter(
    (blog) => !storedSeededSlugs.has(blog.slug)
  );

  return [...mergedBlogs, ...missingSeededBlogs];
};

const emitBlogsUpdated = (blogs) => {
  window.dispatchEvent(
    new CustomEvent("blogsUpdated", {
      detail: blogs,
    })
  );
};

export const getStoredBlogs = () => {
  const existing = localStorage.getItem(BLOG_STORAGE_KEY);
  const currentVersion = localStorage.getItem(BLOG_STORAGE_VERSION_KEY);

  if (!existing) {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(seededBlogs));
    localStorage.setItem(BLOG_STORAGE_VERSION_KEY, BLOG_STORAGE_VERSION);
    return seededBlogs;
  }

  try {
    const parsedBlogs = JSON.parse(existing);

    if (currentVersion !== BLOG_STORAGE_VERSION) {
      const migratedBlogs = migrateSeededBlogs(parsedBlogs);
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(migratedBlogs));
      localStorage.setItem(BLOG_STORAGE_VERSION_KEY, BLOG_STORAGE_VERSION);
      return migratedBlogs;
    }

    return parsedBlogs;
  } catch (error) {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(seededBlogs));
    localStorage.setItem(BLOG_STORAGE_VERSION_KEY, BLOG_STORAGE_VERSION);
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