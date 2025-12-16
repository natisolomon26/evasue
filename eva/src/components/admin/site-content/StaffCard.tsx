// components/admin/site/StaffCard.tsx
interface StaffCardProps {
  staffCount: number;
}

export default function StaffCard({ staffCount }: StaffCardProps) {
  return (
    <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold">Total Staff</h3>
      <p className="mt-2 text-3xl font-bold">{staffCount}</p>
    </div>
  );
}
