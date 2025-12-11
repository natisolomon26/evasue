"use client";

import { useEffect, useState } from "react";
import StaffTable from "@/components/admin/site-content/StaffTable";
import GeneralSecretaryTable from "@/components/admin/site-content/GeneralSecretaryTable";
import StaffCard from "@/components/admin/site-content/StaffCard";
import GeneralSecretaryCard from "@/components/admin/site-content/GeneralSecretaryCard";
import StaffModal from "@/components/admin/site-content/StaffModal";
import GeneralSecretaryModal from "@/components/admin/site-content/GeneralSecretaryModal";
import EditStaffModal from "@/components/admin/site-content/EditStaffModal";
import DeleteStaffModal from "@/components/admin/site-content/DeleteStaffModal";

export default function AdminSiteContentPage() {
  const [activeTab, setActiveTab] = useState<"staff" | "gs">("staff");
  const [staffList, setStaffList] = useState<any[]>([]);
  const [gsList, setGsList] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [editStaff, setEditStaff] = useState<any>(null);
  const [deleteStaff, setDeleteStaff] = useState<any>(null);

  const fetchData = async () => {
    const staffRes = await fetch("/api/staff");
    const staffData = await staffRes.json();
    setStaffList(staffData.data || []);

    const gsRes = await fetch("/api/general-secretary");
    const gsData = await gsRes.json();
    setGsList(gsData.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 md:p-12 space-y-6">
      {/* Toggle + Add Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveTab("staff")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "staff" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Staff
        </button>
        <button
          onClick={() => setActiveTab("gs")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "gs" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          General Secretary
        </button>
        <div className="ml-auto">
          <button
            onClick={() => {
              setEditItem(null);
              setModalOpen(true);
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
          >
            + Add {activeTab === "staff" ? "Staff" : "General Secretary"}
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeTab === "staff" ? (
          <StaffCard staffCount={staffList.length} />
        ) : (
          <GeneralSecretaryCard gs={gsList.find((g) => g.isActive)} />
        )}
      </div>

      {/* Table */}
      <div className="mt-6">
        {activeTab === "staff" ? (
          <StaffTable
            staffList={staffList}
            onEdit={(staff) => setEditStaff(staff)}
            onDelete={(staff) => setDeleteStaff(staff)}
          />
        ) : (
          <GeneralSecretaryTable
            gsList={gsList}
            onEdit={(item) => {
              setEditItem(item);
              setModalOpen(true);
            }}
            onDelete={fetchData}
          />
        )}
      </div>

      {/* Modals */}
      {activeTab === "staff" ? (
        <StaffModal
          open={modalOpen}
          item={editItem}
          onClose={() => setModalOpen(false)}
          onSave={fetchData}
        />
      ) : (
        <GeneralSecretaryModal
          open={modalOpen}
          item={editItem}
          onClose={() => setModalOpen(false)}
          onSave={fetchData}
        />
      )}

      {/* Edit/Delete Staff Modals */}
      <EditStaffModal
        open={!!editStaff}
        staff={editStaff}
        onClose={() => setEditStaff(null)}
        onSave={fetchData}
      />

      <DeleteStaffModal
        open={!!deleteStaff}
        staffName={deleteStaff?.fullName}
        onClose={() => setDeleteStaff(null)}
        onDelete={async () => {
          await fetch(`/api/staff/${deleteStaff?._id}`, { method: "DELETE" });
          setDeleteStaff(null);
          fetchData();
        }}
      />
    </div>
  );
}
