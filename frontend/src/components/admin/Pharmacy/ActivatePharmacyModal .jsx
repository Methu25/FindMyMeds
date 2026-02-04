// src/components/modals/ActivatePharmacyModal.jsx
import React, { useState } from "react";
import { activatePharmacy } from "../../services/admin/pharmacyService";

const ActivatePharmacyModal = ({ isOpen, onClose, pharmacyId, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleActivate = async () => {
    try {
      setLoading(true);
      await activatePharmacy(pharmacyId);
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
        <h2 className="text-lg font-bold mb-4">Activate Pharmacy</h2>
        <p className="mb-4">Do you want to reactivate this pharmacy? It will become active again.</p>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button 
            className="px-4 py-2 rounded bg-green-500 text-white"
            onClick={handleActivate}
            disabled={loading}
          >
            {loading ? "Activating..." : "Activate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivatePharmacyModal;
