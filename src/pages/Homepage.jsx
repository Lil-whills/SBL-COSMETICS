import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  PhoneCall,
  ShoppingBag,
  Star,
  Sparkles,
} from "lucide-react";

import heropic from "../assets/heroPic.png";
import haircream from "../assets/haircream.png";
import skincare from "../assets/skincare.png";
import perfume from "../assets/perfume.png";
import makeup from "../assets/makeup.png";
import lipstick from "../assets/lipstick.png";
import discount1 from "../assets/discount1.png";
import discount2 from "../assets/discount2.png";

const categories = [
  { name: "Hair Cream", image: haircream },
  { name: "Skin Care", image: skincare },
  { name: "Perfume", image: perfume },
  { name: "Face Cream", image: heropic },
  { name: "Makeup Brush", image: makeup },
  { name: "Lipstick", image: lipstick },
];

const promos = [
  {
    title: "25% Discount",
    subtitle: "Cosmetic Skin",
    description: "Glow perfectly with selected skincare essentials.",
    image: discount1,
  },
  {
    title: "40% Discount",
    subtitle: "Hydrated Skin",
    description: "Fresh formulas designed for soft and radiant beauty.",
    image: discount2,
  },
];

const trendingProducts = [
  {
    id: 1,
    name: "Velvet Bloom Perfume",
    image: heropic,
    discount: "8% Discount",
    price: "$100",
    oldPrice: "$120",
  },
  {
    id: 2,
    name: "Radiant Skin Serum",
    image: skincare,
    discount: "12% Discount",
    price: "$88",
    oldPrice: "$100",
  },
  {
    id: 3,
    name: "Luxury Hair Cream",
    image: haircream,
    discount: "10% Discount",
    price: "$72",
    oldPrice: "$80",
  },
  {
    id: 4,
    name: "Soft Touch Lipstick",
    image: lipstick,
    discount: "6% Discount",
    price: "$47",
    oldPrice: "$50",
  },
  {
    id: 5,
    name: "Premium Makeup Brush",
    image: makeup,
    discount: "15% Discount",
    price: "$68",
    oldPrice: "$80",
  },
  {
    id: 6,
    name: "Fresh Face Cream",
    image: heropic,
    discount: "9% Discount",
    price: "$91",
    oldPrice: "$100",
  },
];

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#050b16] text-white">
      {/* Hero Section */}
      <section className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-gradient-to-br from-[#08111f] via-[#0b1628] to-[#0f1d35] px-6 py-10 shadow-2xl lg:grid-cols-2 lg:px-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/40 bg-cyan-950/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">
              <Sparkles size={14} />
              Luxury Beauty Collection
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Discover Beauty, Fragrance, and Confidence in One Place
            </h1>

            <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              SBL Cosmetics brings you premium perfumes, skincare, hair care,
              and beauty essentials curated for elegance, freshness, and style.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={()=>navigate('/contact')}
              className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 hover:bg-lime-200">
                <PhoneCall size={18} />
                Call Now
              </button>

              <button 
                onClick={()=>navigate('/products')}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-700/50 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white">
                <ShoppingBag size={18} />
                Explore Products
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[300px] w-full max-w-md overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-[#09111d] shadow-xl sm:h-[380px] lg:h-[460px]">
              <img
                src={heropic}
                alt="SBL Cosmetics Hero"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b16]/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Shop by Category
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Beauty Essentials for Every Style
            </h2>
          </div>

          <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group flex w-[110px] flex-col items-center text-center sm:w-[130px]"
              >
                <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-cyan-800/40 bg-[#0b1628] shadow-lg transition duration-300 group-hover:scale-105 group-hover:border-lime-300 sm:h-28 sm:w-28 md:h-32 md:w-32">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-200 group-hover:text-lime-300 sm:text-base">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
          {promos.map((promo) => (
            <div
              key={promo.title}
              className="group relative overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-gradient-to-br from-[#0c1729] via-[#0b1628] to-[#10223d] p-6 shadow-xl"
            >
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-300">
                    {promo.title}
                  </p>

                  <h3 className="text-3xl font-bold leading-tight text-white">
                    {promo.subtitle}
                  </h3>

                  <p className="max-w-md text-sm leading-7 text-slate-300 sm:text-base">
                    {promo.description}
                  </p>

                  <button className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-3 font-semibold text-slate-950 transition hover:scale-105 hover:bg-lime-200">
                    Shop Now
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="flex justify-center md:justify-end">
                  <div className="h-52 w-full max-w-[220px] overflow-hidden rounded-[1.5rem] border border-cyan-900/30 bg-[#0a1322]">
                    <img
                      src={promo.image}
                      alt={promo.subtitle}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Featured Picks
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Trending Products
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="rounded-full bg-lime-300 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-lime-200">
                New Arrival
              </button>
              <button className="rounded-full border border-cyan-800/50 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:bg-cyan-900/30 hover:text-cyan-200">
                Best Sellers
              </button>
              <button className="rounded-full border border-cyan-800/50 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:bg-cyan-900/30 hover:text-cyan-200">
                Special
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-cyan-700/50"
              >
                <div className="relative h-72 overflow-hidden bg-[#09111d]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-950">
                    {product.discount}
                  </span>
                </div>

                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold text-white">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 text-yellow-300">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>

                  <div className="flex items-center gap-3 text-base">
                    <span className="font-bold text-lime-300">
                      {product.price}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {product.oldPrice}
                    </span>
                  </div>

                  <button className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white">
                    View Product
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button 
              onClick={()=>navigate('/products')}
            className="rounded-full bg-lime-300 px-7 py-3 font-semibold text-slate-950 transition hover:scale-105 hover:bg-lime-200">
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;