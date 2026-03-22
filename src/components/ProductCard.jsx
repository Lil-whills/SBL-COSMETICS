import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    name,
    image,
    price,
    oldPrice,
    currency,
    rating,
    reviews,
    stock,
    badge,
    shortDescription,
    slug,
  } = product;

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-cyan-700/50">
      <div className="relative h-72 overflow-hidden bg-[#09111d]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-950">
            {badge}
          </span>
        )}
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">{name}</h3>

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              stock === "Low Stock"
                ? "bg-amber-400/15 text-amber-300"
                : "bg-cyan-400/15 text-cyan-300"
            }`}
          >
            {stock}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-slate-300">
          {shortDescription}
        </p>

        <div className="flex items-center gap-2 text-sm text-slate-300">
          <div className="flex items-center gap-1 text-yellow-300">
            <Star size={15} fill="currentColor" />
          </div>
          <span>{rating}</span>
          <span className="text-slate-500">•</span>
          <span>{reviews} reviews</span>
        </div>

        <div className="flex items-center gap-3 text-base">
          <span className="font-bold text-lime-300">
            {currency} {price}
          </span>
          <span className="text-sm text-slate-400 line-through">
            {currency} {oldPrice}
          </span>
        </div>

        <Link
          to={`/products/${slug}`}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
        >
          View Product
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;