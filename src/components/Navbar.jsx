import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Blogs", path: "/blogs" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-cyan-900/40 bg-[#0b1628]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-center gap-4 px-4 sm:gap-6 sm:px-6 lg:gap-10 lg:px-8 overflow-x-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative whitespace-nowrap text-sm font-medium transition duration-200 ${
                isActive
                  ? "text-lime-300"
                  : "text-slate-200 hover:text-cyan-300"
              }`
            }
          >
            {({ isActive }) => (
              <span className="relative pb-1">
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-lime-300 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;