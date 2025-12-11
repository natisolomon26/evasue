import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";

interface Subscriber {
  _id: string;
  email: string;
  categories: string[];
  status: string;
  createdAt: string;
}

interface SubscriberTableProps {
  subscribers: Subscriber[];
  onView?: (s: Subscriber) => void;
  onDelete?: (s: Subscriber) => void;
  pageSize?: number;
}

export default function SubscriberTable({ subscribers, onView, onDelete, pageSize = 5 }: SubscriberTableProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(subscribers.length / pageSize);
  const currentData = subscribers.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
      <table className="min-w-full text-left text-gray-800">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Categories</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Subscribed At</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((s) => (
            <tr key={s._id} className="border-b hover:bg-gray-100 transition-colors duration-200">
              <td className="px-4 py-2 font-medium">{s.email}</td>
              <td className="px-4 py-2">{s.categories.join(", ")}</td>
              <td className="px-4 py-2 capitalize">{s.status}</td>
              <td className="px-4 py-2">{new Date(s.createdAt).toLocaleString()}</td>
              <td className="px-4 py-2 flex justify-center gap-3">
                <button onClick={() => onView?.(s)} className="p-2 rounded hover:bg-gray-200 transition" title="View">
                  <Eye className="h-5 w-5 text-gray-600" />
                </button>
                <button onClick={() => onDelete?.(s)} className="p-2 rounded hover:bg-red-100 transition" title="Delete">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-blue-500 text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
