import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removePharmacy } from "../../../Service/Admin/PharmacyService";

const RemovePharmacyModal = ({ open, pharmacy, onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!open || !pharmacy) return null;

  const handleRemove = async () => {
    // 1. DYNAMIC ID DETECTION (Prevents the 400 "undefined" error)
    const idToUse = pharmacy.pharmacy_id || pharmacy.id || pharmacy._id;

    if (!idToUse) {
      console.error("Critical: No ID found for removal", pharmacy);
      alert("Error: Pharmacy ID is missing.");
      return;
    }

    setLoading(true);
    try {
      console.log(`Sending permanent removal request for ID: ${idToUse}`);

      // 2. BACKEND CALL: hits http://localhost:8080/api/admin/pharmacies/{id}/remove
      await removePharmacy(idToUse);
      
      // 3. Close the modal
      onClose();

      // 4. NAVIGATION: Since the record is gone, we navigate back to the main list
      navigate("/admin/pharmacies", { replace: true });
      
    } catch (err) {
      console.error("Removal failed:", err.message);
      alert(`Failed to remove: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl border border-slate-100 animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-[1000] text-slate-800 uppercase tracking-tight">
            Remove Pharmacy
          </h2>
          <div className="h-1 w-12 bg-rose-500 mt-2 rounded-full"></div>
        </div>

        {/* Content */}
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Are you sure you want to permanently remove <span className="font-bold text-rose-600">{pharmacy.pharmacy_name || pharmacy.name}</span>? 
          This action <span className="underline decoration-rose-200 underline-offset-4">cannot be undone</span> and all related data will be lost.
        </p>
        
        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          <button 
            onClick={onClose} 
            className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          
          <button 
            onClick={handleRemove} 
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-rose-500 text-white font-black uppercase text-[11px] tracking-[0.15em] shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Removing...
              </>
            ) : (
              "Confirm Removal"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemovePharmacyModal;