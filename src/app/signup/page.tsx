"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error || "Something went wrong");
      setLoading(false);
      return;
    }

    // Cookie is already set by backend
    router.push("/profile");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-10">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-6">Create Account</h1>

          {error && (
            <p className="text-red-600 mb-4 text-sm">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={data.name}
              onChange={(e) =>
                setData({ ...data, name: e.target.value })
              }
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              className="w-full p-3 border rounded-lg"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1528070479332-ecc102018475")',
        }}
      />
    </div>
  );
}
