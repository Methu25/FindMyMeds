// src/components/modals/SuspendPharmacyModal.jsx
import React, { useState } from "react";
import { suspendPharmacy } from "../../../Service/admin/pharmacyService";

const SuspendPharmacyModal = ({ isOpen, onClose, pharmacyId, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSuspend = async () => {
    try {
      setLoading(true);
      await suspendPharmacy(pharmacyId);
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
        <h2 className="text-lg font-bold mb-4">Suspend Pharmacy</h2>
        <p className="mb-4">Are you sure you want to suspend this pharmacy? It will no longer be active.</p>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-white"
            onClick={handleSuspend}
            disabled={loading}
          >
            {loading ? "Suspending..." : "Suspend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspendPharmacyModal;
