"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [role, setRole] = useState(null);

  // Read role from localStorage on load
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  function logout() {
    localStorage.removeItem("role");
    window.location.href = "/admin-login";
  }

  const navClass = (path) =>
    `relative font-semibold transition ${
      pathname === path
        ? "text-white"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          Smart IT Helpdesk
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm md:text-base">

          <Link href="/" className={navClass("/")}>
            Home
            {pathname === "/" && <Underline />}
          </Link>

          <Link href="/raise-ticket" className={navClass("/raise-ticket")}>
            Raise Ticket
            {pathname === "/raise-ticket" && <Underline />}
          </Link>

          {role === "admin" && (
            <Link href="/admin" className={navClass("/admin")}>
              Dashboard
              {pathname === "/admin" && <Underline />}
            </Link>
          )}

          {role !== "admin" && (
            <Link href="/admin-login" className={navClass("/admin-login")}>
              Admin Login
              {pathname === "/admin-login" && <Underline />}
            </Link>
          )}

          {role === "admin" && (
            <button
              onClick={logout}
              className="ml-3 px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

/* Active underline */
function Underline() {
  return (
    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" />
  );
}
}
