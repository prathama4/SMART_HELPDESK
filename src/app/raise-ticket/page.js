"use client";

import { useState } from "react";

export default function RaiseTicket() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const ticket = {
      name: form.name.value,
      issue: form.issue.value,
      description: form.description.value,
      status: "Pending",
      createdAt: Date.now(), // 🔑 for SLA timer (next feature)
    };

    const existingTickets =
      JSON.parse(localStorage.getItem("tickets")) || [];

    existingTickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(existingTickets));

    setSubmitted(true);
    form.reset();

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-2">
          Raise a Support Ticket
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Report an IT issue to the support team
        </p>

        {submitted && (
          <p className="text-green-600 text-center font-semibold mb-4">
            ✅ Ticket submitted successfully!
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            required
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="issue"
            required
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Issue Type</option>
            <option>WiFi Problem</option>
            <option>Attendance Issue</option>
            <option>Biometric Issue</option>
            <option>Email Issue</option>
            <option>AC related issue</option>
            <option>UMS Issue</option>
          </select>

          <textarea
            name="description"
            rows="4"
            required
            placeholder="Describe your issue"
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Ticket
          </button>

        </form>
      </div>
    </section>
  );
}
