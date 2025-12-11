// components/admin/site/GeneralSecretaryCard.tsx
interface GeneralSecretaryCardProps {
  gs?: {
    fullName: string;
    role: string;
    description: string;
    education: string;
    personal: string;
    image: string;
  };
}

export default function GeneralSecretaryCard({ gs }: GeneralSecretaryCardProps) {
  if (!gs) {
    return (
      <div className="bg-gray-200 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold">No Active General Secretary</h3>
      </div>
    );
  }

  return (
    <div className="bg-green-500 text-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-4">
      <img src={gs.image} alt={gs.fullName} className="w-24 h-24 rounded-full object-cover" />
      <div>
        <h3 className="text-lg font-bold">{gs.fullName}</h3>
        <p className="text-sm">{gs.role}</p>
        <p className="mt-2 text-sm">{gs.description}</p>
      </div>
    </div>
  );
}
