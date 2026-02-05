import React, { useState } from "react";
import { removePharmacy } from "../../../Service/Admin/PharmacyService";

const RemovePharmacyModal = ({ open, pharmacy, onClose, refresh }) => {
  const [loading, setLoading] = useState(false);

  if (!open || !pharmacy) return null;

  const handleRemove = async () => {
    setLoading(true);
    try {
      await removePharmacy(pharmacy.id);
      refresh();
      onClose();
    } catch (err) {
      console.error("Failed to remove pharmacy", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Remove Pharmacy</h2>
        <p className="mb-4">
          Are you sure you want to remove <span className="font-semibold">{pharmacy.name}</span> permanently?
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button 
            onClick={handleRemove} 
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
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
