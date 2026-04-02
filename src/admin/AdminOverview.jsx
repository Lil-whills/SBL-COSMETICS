import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Package } from "lucide-react";
import { getStoredProducts, onProductsUpdated } from "../utils/productStorage";
import { getStoredBlogs, onBlogsUpdated } from "../utils/blogStorage";

const AdminOverview = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setProducts(getStoredProducts());
    setBlogs(getStoredBlogs());

    const unsubscribeProducts = onProductsUpdated((updatedProducts) => {
      setProducts(updatedProducts);
    });

    const unsubscribeBlogs = onBlogsUpdated((updatedBlogs) => {
      setBlogs(updatedBlogs);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeBlogs();
    };
  }, []);

  const totalProducts = useMemo(() => products.length, [products]);
  const totalBlogs = useMemo(() => blogs.length, [blogs]);

  return (
    <div className="min-h-screen bg-[#050b16] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-4xl border border-cyan-900/30 bg-linear-to-br from-[#08111f] via-[#0b1628] to-[#10223d] p-6 shadow-xl sm:p-8">
          <button
            onClick={() => navigate("/admin")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-lime-300"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
            Admin Overview
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Quick Summary</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            A simple snapshot of your content and quick links to manage products and blogs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-cyan-900/30 bg-[#0b1628] p-6">
            <p className="text-sm text-slate-400">Total Product Posts</p>
            <p className="mt-2 text-4xl font-bold text-lime-300">{totalProducts}</p>
          </div>

          <div className="rounded-3xl border border-cyan-900/30 bg-[#0b1628] p-6">
            <p className="text-sm text-slate-400">Total Blog Posts</p>
            <p className="mt-2 text-4xl font-bold text-lime-300">{totalBlogs}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <button
            onClick={() => navigate("/admin/products")}
            className="rounded-3xl border border-cyan-900/30 bg-[#0b1628] p-6 text-left shadow-lg transition hover:-translate-y-1 hover:border-cyan-700/50"
          >
            <Package size={24} className="text-lime-300" />
            <h2 className="mt-4 text-xl font-semibold">Manage Products</h2>
            <p className="mt-2 text-slate-400">Go to product posts management.</p>
          </button>

          <button
            onClick={() => navigate("/admin/blogs")}
            className="rounded-3xl border border-cyan-900/30 bg-[#0b1628] p-6 text-left shadow-lg transition hover:-translate-y-1 hover:border-cyan-700/50"
          >
            <FileText size={24} className="text-lime-300" />
            <h2 className="mt-4 text-xl font-semibold">Manage Blogs</h2>
            <p className="mt-2 text-slate-400">Go to blog posts management.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
