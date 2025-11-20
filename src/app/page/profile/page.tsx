// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(console.error);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
