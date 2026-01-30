"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // demo login (you can change later)
    if (username && password) {
      localStorage.setItem("role", "admin");
      window.location.href = "/admin";
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-black px-4">

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-extrabold text-center text-white mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="
              w-full px-4 py-3 rounded-xl
              bg-black/40 text-white
              border border-white/20
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full px-4 py-3 rounded-xl
              bg-black/40 text-white
              border border-white/20
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />

          <button
            type="submit"
            className="
              w-full py-3 rounded-xl
              bg-indigo-600 hover:bg-indigo-700
              text-white font-semibold
              transition
            "
          >
            Login
          </button>

        </form>
      </div>
    </main>
  );
}
