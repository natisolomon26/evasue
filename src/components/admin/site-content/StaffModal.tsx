"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Upload, Loader2 } from "lucide-react";

interface Staff {
  _id: string;
  fullName: string;
  role: string;
  email: string;
  image?: string;
}

interface StaffModalProps {
  open: boolean;
  item?: Staff;
  onClose: () => void;
  onSave: () => void;
}

export default function StaffModal({ open, item, onClose, onSave }: StaffModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        fullName: item.fullName || "",
        role: item.role || "",
        email: item.email || "",
        image: item.image || "",
      });
      setImagePreview(item.image || "");
    } else {
      resetForm();
    }
  }, [item]);

  const resetForm = () => {
    setFormData({
      fullName: "",
      role: "",
      email: "",
      image: "",
    });
    setImagePreview("");
    setErrors({});
  };

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: "Image size should be less than 5MB" }));
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: "Please select an image file" }));
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setImagePreview(base64);
      setFormData(prev => ({ ...prev, image: base64 }));
      setErrors(prev => ({ ...prev, image: "" }));
    } catch  {
      setErrors(prev => ({ ...prev, image: "Failed to process image" }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      // Simulate file input change
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await handleFileChange({ target: { files: dataTransfer.files } } as any);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData(prev => ({ ...prev, image: "" }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const method = item ? "PUT" : "POST";
      const url = item ? `/api/staff/${item._id}` : "/api/staff";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${item ? 'update' : 'create'} staff member`);
      }

      onSave();
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error saving staff:", error);
      setErrors(prev => ({
        ...prev,
        submit: `Failed to ${item ? 'update' : 'add'} staff member. Please try again.`
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {item ? "Edit Staff Member" : "Add New Staff Member"}
              </h2>
              <p className="text-gray-500 mt-1">
                {item ? "Update staff information" : "Enter details for the new staff member"}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Profile Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile Picture
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : imagePreview
                    ? "border-gray-300"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="relative inline-block">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={imagePreview}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Drop your image here, or{" "}
                        <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          browse
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports JPG, PNG up to 5MB
                      </p>
                    </div>
                  </>
                )}
              </div>
              {errors.image && (
                <p className="mt-2 text-sm text-red-600">{errors.image}</p>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter full name"
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a role</option>
                  <option value="Manager">Managers</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Marketing">Marketing</option>
                  <option value="staffs">staffs</option>
                  <option value="Other">Other</option>
                </select>
                {errors.role && (
                  <p className="mt-2 text-sm text-red-600">{errors.role}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="staff@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {item ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  {item ? "Update Staff Member" : "Add Staff Member"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}