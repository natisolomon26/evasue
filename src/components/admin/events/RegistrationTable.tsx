// components/RegistrationTable.tsx
"use client";

export interface Registration {
  _id: string;
  answers: { [key: string]: string };
  paymentStatus: string;
  amountPaid: number;
  paymentType: string;
  registeredAt: string;
}

interface Props {
  registrations: Registration[];
}

export default function RegistrationTable({ registrations }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Payment Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount Paid</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Payment Type</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Registered At</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {registrations.map((reg) => (
            <tr key={reg._id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{reg.answers["Full Name"]}</td>
              <td className="px-6 py-4">{reg.answers["Email"]}</td>
              <td className="px-6 py-4">{reg.answers["Phone Number"]}</td>
              <td className="px-6 py-4">{reg.paymentStatus}</td>
              <td className="px-6 py-4">{reg.amountPaid} ETB</td>
              <td className="px-6 py-4">{reg.paymentType}</td>
              <td className="px-6 py-4">{new Date(reg.registeredAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
