import React, { useState } from "react";
import { activatePharmacy } from "../../../Service/Admin/PharmacyService";

const ActivatePharmacyModal = ({ open, pharmacy, onClose, refresh }) => {
  const [loading, setLoading] = useState(false);

  // If modal isn't open or data isn't passed, don't show anything
  if (!open || !pharmacy) return null;

  const handleActivate = async () => {
    // 1. THE FIX: Detect the correct ID key from your database object
    const id = pharmacy.pharmacy_id || pharmacy.id || pharmacy._id;

    
    if (!id) {
      console.error("Critical: No ID found in pharmacy object", pharmacy);
      alert("Error: Pharmacy ID is missing. Check the console.");
      return; 
    }

    setLoading(true);
    try {
      // 2. Use the 'id' we found above for the API call
      console.log(`Activating pharmacy with ID: ${id}`);
      await activatePharmacy(id);
      
      // 3. Close the modal on success
      onClose();

      // 4. Refresh the details page so the "Activate" button disappears 
      // and "Suspend" appears (Status changes to ACTIVE)
      if (refresh) {
        await refresh(); 
      }
      
    } catch (err) {
      console.error("Activation request failed:", err);
      alert("Failed to activate pharmacy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border border-slate-100">
        <h2 className="text-2xl font-[1000] text-slate-800 uppercase tracking-tight mb-2">
          Activate Pharmacy
        </h2>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Are you sure you want to activate <span className="font-bold text-[#2FA4A9]">{pharmacy.pharmacy_name}</span>? 
          This will restore their visibility to customers.
        </p>
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-100 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            onClick={handleActivate} 
            className="px-8 py-3 rounded-xl bg-[#2FA4A9] text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-[#2FA4A9]/20 hover:scale-105 transition-all disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Activating..." : "Confirm Activation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivatePharmacyModal;