// components/admin/EmailForm.tsx
"use client";

import { useState } from "react";

export default function EmailForm({ onSent }: { onSent: () => void }) {
  const [subject, setSubject] = useState("");
  const [htmlBody, setHtmlBody] = useState("");
  const [category, setCategory] = useState("newsletter");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/campaign/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, htmlBody, category }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Campaign sent successfully!");
        setSubject("");
        setHtmlBody("");
        setCategory("newsletter");
        onSent();
      } else {
        setMessage(data.error || "Failed to send");
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <h3 className="text-lg font-semibold mb-4">Send New Campaign</h3>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Subject"
          className="p-3 border rounded-lg"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="HTML content"
          className="p-3 border rounded-lg h-32"
          value={htmlBody}
          onChange={(e) => setHtmlBody(e.target.value)}
          required
        />
        <select
          className="p-3 border rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="newsletter">Newsletter</option>
          <option value="event">Event</option>
          <option value="promotion">Promotion</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Campaign"}
        </button>
        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
}
