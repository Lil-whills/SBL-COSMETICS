import React from "react";
import building from "../assets/building.png";
import shop from "../assets/shop.png";
import {
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  PhoneCall,
  MapPin,
  ExternalLink,
} from "lucide-react";

const Contact = () => {
  const whatsappMessage = encodeURIComponent(
    "Hello SBL Cosmetics, I want to make an inquiry."
  );

  const mapsLink =
    "https://www.google.com/maps/search/?api=1&query=5.112123,-1.294343";

  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-gradient-to-br from-[#08111f] via-[#0b1628] to-[#10223d] px-6 py-10 shadow-2xl lg:px-10">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
              Contact Us
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Find Us Easily and Reach Out Fast
            </h1>

            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Visit SBL Cosmetics at UCC, Cape Coast, or contact us directly by
              WhatsApp, phone, email, or map directions.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/233557246726?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 hover:bg-lime-200"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>

              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
              >
                <MapPin size={18} />
                Open Map
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Visual Gallery */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="group overflow-hidden rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] shadow-lg">
                <div className="h-64 overflow-hidden">
                  <img
                    src={building}
                    alt="SBL Cosmetics building exterior"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Exterior View
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Spot the building easily when visiting.
                  </p>
                </div>
              </div>

              <div className="group overflow-hidden rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] shadow-lg">
                <div className="h-64 overflow-hidden">
                  <img
                    src={shop}
                    alt="SBL Cosmetics shop interior"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Shop Interior
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    A quick look inside the shop space.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-cyan-900/30 bg-[#0b1628] p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-900/25 text-lime-300">
                  <PhoneCall size={22} />
                </div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="mt-2 text-slate-300">0557246726</p>
              </div>

              <div className="rounded-[1.5rem] border border-cyan-900/30 bg-[#0b1628] p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-900/25 text-lime-300">
                  <Mail size={22} />
                </div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="mt-2 break-all text-slate-300">
                  williams.kyere@stu.ucc.edu.gh
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-cyan-900/30 bg-[#0b1628] p-5 sm:col-span-2">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-900/25 text-lime-300">
                  <MapPin size={22} />
                </div>
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="mt-2 text-slate-300">
                  University of Cape Coast, Cape Coast, Ghana
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Exact pinned location on campus
                </p>

                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
                >
                  <ExternalLink size={16} />
                  Open in Maps
                </a>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="overflow-hidden rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-3 shadow-lg">
              <iframe
                title="SBL Cosmetics Location"
                src="https://www.google.com/maps?q=5.112123,-1.294343&z=17&output=embed"
                className="h-[320px] w-full rounded-[1.25rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Social Links */}
            <div className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-white">
                Quick Contact Links
              </h3>

              <div className="mt-5 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/233557246726?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-lime-200"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>

                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-cyan-900/30 hover:text-cyan-200"
                >
                  <MapPin size={18} />
                  Map
                </a>

                <a
                  href="mailto:williams.kyere@stu.ucc.edu.gh"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-cyan-900/30 hover:text-cyan-200"
                >
                  <Mail size={18} />
                  Email
                </a>

                <a
                  href="https://github.com/Lil-whills"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-cyan-900/30 hover:text-cyan-200"
                >
                  <Github size={18} />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/ameyaw-williams-kyere-76b60a34b/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-cyan-900/30 hover:text-cyan-200"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT / FORM */}
          <div className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-lg sm:p-8">
            <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Fill the form below and your message will be sent directly through
              Formspree.
            </p>

            <form
              action="https://formspree.io/f/xjkpvqgn"
              method="POST"
              className="mt-6 space-y-5"
            >
              <input
                type="hidden"
                name="_subject"
                value="New Message from SBL Cosmetics Website!"
              />
              <input
                type="hidden"
                name="_next"
                value="https://wills-mind.vercel.app/#contact"
              />
              <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Write your message..."
                  required
                  className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;