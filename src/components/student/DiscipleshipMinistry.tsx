// components/DiscipleshipStrategies.tsx
"use client";

import React from "react";

export default function DiscipleshipMinistry() {
  const strategies = [
    {
      title: "Bible Study",
      description:
        "Knowing and obeying the Scriptures is core to discipleship. We support the spiritual growth of students by helping them develop a love for the Word of God through group Bible studies.",
      icon: (
        <svg
          viewBox="0 0 20 20"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ),
    },
    {
      title: "Small Group",
      description:
        "Since community is essential for spiritual development, we encourage small group ministry among students — promoting Mission, Fellowship, Prayer and Nurturing.",
      icon: (
        <svg
          viewBox="0 0 20 20"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
    },
    {
      title: "Trainings",
      description:
        "We prepare students for campus life and life after university by offering trainings on key spiritual, academic, and life topics.",
      icon: (
        <svg
          viewBox="0 0 20 20"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
        </svg>
      ),
    },
    {
      title: "Local Church Connections",
      description:
        "We help students stay strongly connected with their local churches before and after graduation.",
      icon: (
        <svg
          viewBox="0 0 20 20"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
          />
        </svg>
      ),
    },
    {
      title: "Leadership Development",
      description:
        "We develop leadership skills through reading, discussions, mentorship, and exposure to ministry opportunities.",
      icon: (
        <svg
          viewBox="0 0 20 20"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-6 lg:px-16 max-w-6xl py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Our Discipleship Strategies
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We are committed to raising deeply rooted followers of Christ through
          intentional, Spirit-led discipleship.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {strategies.map((item, index) => (
          <div
            key={index}
            className="bg-white/95 backdrop-blur-sm p-7 rounded-2xl shadow-lg border border-sky-100 hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] flex flex-col"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-teal-600 text-white rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
              {item.icon}
            </div>

            <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-sky-700 transition-colors">
              {item.title}
            </h4>

            <p className="text-gray-600 leading-relaxed flex-1">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


