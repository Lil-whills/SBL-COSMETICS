import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import {
  validateAdminCredentials,
  loginAdmin,
  getAdminCredentialsForDemo,
} from "../utils/adminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();

  const demoCredentials = getAdminCredentialsForDemo();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    const isValid = validateAdminCredentials(email, password);

    if (!isValid) {
      setError("Invalid admin email or password.");
      return;
    }

    loginAdmin(email);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#050b16] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] shadow-2xl lg:grid-cols-2">
        {/* Left */}
        <div className="bg-gradient-to-br from-[#08111f] via-[#0b1628] to-[#10223d] px-6 py-10 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
            Admin Access
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Manage SBL Cosmetics Content
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            Log in to manage products and blog posts. Admin actions should stay
            separate from the public website pages.
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-cyan-900/30 bg-[#09111d] p-5">
            <p className="text-sm font-semibold text-cyan-300">
              Demo Admin Credentials
            </p>
            <p className="mt-3 text-sm text-slate-300">
              Email:{" "}
              <span className="font-medium text-white">
                {demoCredentials.email}
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Password:{" "}
              <span className="font-medium text-white">
                {demoCredentials.password}
              </span>
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="px-6 py-10 sm:px-10">
          <div className="mx-auto max-w-md">
            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
            <p className="mt-2 text-slate-400">
              Enter your admin email and password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] py-3 pl-11 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200"
              >
                Login as Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;