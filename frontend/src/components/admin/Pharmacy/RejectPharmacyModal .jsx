// src/components/modals/RejectPharmacyModal.jsx
import React, { useState } from "react";
import { rejectPharmacy } from "../../services/admin/pharmacyService";

const RejectPharmacyModal = ({ isOpen, onClose, pharmacyId, onSuccess }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    if (!reason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    try {
      setLoading(true);
      await rejectPharmacy(pharmacyId, reason);
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
        <h2 className="text-lg font-bold mb-4">Reject Pharmacy</h2>
        <textarea
          className="w-full border rounded p-2 mb-4"
          placeholder="Enter rejection reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button 
            className="px-4 py-2 rounded bg-red-500 text-white"
            onClick={handleReject}
            disabled={loading}
          >
            {loading ? "Rejecting..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectPharmacyModal;
