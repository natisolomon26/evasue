// components/admin/site/GeneralSecretaryModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";

interface GSModalProps {
  open: boolean;
  item?: {
    _id: string;
    fullName: string;
    role: string;
    description: string;
    education: string;
    personal: string;
    image: string; // This could be a URL or base64
  };
  onClose: () => void;
  onSave: () => void;
}

export default function GeneralSecretaryModal({ open, item, onClose, onSave }: GSModalProps) {
  const [fullName, setFullName] = useState("");
  const [role] = useState("General Secretary");
  const [description, setDescription] = useState("");
  const [education, setEducation] = useState("");
  const [personal, setPersonal] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For preview (base64 or URL)
  const [imageFile, setImageFile] = useState<File | null>(null); // Actual file to upload later
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form when item changes
  useEffect(() => {
    if (item) {
      setFullName(item.fullName || "");
      setDescription(item.description || "");
      setEducation(item.education || "");
      setPersonal(item.personal || "");
      setImagePreview(item.image || null);
      setImageFile(null); // Reset file; we're editing an existing record
    } else {
      setFullName("");
      setDescription("");
      setEducation("");
      setPersonal("");
      setImagePreview(null);
      setImageFile(null);
    }
  }, [item]);

  // Handle file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      alert("Full name is required.");
      return;
    }

    setIsSaving(true);

    let imageToSave = imagePreview;

    // Optional: If you want to upload the file to a server and get a URL,
    // you'd do that here. For now, we'll send base64 if a new file was selected.
    // ⚠️ Base64 can be large — better for demo or small-scale use.
    // In production, upload to cloud (Cloudinary, AWS, etc.) and store the URL.

    try {
      const payload = {
        fullName,
        role,
        description,
        education,
        personal,
        image: imageToSave, // This is either old URL, new base64, or null
      };

      const method = item ? "PUT" : "POST";
      const url = item ? `/api/general-secretary/${item._id}` : "/api/general-secretary";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSave();
        onClose();
      } else {
        alert("Failed to save General Secretary.");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {item ? "Edit General Secretary" : "Add New General Secretary"}
          </h2>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="e.g. John Doe"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Brief professional summary..."
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="e.g. MSc in Political Science"
            />
          </div>

          {/* Personal Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Personal Info</label>
            <textarea
              value={personal}
              onChange={(e) => setPersonal(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Birth date, hometown, etc."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
            <div className="flex flex-col items-center">
              {/* Image Preview */}
              {imagePreview ? (
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 mb-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 mb-3 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Photo</span>
                </div>
              )}

              {/* Upload Button */}
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium text-sm"
              >
                {imagePreview ? "Change Photo" : "Upload Photo"}
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <p className="mt-2 text-xs text-gray-500 text-center max-w-xs">
                Upload a square photo (JPG, PNG). Recommended size: 400×400 px.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving || !fullName.trim()}
            className={`px-4 py-2 rounded-lg font-medium text-white transition ${
              isSaving || !fullName.trim()
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSaving ? "Saving..." : item ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}