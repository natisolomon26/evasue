"use client";

import { useEffect, useState } from "react";
import SubscriberCard from "@/components/admin/email/subscribers/SubscribersCard";
import SubscriberTable from "@/components/admin/email/subscribers/SubscriberTable";
import ViewSubscriberModal from "@/components/admin/email/subscribers/ViewSubscriberModal";
import DeleteSubscriberModal from "@/components/admin/email/subscribers/DeleteSubscriberModal";
interface Subscriber {
  _id: string;
  email: string;
  categories: string[];
  status: string;
  createdAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [viewSubscriber, setViewSubscriber] = useState<Subscriber | null>(null);
  const [deleteSubscriber, setDeleteSubscriber] = useState<Subscriber | null>(null);

  const fetchData = async () => {
    const res = await fetch("/api/subscribers");
    const data = await res.json();
    setSubscribers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 md:p-12 space-y-8">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SubscriberCard title="Total Subscribers" value={subscribers.length} color="bg-blue-500" />
        <SubscriberCard
          title="Active Subscribers"
          value={subscribers.filter((s) => s.status === "active").length}
          color="bg-green-500"
        />
        <SubscriberCard
          title="Inactive Subscribers"
          value={subscribers.filter((s) => s.status !== "active").length}
          color="bg-red-500"
        />
      </div>

      {/* Table */}
      <SubscriberTable
        subscribers={subscribers}
        pageSize={5}
        onView={(s) => setViewSubscriber(s)}
        onDelete={(s) => setDeleteSubscriber(s)}
      />

      {/* Modals */}
      <ViewSubscriberModal
        open={!!viewSubscriber}
        onClose={() => setViewSubscriber(null)}
        subscriber={viewSubscriber}
      />

      <DeleteSubscriberModal
        open={!!deleteSubscriber}
        onClose={() => setDeleteSubscriber(null)}
        onDelete={async () => {
          await fetch(`/api/subscribers/${deleteSubscriber?._id}`, { method: "DELETE" });
          setDeleteSubscriber(null);
          fetchData();
        }}
        email={deleteSubscriber?.email}
      />
    </div>
  );
}
