import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, Search, Clock, CheckCircle2, 
  AlertCircle, MessageSquare, ChevronRight, RefreshCw
} from 'lucide-react';

// Service Import
import { getAllReports } from "../../../Service/Admin/ReportService";

const AdminPharmacyReports = () => {
  const navigate = useNavigate();
  
  // State Management
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState("");

  // Data Fetching Logic
  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getAllReports();
      setReports(data || []); 
    } catch (err) {
      console.error("Governance Data Sync Failed:", err);
      setReports([]); // Clear state on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Filter Logic
  const filteredReports = (reports || []).filter(report => {
    const matchesFilter = filter === 'ALL' || report.status === filter;
    const matchesSearch = report.pharmacy_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Analytics Calculation
  const stats = [
    { label: 'Active Inquiries', count: reports.length, icon: <ClipboardList />, color: 'bg-slate-800', key: 'ALL' },
    { label: 'Pending Review', count: reports.filter(r => r.status === 'PENDING').length, icon: <Clock />, color: 'bg-amber-500', key: 'PENDING' },
    { label: 'Resolved Case', count: reports.filter(r => r.status === 'RESOLVED').length, icon: <CheckCircle2 />, color: 'bg-[#2FA4A9]', key: 'RESOLVED' },
    { label: 'Rejected Entry', count: reports.filter(r => r.status === 'REJECTED').length, icon: <AlertCircle />, color: 'bg-rose-500', key: 'REJECTED' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700 bg-[#F8FAFC] min-h-screen">
      
      {/* --- TOP HEADER SECTION --- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[1000] text-slate-800 uppercase tracking-tighter">Pharmacy Reports</h1>
          <p className="text-[10px] font-black text-[#2FA4A9] uppercase tracking-[0.3em] mt-1 italic">
            Governance & Inquiry Management System
          </p>
        </div>
        <button 
          onClick={fetchReports}
          className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#2FA4A9] transition-all hover:rotate-180 duration-500 shadow-sm"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* --- ANALYTICS DASH --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx}
            onClick={() => setFilter(stat.key)}
            className={`cursor-pointer bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 ${filter === stat.key ? 'ring-2 ring-[#2FA4A9]/20 border-[#2FA4A9]' : ''}`}
          >
            <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-[1000] text-slate-800 mt-1">{stat.count}</h3>
          </div>
        ))}
      </div>

      {/* --- FILTER & SEARCH BAR --- */}
      <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 flex items-center gap-4 min-w-[300px]">
          <Search size={20} className="text-slate-300" />
          <input 
            type="text" 
            placeholder="Search by Pharmacy Name or Case ID..."
            className="flex-1 bg-transparent border-none text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          {['ALL', 'PENDING', 'RESOLVED', 'REJECTED'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                filter === s ? 'bg-white text-[#2FA4A9] shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-50">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry Context</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Classification</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Status</th>
              <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Execution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-8 py-24 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-[#2FA4A9]/20 border-t-[#2FA4A9] rounded-full animate-spin"></div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Syncing Records</p>
                  </div>
                </td>
              </tr>
            ) : filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#2FA4A9] group-hover:border-[#2FA4A9]/30 transition-all shadow-sm">
                        <MessageSquare size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 uppercase tracking-tight leading-none">{report.pharmacy_name}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-2 italic tracking-wider">#ID-{report.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      {report.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => navigate(`/admin/reports/${report.id}`)}
                      className="inline-flex items-center justify-center w-10 h-10 bg-slate-900 text-white rounded-xl hover:bg-[#2FA4A9] transition-all shadow-lg hover:shadow-[#2FA4A9]/30"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-8 py-24 text-center">
                  <p className="text-slate-400 font-bold italic text-sm">No inquiry records found in the current audit log.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Pure Status UI Component
const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: "bg-amber-50 text-amber-600 border-amber-100",
    RESOLVED: "bg-emerald-50 text-[#2FA4A9] border-emerald-100",
    REJECTED: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-[1000] uppercase tracking-widest border ${styles[status] || styles.PENDING}`}>
      {status || 'UNASSIGNED'}
    </span>
  );
};

export default AdminPharmacyReports;