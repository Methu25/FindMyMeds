import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileX2, Search, MapPin, Calendar, ChevronRight, ArrowLeft, Archive } from 'lucide-react';
import AdminLayout from "../../../components/admin/AdminLayout";
import HomeAdminSidebar from "../../../components/admin/HomeAdminSidebar";
import { getPharmacies } from "../../../Service/Admin/PharmacyService";

const RejectedPharmacyTable = () => {
  const navigate = useNavigate();
  const [pharmacies, setPharmacies] = useState([]); // Initialized as empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRejectedPharmacies = async () => {
      setLoading(true);
      try {
        const response = await getPharmacies("REJECTED");
        const mapped = (response || []).map((pharmacy) => ({
          pharmacy_id: pharmacy?.id ?? pharmacy?.pharmacy_id,
          pharmacy_name: pharmacy?.name ?? pharmacy?.pharmacy_name,
          location: pharmacy?.address ?? pharmacy?.location,
          rejected_date: pharmacy?.rejectedDate ?? pharmacy?.rejected_date ?? pharmacy?.updatedAt ?? pharmacy?.createdAt,
        }));
        setPharmacies(mapped);
      } catch (error) {
        console.error("Failed to load rejected pharmacies", error);
        setPharmacies([]);
      } finally {
        setLoading(false);
      }
    };

    loadRejectedPharmacies();
  }, []);

  // SAFE FILTER: Prevents errors if pharmacies is null/undefined
  const filteredPharmacies = (pharmacies || []).filter(pharmacy => {
    const name = pharmacy?.pharmacy_name || pharmacy?.name || "";
    const id = (pharmacy?.pharmacy_id || pharmacy?.id || "").toString();
    return name.toLowerCase().includes(searchQuery.toLowerCase()) || id.includes(searchQuery);
  });

  return (
    <AdminLayout>
      <div className="flex min-h-screen bg-slate-50/50">
        <HomeAdminSidebar />
        <div className="flex-1 p-8 space-y-8 animate-in fade-in duration-700">
          
          {/* HEADER */}
          <div className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-[#2FA4A9] transition-all">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-[1000] text-slate-800 uppercase tracking-tighter">Rejected Archive</h2>
                <p className="text-[10px] font-black text-[#2FA4A9] uppercase tracking-widest mt-1 italic">Denied Registration Records</p>
              </div>
            </div>
            
            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search by name or ID..."
                className="w-full pl-12 pr-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold shadow-inner focus:ring-2 focus:ring-[#2FA4A9]/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-50">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pharmacy Details</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Decision Date</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center text-slate-300 font-black uppercase tracking-widest text-xs italic">
                      Loading rejected records...
                    </td>
                  </tr>
                ) : filteredPharmacies.length > 0 ? filteredPharmacies.map((pharmacy) => (
                  <tr key={pharmacy.pharmacy_id || pharmacy.id} className="group hover:bg-slate-50 transition-colors cursor-pointer" 
                      onClick={() => navigate(`/admin/pharmacy/rejected/${pharmacy.pharmacy_id || pharmacy.id}`)}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#2FA4A9] group-hover:bg-[#2FA4A9]/10 transition-all shadow-sm">
                          <FileX2 size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{pharmacy.pharmacy_name || "Unknown Pharmacy"}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">ID: {pharmacy.pharmacy_id || pharmacy.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                        <MapPin size={14} className="text-[#2FA4A9]" /> {pharmacy.location || "N/A"}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <Calendar size={14} /> {pharmacy.rejected_date || "Oct 12, 2025"}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-3 bg-white border border-slate-100 text-slate-300 rounded-xl group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-slate-200">
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                )) : (
                   <tr>
                     <td colSpan="4" className="px-8 py-20 text-center text-slate-300 font-black uppercase tracking-widest text-xs italic">
                       No rejected records found
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RejectedPharmacyTable;