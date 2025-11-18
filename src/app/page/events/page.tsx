import Image from "next/image";

export default function EventsPage() {
  const events = [
    {
      title: "Regional Leadership Summit (RLS)",
      date: "December 12, 2025",
      description:
        "A transformative gathering where student leaders receive vision, teaching, and relational encouragement.",
      image: "/images/event-rls.jpg",
    },
    {
      title: "National Ministry Summit (NMS)",
      date: "January 18, 2026",
      description:
        "Our nationwide gathering to equip and inspire leaders for greater campus impact.",
      image: "/images/event-nms.jpg",
    },
    {
      title: "National Leadership Summit (NLS)",
      date: "March 5, 2026",
      description:
        "High-level training for committed student leaders stepping into deeper ministry roles.",
      image: "/images/event-nls.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Upcoming Events</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Stay updated with our major student ministry and leadership development events.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{event.date}</p>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
