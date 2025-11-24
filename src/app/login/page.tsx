"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Login request
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      // Fetch current user info
      const userRes = await fetch("/api/auth/me");
      const userJson = await userRes.json();

      const role = userJson.user?.role;

      // Redirect based on role
      if (role === "superadmin" || role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-10">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Checking..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-sm flex justify-between">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
            <a href="/signup" className="text-blue-600 hover:underline">
              Create account
            </a>
          </div>
        </div>
      </div>

      
    </div>
  );
}
