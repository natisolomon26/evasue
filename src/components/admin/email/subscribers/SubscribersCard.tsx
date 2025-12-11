interface SubscriberCardProps {
  title: string;
  value: number;
  color: string;
}

export default function SubscriberCard({ title, value, color }: SubscriberCardProps) {
  return (
    <div className={`${color} text-white rounded-xl shadow-md p-6 flex flex-col items-start`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
