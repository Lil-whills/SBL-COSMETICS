import React from "react";
import { PhoneCall, Bell, UserRoundPlus } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-60 w-full border-b border-cyan-900/40 bg-[#08111f] text-white">
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-200">
          <PhoneCall size={16} className="text-lime-300" />
          <span>0557246726</span>
        </div>

        <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-lime-300 uppercase">
          SBL Cosmetics
        </div>

        <div className="flex items-center gap-3">
          <button
            className="rounded-full p-2 text-slate-200 transition hover:bg-cyan-900/30 hover:text-cyan-300"
            aria-label="Notifications"
          >
            <Bell size={17} />
          </button>

          <button
            className="rounded-full p-2 text-slate-200 transition hover:bg-cyan-900/30 hover:text-lime-300"
            aria-label="Sign up"
          >
            <UserRoundPlus size={17} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;