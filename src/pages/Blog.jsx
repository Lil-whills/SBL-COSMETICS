import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getStoredBlogs, onBlogsUpdated } from "../utils/blogStorage";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(getStoredBlogs());

    const unsubscribe = onBlogsUpdated((updatedBlogs) => {
      setBlogs(updatedBlogs);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-gradient-to-br from-[#08111f] via-[#0b1628] to-[#10223d] px-6 py-10 shadow-2xl lg:px-10">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
              Our Blog
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Beauty Tips, Product Stories, and Lifestyle Insights
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Explore simple blog posts from SBL Cosmetics on perfumes,
              skincare, makeup, hair care, and personal beauty routines.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;