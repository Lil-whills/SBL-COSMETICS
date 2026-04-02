import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Github,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const whatsappMessage = encodeURIComponent(
    "Hello SBL Cosmetics, I want to make an inquiry."
  );

  return (
    <footer className="border-t border-cyan-900/30 bg-[#08111f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
              SBL Cosmetics
            </p>
            <h3 className="mt-2 text-2xl font-bold">Beauty with Confidence</h3>
            <p className="mt-3 max-w-sm leading-7 text-slate-300">
              Premium perfumes, skincare, hair care, makeup, and beauty
              essentials presented with style, trust, and elegance.
            </p>

            <a
              href={`https://wa.me/233557246726?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2 font-semibold text-slate-950 transition hover:bg-lime-200"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 md:contents">
            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <div className="flex flex-col gap-2 text-slate-300">
                <Link to="/" className="transition hover:text-lime-300">
                  Home
                </Link>
                <Link to="/about" className="transition hover:text-lime-300">
                  About
                </Link>
                <Link to="/products" className="transition hover:text-lime-300">
                  Products
                </Link>
                <Link to="/services" className="transition hover:text-lime-300">
                  Services
                </Link>
                <Link to="/contact" className="transition hover:text-lime-300">
                  Contact
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <div className="flex flex-col gap-2 text-slate-300">
                <Link to="/products" className="transition hover:text-lime-300">
                  Shop Collection
                </Link>
                <Link to="/services" className="transition hover:text-lime-300">
                  Customer Help
                </Link>
                <a
                  href={`https://wa.me/233557246726?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-lime-300"
                >
                  WhatsApp Support
                </a>
                <a
                  href="mailto:williams.kyere@stu.ucc.edu.gh"
                  className="transition hover:text-lime-300"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:contents">
            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Contact Info</h4>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-start gap-3">
                  <PhoneCall size={18} className="mt-1 text-lime-300" />
                  <span>0557246726</span>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-1 text-lime-300" />
                  <span className="break-all">williams.kyere@stu.ucc.edu.gh</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-lime-300" />
                  <span>University of Cape Coast, Cape Coast, Ghana</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">Socials</h4>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://github.com/Lil-whills"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-cyan-800/50 p-2.5 text-slate-200 transition hover:bg-cyan-900/30 hover:text-cyan-200"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/in/ameyaw-williams-kyere-76b60a34b/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-cyan-800/50 p-2.5 text-slate-200 transition hover:bg-cyan-900/30 hover:text-cyan-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href={`https://wa.me/233557246726?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-cyan-800/50 p-2.5 text-slate-200 transition hover:bg-cyan-900/30 hover:text-cyan-200"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-cyan-900/30 pt-5 text-center text-sm text-slate-400 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} SBL Cosmetics. All rights reserved.</p>
          <p>Designed with style, beauty, and confidence.</p>
        </div>
      </div> 
    </footer>
  );
};

export default Footer;