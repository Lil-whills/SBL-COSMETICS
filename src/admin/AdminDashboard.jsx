import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, FileText, LogOut } from "lucide-react";
import { getAdminSession, logoutAdmin } from "../utils/adminAuth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const admin = getAdminSession();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#050b16] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-cyan-900/30 bg-gradient-to-br from-[#08111f] via-[#0b1628] to-[#10223d] px-6 py-8 shadow-2xl sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
                Admin Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-2 text-slate-300">
                Logged in as {admin?.email || "admin"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-5 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <button
            onClick={() => navigate("/admin")}
            className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6 text-left shadow-lg transition hover:-translate-y-1 hover:border-cyan-700/50"
          >
            <LayoutDashboard size={28} className="text-lime-300" />
            <h2 className="mt-4 text-xl font-semibold">Overview</h2>
            <p className="mt-2 text-slate-400">
              View your admin summary and quick actions.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6 text-left shadow-lg transition hover:-translate-y-1 hover:border-cyan-700/50"
          >
            <Package size={28} className="text-lime-300" />
            <h2 className="mt-4 text-xl font-semibold">Manage Products</h2>
            <p className="mt-2 text-slate-400">
              Add, edit, and delete product posts.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/blogs")}
            className="rounded-[1.75rem] border border-cyan-900/30 bg-[#0b1628] p-6 text-left shadow-lg transition hover:-translate-y-1 hover:border-cyan-700/50"
          >
            <FileText size={28} className="text-lime-300" />
            <h2 className="mt-4 text-xl font-semibold">Manage Blogs</h2>
            <p className="mt-2 text-slate-400">
              Add, edit, and delete blog posts.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;