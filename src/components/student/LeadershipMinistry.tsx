"use client";

import { ReactNode } from "react";

interface LeadershipCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const LeadershipCard = ({ icon, title, description }: LeadershipCardProps) => (
  <div className="bg-white/95 backdrop-blur-sm p-7 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] flex flex-col">
    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
      {icon}
    </div>

    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-700 transition-colors">
      {title}
    </h4>

    <p className="text-gray-600 leading-relaxed flex-1">
      {description}
    </p>
  </div>
);

export default function LeadershipMinistry() {
  const strategies = [
    {
      title: "Train Student Leaders",
      description:
        "We equip student leaders through targeted training on biblical leadership, character, and practical ministry skills to serve effectively on campus.",
      icon: (
        <svg viewBox="0 0 20 20" className="w-6 h-6" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
        </svg>
      ),
    },
    {
      title: "Small Group Ministry Training",
      description:
        "We train leaders to launch and shepherd small groups — spaces for discipleship, prayer, and authentic fellowship among students.",
      icon: (
        <svg viewBox="0 0 20 20" className="w-6 h-6" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0z" />
          <path d="M18 8a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Encourage Mentorship",
      description:
        "We promote one-on-one and group mentorship, connecting emerging leaders with mature believers for guidance, encouragement, and accountability.",
      icon: (
        <svg viewBox="0 0 20 20" className="w-6 h-6" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          />
        </svg>
      ),
    },
    {
      title: "Model Leadership in Service",
      description:
        "Our Campus Staff Workers walk alongside student leaders, modeling Christ-like service and leadership in real campus ministry contexts.",
      icon: (
        <svg viewBox="0 0 20 20" className="w-6 h-6" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          />
        </svg>
      ),
    },
    {
      title: "Build Skills Through Growth",
      description:
        "We challenge leaders to grow through reading, discussion, and new responsibilities — developing wisdom, vision, and resilience.",
      icon: (
        <svg viewBox="0 0 20 20" className="w-6 h-6" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Our Leadership Strategies
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We are committed to raising servant leaders who reflect Christ in character, vision, and action.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {strategies.map((item, i) => (
          <LeadershipCard
            key={i}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
