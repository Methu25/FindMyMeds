import React, { useState } from "react";
import { rejectPharmacy } from "../../../Service/Admin/PharmacyService";

const RejectPharmacyModal = ({ open, pharmacy, onClose, refresh }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open || !pharmacy) return null;

  const handleReject = async () => {
    if (!reason) return alert("Please enter a reason");
    setLoading(true);
    try {
      await rejectPharmacy(pharmacy.id, reason);
      refresh();
      onClose();
    } catch (err) {
      console.error("Failed to reject pharmacy", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Reject Pharmacy</h2>
        <p className="mb-4">
          Reject <span className="font-semibold">{pharmacy.name}</span> from approval?
        </p>
        <textarea 
          value={reason} 
          onChange={e => setReason(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter rejection reason"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button 
            onClick={handleReject} 
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
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
