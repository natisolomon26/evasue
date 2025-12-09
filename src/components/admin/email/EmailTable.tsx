// components/admin/EmailTable.tsx
"use client";

interface Campaign {
  _id: string;
  subject: string;
  category: string;
  sentAt: string;
  sentTo: string[];
}

interface EmailTableProps {
  campaigns: Campaign[];
}

export default function EmailTable({ campaigns }: EmailTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
      <table className="min-w-full text-left text-gray-800">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Sent At</th>
            <th className="px-4 py-2">Recipients</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c._id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{c.subject}</td>
              <td className="px-4 py-2 capitalize">{c.category}</td>
              <td className="px-4 py-2">{new Date(c.sentAt).toLocaleString()}</td>
              <td className="px-4 py-2">{c.sentTo.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
