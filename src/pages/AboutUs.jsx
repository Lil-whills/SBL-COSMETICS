import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Gem,
  ArrowRight,
} from "lucide-react";
import heropic from "../assets/heroPic.png";

const highlights = [
  {
    id: 1,
    title: "Our Mission",
    description:
      "To make beauty, fragrance, and self-care products accessible in a stylish, reliable, and customer-friendly way.",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Our Vision",
    description:
      "To grow SBL Cosmetics into a trusted beauty brand known for quality products, elegant presentation, and customer satisfaction.",
    icon: Gem,
  },
  {
    id: 3,
    title: "Our Promise",
    description:
      "We are committed to offering beauty products that feel premium, look appealing, and serve everyday confidence and self-expression.",
    icon: ShieldCheck,
  },
];

const reasons = [
  "Carefully selected beauty and fragrance products",
  "Elegant brand experience with a premium feel",
  "Friendly customer support and product guidance",
  "Convenient contact and ordering process",
  "A growing cosmetics brand customers can trust",
  "Beauty essentials for different styles and preferences",
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      {/* Hero */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-gradient-to-br from-[#08111f] via-[#0b1628] to-[#10223d] px-6 py-10 shadow-2xl lg:grid-cols-2 lg:px-10">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
              About SBL Cosmetics
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Beauty, Confidence, and Style in One Brand
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              SBL Cosmetics is a growing beauty brand focused on perfumes,
              skincare, hair care, makeup, and everyday beauty essentials. We
              are building a brand that feels elegant, accessible, and trusted.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate("/products")}
                className="rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200"
              >
                Explore Products
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
              >
                Contact Us
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-[#09111d] shadow-xl">
              <img
                src={heropic}
                alt="SBL Cosmetics"
                className="h-[320px] w-full max-w-md object-cover sm:h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-lg sm:p-8">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Our Story
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              More Than Selling Products
            </h2>

            <p className="leading-7 text-slate-300">
              SBL Cosmetics was created with the goal of offering beauty and
              self-care products in a way that feels modern, attractive, and
              customer-centered. We believe beauty is not just about products,
              but about confidence, identity, and how people feel when they
              present themselves.
            </p>

            <p className="leading-7 text-slate-300">
              That is why our brand focuses on combining quality items with a
              refined visual experience, making it easier for customers to find
              beauty products they love in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Promise */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-cyan-700/50"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-900/25 text-lime-300">
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-lg sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Why Choose Us
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Built for Style, Trust, and Convenience
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              We want every customer interaction with SBL Cosmetics to feel
              smooth, attractive, and worthwhile — from discovering products to
              making inquiries and getting support.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="flex items-start gap-3 rounded-2xl border border-cyan-900/30 bg-[#09111d] p-4"
                >
                  <HeartHandshake
                    size={18}
                    className="mt-1 shrink-0 text-lime-300"
                  />
                  <p className="text-sm leading-6 text-slate-300">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-cyan-900/30 bg-gradient-to-br from-[#0b1628] via-[#10223d] to-[#0b1628] p-6 shadow-lg sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
              Brand Focus
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              A Cosmetics Brand With a Premium Feel
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Our goal is to present beauty products in a way that feels clean,
              elegant, and modern. From the website experience to product
              display, SBL Cosmetics is designed to feel intentional and
              refined.
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-cyan-900/30 bg-[#09111d] p-5">
              <h3 className="text-lg font-semibold text-white">
                What We Stand For
              </h3>

              <ul className="mt-4 space-y-3 text-slate-300">
                <li>Quality presentation</li>
                <li>Customer-centered beauty shopping</li>
                <li>Confidence through self-care</li>
                <li>Growing with trust and consistency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-cyan-900/30 bg-gradient-to-r from-[#0b1628] via-[#10223d] to-[#0b1628] px-6 py-10 text-center shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Ready to Explore?
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Discover Products That Match Your Style
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Explore our collection of perfumes, skincare, hair care, makeup,
            and beauty essentials curated for elegance and confidence.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/products")}
              className="rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200"
            >
              Shop Products
            </button>

            <button
              onClick={() => navigate("/services")}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
            >
              View Services
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;