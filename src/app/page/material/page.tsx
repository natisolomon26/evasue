// client component
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Material {
  _id: string;
  title: string;
  fileUrl: string;
}

export default function MaterialsPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMaterials() {
      const res = await fetch("/api/materials");
      const data = await res.json();

      if (!res.ok || !data.materials) {
        // redirect to login if unauthorized
        router.push("/login");
        return;
      }

      setMaterials(data.materials);
      setLoading(false);
    }

    fetchMaterials();
  }, []);

  if (loading) return <p>Loading materials...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Materials</h1>
      <ul className="space-y-2">
        {materials.map((mat) => (
          <li key={mat._id} className="flex justify-between items-center">
            <span>{mat.title}</span>
            <a
              href={mat.fileUrl}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              download
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
