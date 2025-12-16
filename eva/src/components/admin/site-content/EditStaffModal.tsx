"use client";

import StaffModal from "./StaffModal";

interface EditStaffModalProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  staff: any;
  onClose: () => void;
  onSave: () => void;
}

export default function EditStaffModal({ open, staff, onClose, onSave }: EditStaffModalProps) {
  if (!staff) return null;

  return (
    <StaffModal
      open={open}
      item={staff}
      onClose={onClose}
      onSave={onSave}
    />
  );
}
