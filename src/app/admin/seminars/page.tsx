'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AddSeminarModal from '@/components/admin/seminars/AddSeminarModal';
import EditSeminarModal from '@/components/admin/seminars/EditSeminarModal';
import DeleteSeminarModal from '@/components/admin/seminars/DeleteSeminarModal';
import SeminarTable from '@/components/admin/seminars/SeminarsTable';

export default function AdminSeminarsPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModal, setEditModal] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState<any>(null);

  const { data, refetch } = useQuery({
    queryKey: ['seminars'],
    queryFn: async () => {
      const res = await fetch('/api/seminars');
      return res.json();
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Seminars</h1>
        <button onClick={() => setAddModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Seminar</button>
      </div>

      <SeminarTable
        seminars={data?.data || []}
        onEdit={(s) => setEditModal(s)}
        onDelete={(s) => setDeleteModal(s._id)}
        refetch={refetch}
      />

      {addModalOpen && <AddSeminarModal onClose={() => setAddModalOpen(false)} onSuccess={refetch} />}
      {editModal && <EditSeminarModal seminar={editModal} onClose={() => setEditModal(null)} onSuccess={refetch} />}
      {deleteModal && <DeleteSeminarModal seminarId={deleteModal} onClose={() => setDeleteModal(null)} onSuccess={refetch} />}
    </div>
  );
}
