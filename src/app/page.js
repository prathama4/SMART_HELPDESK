"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const title = "Smart IT Helpdesk";

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-black text-white">

      {/* HERO */}
      <section className="flex items-center justify-center py-24">
        <div className="text-center max-w-4xl px-6">

          {/* Animated Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 flex justify-center flex-wrap">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -6, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block cursor-pointer
                bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400
                bg-clip-text text-transparent"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10">
            A smart platform to raise, track, and resolve college IT issues.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <Link href="/raise-ticket">
              <button className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg font-semibold">
                Raise Ticket
              </button>
            </Link>

            <Link href="/admin-login">
              <button className="px-8 py-3 rounded-full border border-white/40 hover:bg-white hover:text-black transition font-semibold">
                Admin Login
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-24">
        {[
          "Easy Ticket Creation",
          "Admin Dashboard",
          "Issue Analytics",
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md border border-white/10
            rounded-xl px-6 py-5 hover:-translate-y-1 transition"
          >
            <h3 className="text-lg font-bold mb-2">{f}</h3>
            <p className="text-sm text-gray-300">
              Simple and effective IT issue management.
            </p>
          </div>
        ))}
      </section>

    </main>
  );
}
