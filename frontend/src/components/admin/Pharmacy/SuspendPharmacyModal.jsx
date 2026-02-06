import React, { useState } from "react";
import { suspendPharmacy } from "../../../Service/Admin/PharmacyService";

const SuspendPharmacyModal = ({ open, pharmacy, onClose, refresh }) => {
  const [loading, setLoading] = useState(false);

  // Guard clause: Don't render if the modal isn't open or data is missing
  if (!open || !pharmacy) return null;

  const handleSuspend = async () => {
    // 1. THE FIX: Detect the correct ID key from your Spring Boot object
    const idToUse = pharmacy.pharmacy_id || pharmacy.id || pharmacy._id;

    if (!idToUse) {
      console.error("Critical: No ID found in pharmacy object", pharmacy);
      alert("Error: Pharmacy ID is missing. Check the console.");
      return;
    }

    setLoading(true);
    try {
      console.log(`Sending suspension request for ID: ${idToUse}`);

      // 2. BACKEND CALL: hits http://localhost:8080/api/admin/pharmacies/{id}/suspend
      await suspendPharmacy(idToUse);
      
      // 3. Close the modal first
      onClose();

      // 4. Trigger the refresh function to update the Details page status
      if (refresh) {
        await refresh(); 
      }
      
    } catch (err) {
      console.error("Suspension failed:", err.message);
      alert(`Failed to suspend: ${err.message}`);
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
            Suspend Pharmacy
          </h2>
          <div className="h-1 w-12 bg-amber-500 mt-2 rounded-full"></div>
        </div>

        {/* Content */}
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Are you sure you want to suspend <span className="font-bold text-amber-600">{pharmacy.pharmacy_name || pharmacy.name}</span>? 
          This will temporarily hide their stock from the mobile app.
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
            onClick={handleSuspend} 
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-amber-500 text-white font-black uppercase text-[11px] tracking-[0.15em] shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Suspending...
              </>
            ) : (
              "Confirm Suspension"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspendPharmacyModal;