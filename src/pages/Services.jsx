import React from "react";
import { useNavigate } from "react-router-dom";
import consultancy from "../assets/consultancy.png";
import recommendation from "../assets/recommendation.png";
import packaging from "../assets/packaging.png";
import delivery from "../assets/delivery.png";
import bulk from "../assets/bulk.png";
import customercare from "../assets/customercare.png";
import {
  Gift,
  Truck,
  Sparkles,
  HeartHandshake,
  PackageCheck,
  MessageCircleMore,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Beauty Consultation",
    description:
      "Get simple guidance on choosing the right skincare, fragrance, and beauty products for your style and needs.",
    icon: Sparkles,
    image: consultancy,
  },
  {
    id: 2,
    title: "Fragrance Recommendations",
    description:
      "We help customers discover perfumes that match their mood, occasion, and personal taste.",
    icon: HeartHandshake,
    image: recommendation,
  },
  {
    id: 3,
    title: "Gift Packaging",
    description:
      "Make your purchases extra special with neat and elegant packaging for birthdays, surprises, and celebrations.",
    icon: Gift,
    image: packaging,
  },
  {
    id: 4,
    title: "Fast Delivery Support",
    description:
      "Enjoy smooth order handling and convenient delivery support for selected locations.",
    icon: Truck,
    image: delivery,
  },
  {
    id: 5,
    title: "Bulk Orders",
    description:
      "We support larger quantity purchases for resellers, events, gifting, and business needs.",
    icon: PackageCheck,
    image: bulk,
  },
  {
    id: 6,
    title: "Customer Care",
    description:
      "Need help with a product, order, or recommendation? Reach out and get quick assistance.",
    icon: MessageCircleMore,
    image: customercare,
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      {/* Hero */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-gradient-to-br from-[#08111f] via-[#0b1628] to-[#10223d] px-6 py-10 shadow-2xl lg:px-10">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
              Our Services
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              More Than Products, We Offer Beauty Support
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              SBL Cosmetics is focused on helping customers enjoy beauty,
              fragrance, skincare, and personal care with convenience,
              confidence, and style.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              What We Offer
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Simple Services for a Better Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="overflow-hidden rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-cyan-700/50"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-900/25 text-lime-300">
                      <Icon size={22} />
                    </div>

                    <h3 className="text-xl font-semibold text-white">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6">
            <h3 className="text-xl font-semibold text-white">Quality Focus</h3>
            <p className="mt-3 leading-7 text-slate-300">
              We aim to offer beauty products that feel premium, stylish, and
              worth returning for.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6">
            <h3 className="text-xl font-semibold text-white">Customer First</h3>
            <p className="mt-3 leading-7 text-slate-300">
              From recommendations to after-purchase support, we want customers
              to feel heard and valued.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6">
            <h3 className="text-xl font-semibold text-white">
              Elegant Brand Experience
            </h3>
            <p className="mt-3 leading-7 text-slate-300">
              SBL Cosmetics is designed to combine beauty, confidence, and a
              luxury-inspired shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-cyan-900/30 bg-gradient-to-r from-[#0b1628] via-[#10223d] to-[#0b1628] px-6 py-10 text-center shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Need Help?
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Let’s Help You Find the Right Beauty Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Reach out for recommendations, product questions, delivery support,
            and any beauty-related assistance from SBL Cosmetics.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200"
            >
              Contact Us
            </button>

            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
            >
              Explore Products
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;