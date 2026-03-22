import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, PhoneCall, Star, Tag } from "lucide-react";
import products from "../data/products";

const ProductDetails = () => {
  const { slug } = useParams();

  const product = useMemo(
  () => products.find((item) => item.slug === slug),
  [slug]
);

const [selectedImage, setSelectedImage] = useState("");

useEffect(() => {
  if (product) {
    setSelectedImage(product.images?.[0] || product.image);
  }
}, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050b16] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] p-10 text-center">
          <h1 className="text-3xl font-bold">Product not found</h1>
          <p className="mt-3 text-slate-400">
            The product you are looking for does not exist.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-lime-300"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-2xl lg:grid-cols-2 lg:p-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[1.5rem] border border-cyan-900/30 bg-[#09111d]">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="h-[400px] w-full object-cover md:h-[520px]"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {product.images?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`overflow-hidden rounded-2xl border transition ${
                      selectedImage === img
                        ? "border-lime-300"
                        : "border-cyan-900/30"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="h-20 w-20 object-cover sm:h-24 sm:w-24"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-sm font-semibold text-cyan-300">
                  {product.category}
                </span>

                {product.badge && (
                  <span className="rounded-full bg-lime-300 px-3 py-1 text-sm font-bold text-slate-950">
                    {product.badge}
                  </span>
                )}

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    product.stock === "Low Stock"
                      ? "bg-amber-400/15 text-amber-300"
                      : "bg-emerald-400/15 text-emerald-300"
                  }`}
                >
                  {product.stock}
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="flex items-center gap-1 text-yellow-300">
                  <Star size={16} fill="currentColor" />
                </div>
                <span>{product.rating}</span>
                <span className="text-slate-500">•</span>
                <span>{product.reviews} reviews</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-lime-300">
                  {product.currency} {product.price}
                </span>
                <span className="text-base text-slate-400 line-through">
                  {product.currency} {product.oldPrice}
                </span>
              </div>

              <p className="text-base leading-7 text-slate-300">
                {product.description}
              </p>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-800/40 px-3 py-1.5 text-sm text-slate-300"
                    >
                      <Tag size={14} className="text-cyan-300" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200">
                  <PhoneCall size={18} />
                  Call to Order
                </button>

                <button className="rounded-full border border-cyan-800/50 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white">
                  Message on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <p className="mt-2 text-slate-400">
              More items you may like from the same category.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.slug}`}
                className="overflow-hidden rounded-[1.5rem] border border-cyan-900/30 bg-[#0b1628] transition hover:-translate-y-1 hover:border-cyan-700/50"
              >
                <div className="h-56 overflow-hidden bg-[#09111d]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="space-y-2 p-4">
                  <h3 className="text-base font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-400">{item.category}</p>
                  <p className="font-bold text-lime-300">
                    {item.currency} {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;