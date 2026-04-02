import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { getBlogPreview } from "../data/blogs";

const BlogCard = ({ blog }) => {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-cyan-700/50">
      <div className="h-64 overflow-hidden bg-[#09111d]">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <h3 className="text-xl font-semibold text-white">{blog.title}</h3>

        <p className="text-sm leading-7 text-slate-300">
          {getBlogPreview(blog.description, 50)}
        </p>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-sm text-slate-400">
            <Heart size={16} className="text-lime-300" />
            <span>{blog.likes} likes</span>
          </div>

          <Link
            to={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
          >
            Read More
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;