import React, { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { productCategories } from "../data/products";
import {
  getStoredProducts,
  onProductsUpdated,
} from "../utils/productStorage";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
const [searchTerm, setSearchTerm] = useState("");
const [products, setProducts] = useState([]);

useEffect(() => {
  setProducts(getStoredProducts());

  const unsubscribe = onProductsUpdated((updatedProducts) => {
    setProducts(updatedProducts);
  });

  return unsubscribe;
}, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const keyword = searchTerm.trim().toLowerCase();

      const matchesSearch =
        keyword === "" ||
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product.tags.some((tag) => tag.toLowerCase().includes(keyword)) ||
        product.shortDescription.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      {/* Page Intro */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-gradient-to-br from-[#08111f] via-[#0b1628] to-[#10223d] px-6 py-10 shadow-2xl lg:px-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/40 bg-cyan-950/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">
              <Sparkles size={14} />
              SBL Cosmetics Collection
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Explore Our Premium Beauty Products
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Browse perfumes, skincare, hair care, makeup, and beauty
              essentials carefully selected to match elegance, freshness, and
              confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-5 shadow-lg">
          <div className="mb-5 flex items-center gap-2 text-cyan-300">
            <SlidersHorizontal size={18} />
            <h2 className="text-lg font-semibold">Browse Products</h2>
          </div>

          <div className="flex flex-col gap-5">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search by product name, category, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-cyan-800/40 bg-[#09111d] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3">
              {productCategories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-lime-300 text-slate-950"
                        : "border border-cyan-800/50 bg-transparent text-slate-200 hover:bg-cyan-900/30 hover:text-cyan-200"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-semibold text-lime-300">
              {filteredProducts.length}
            </span>{" "}
            product{filteredProducts.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && (
              <>
                {" "}
                in <span className="text-cyan-300">{activeCategory}</span>
              </>
            )}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] px-6 py-14 text-center">
              <h3 className="text-2xl font-bold text-white">
                No products found
              </h3>
              <p className="mt-3 text-slate-400">
                Try another search term or choose a different category.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                className="mt-6 rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;