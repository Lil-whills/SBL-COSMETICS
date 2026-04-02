import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { getStoredBlogs } from "../utils/blogStorage";

const BlogDetails = () => {
  const { slug } = useParams();

  const blog = useMemo(() => {
    const blogs = getStoredBlogs();
    return blogs.find((item) => item.slug === slug);
  }, [slug]);

  const [likes, setLikes] = useState(blog?.likes || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLikes(blog?.likes || 0);
    setLiked(false);
  }, [blog]);

  const handleLike = () => {
    if (liked) {
      setLikes((prev) => prev - 1);
      setLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setLiked(true);
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#050b16] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] p-10 text-center">
          <h1 className="text-3xl font-bold">Blog not found</h1>
          <p className="mt-3 text-slate-400">
            The blog post you are looking for does not exist.
          </p>
          <Link
            to="/blogs"
            className="mt-6 inline-flex rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b16] via-[#050b16]/45 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <Link
            to="/blogs"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition hover:text-lime-300"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-5xl">
            {blog.title}
          </h1>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm uppercase tracking-[0.25em] text-lime-300">
                SBL Cosmetics Blog
              </p>

              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  liked
                    ? "bg-lime-300 text-slate-950"
                    : "border border-cyan-800/50 text-cyan-200 hover:bg-cyan-900/30 hover:text-white"
                }`}
              >
                <Heart size={16} fill={liked ? "currentColor" : "none"} />
                {likes} Likes
              </button>
            </div>

            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              {blog.description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;