// src/components/modals/RemovePharmacyModal.jsx
import React, { useState } from "react";
import { removePharmacy } from "../../services/admin/pharmacyService";

const RemovePharmacyModal = ({ isOpen, onClose, pharmacyId, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    try {
      setLoading(true);
      await removePharmacy(pharmacyId);
      onSuccess && onSuccess();
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Remove Pharmacy</h2>
        <p className="mb-4">Are you sure you want to remove this pharmacy? This will move it to the Removed Pharmacy table.</p>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button 
            className="px-4 py-2 rounded bg-red-600 text-white"
            onClick={handleRemove}
            disabled={loading}
          >
            {loading ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemovePharmacyModal;
