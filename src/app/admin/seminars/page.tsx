'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AddSeminarModal from '@/components/admin/seminars/AddSeminarModal';
import EditSeminarModal from '@/components/admin/seminars/EditSeminarModal';
import DeleteSeminarModal from '@/components/admin/seminars/DeleteSeminarModal';
import SeminarTable from '@/components/admin/seminars/SeminarsTable';

export default function AdminSeminarsPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editModal, setEditModal] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deleteModal, setDeleteModal] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedSeminar, setSelectedSeminar] = useState<any>(null);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['seminars'],
    queryFn: async () => {
      const res = await fetch('/api/seminars');
      if (!res.ok) throw new Error('Failed to fetch seminars');
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (seminar: any) => {
    setEditModal(seminar);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (seminar: any) => {
    setSelectedSeminar(seminar);
    setDeleteModal(true);
  };

  const handleDeleteSuccess = () => {
    setDeleteModal(false);
    setSelectedSeminar(null);
    refetch();
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
    setSelectedSeminar(null);
  };

  const seminars = data?.data || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seminar Management</h1>
          <p className="text-gray-600 mt-1">Manage and organize your seminars</p>
        </div>
        <button 
          onClick={() => setAddModalOpen(true)} 
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium flex items-center gap-2"
        >
          <span>+ Add Seminar</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{seminars.length}</div>
          <div className="text-sm text-gray-600">Total Seminars</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-green-600">
            {seminars.filter((s: any) => s.isOpen).length}
          </div>
          <div className="text-sm text-gray-600">Open for Registration</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">
            {seminars.reduce((acc: number, s: any) => acc + s.currentRegistrations, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Registrations</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-amber-600">
            {seminars.filter((s: any) => s.currentRegistrations >= s.capacity).length}
          </div>
          <div className="text-sm text-gray-600">At Full Capacity</div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading seminars...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <SeminarTable
            seminars={seminars}
            onEdit={handleEdit}
            onDelete={handleDelete}
            refetch={refetch}
          />
        </div>
      )}

      {/* Modals */}
      {addModalOpen && (
        <AddSeminarModal 
          onClose={() => setAddModalOpen(false)} 
          onSuccess={() => {
            setAddModalOpen(false);
            refetch();
          }} 
        />
      )}

      {editModal && (
        <EditSeminarModal 
          seminar={editModal} 
          onClose={() => setEditModal(null)} 
          onSuccess={() => {
            setEditModal(null);
            refetch();
          }} 
        />
      )}

      {deleteModal && selectedSeminar && (
        <DeleteSeminarModal 
          seminarId={selectedSeminar._id}
          seminarTitle={selectedSeminar.title}
          registrationCount={selectedSeminar.currentRegistrations}
          onClose={handleDeleteClose}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}