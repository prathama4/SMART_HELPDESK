"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/* Recharts (SSR OFF) */
const PieChart = dynamic(() => import("recharts").then(m => m.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then(m => m.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then(m => m.Cell), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false });

const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#ef4444", "#a855f7"];

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [dark, setDark] = useState(true);

  /* Load tickets + theme */
  useEffect(() => {
    setTickets(JSON.parse(localStorage.getItem("tickets")) || []);

    const savedTheme = localStorage.getItem("theme") || "dark";
    setDark(savedTheme === "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  /* Toggle theme */
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }

  /* Resolve ticket */
  function resolveTicket(index) {
    const updated = [...tickets];
    updated[index].status = "Resolved";
    localStorage.setItem("tickets", JSON.stringify(updated));
    setTickets(updated);
  }

  /* Search + filter */
  const visibleTickets = tickets.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.issue.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || t.status === filter;
    return matchSearch && matchFilter;
  });

  /* Stats */
  const total = tickets.length;
  const pending = tickets.filter(t => t.status === "Pending").length;
  const resolved = tickets.filter(t => t.status === "Resolved").length;

  /* Pie data */
  const issueMap = {};
  tickets.forEach(t => {
    issueMap[t.issue] = (issueMap[t.issue] || 0) + 1;
  });

  const pieData = Object.keys(issueMap).map(k => ({
    name: k,
    value: issueMap[k],
  }));

  return (
   <main className="pt-24 min-h-screen bg-black/60 backdrop-blur-md text-white">


      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold">Admin Dashboard</h1>

        <button
          onClick={toggleTheme}
          className="px-5 py-2 rounded-full border border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/10 transition"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Stat title="Total Tickets" value={total} color="text-blue-600" />
        <Stat title="Pending" value={pending} color="text-yellow-500" />
        <Stat title="Resolved" value={resolved} color="text-green-500" />
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student or issue..."
          className="w-full md:w-1/2 p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/4 p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Resolved</option>
        </select>
      </div>

      {/* PIE CHART */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mb-12 max-w-2xl mx-auto">
        <h2 className="text-lg font-bold text-center mb-4">
          Tickets by Issue
        </h2>

        <div style={{ width: "100%", height: 300 }}>
          {pieData.length === 0 ? (
            <p className="text-center text-gray-500 mt-24">
              No tickets available
            </p>
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-slate-700">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Issue</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {visibleTickets.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No tickets found
                </td>
              </tr>
            ) : (
              visibleTickets.map((t, i) => (
                <tr key={i} className="border-t hover:bg-indigo-50 dark:hover:bg-slate-700 transition">
                  <td className="p-4">{t.name}</td>
                  <td className="p-4">{t.issue}</td>
                  <td className="p-4 font-semibold">{t.status}</td>
                  <td className="p-4">
                    {t.status === "Pending" && (
                      <button
                        onClick={() => resolveTicket(i)}
                        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
                      >
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </main>
  );
}

/* Small stat card component */
function Stat({ title, value, color }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
      <p className="text-gray-500 dark:text-gray-400">{title}</p>
      <p className={`text-4xl font-extrabold ${color}`}>{value}</p>
    </div>
  );
}
