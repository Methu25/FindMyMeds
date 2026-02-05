import React, { useState } from "react";
import { activatePharmacy } from "../../../Service/Admin/PharmacyService";

const ActivatePharmacyModal = ({ open, pharmacy, onClose, refresh }) => {
  const [loading, setLoading] = useState(false);

  if (!open || !pharmacy) return null;

  const handleActivate = async () => {
    setLoading(true);
    try {
      await activatePharmacy(pharmacy.id);
      refresh(); // Refresh the table
      onClose();
    } catch (err) {
      console.error("Failed to activate pharmacy", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Activate Pharmacy</h2>
        <p className="mb-4">
          Are you sure you want to activate <span className="font-semibold">{pharmacy.name}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button 
            onClick={handleActivate} 
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
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
