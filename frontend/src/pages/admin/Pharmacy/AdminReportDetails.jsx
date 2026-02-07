import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MessageSquare, Clock, ShieldCheck, 
  AlertCircle, Send, Paperclip, Building2, 
  User, Calendar, CheckCircle2, History
} from 'lucide-react';

// Layout Components
import AdminLayout from "../../../components/admin/AdminLayout";
import HomeAdminSidebar from "../../../components/admin/HomeAdminSidebar";

// Action Modals
import ResolveReportModal from "../../../components/admin/Pharmacy/ResolveReportModal";
import RejectReportModal from "../../../components/admin/Pharmacy/RejectReportModal";

// Service
import { getReportDetails, sendAdminResponse } from "../../../Service/Admin/ReportService";

const AdminReportDetails = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  
  // Modal States
  const [openResolve, setOpenResolve] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const data = await getReportDetails(reportId);
      setReport(data);
    } catch (err) {
      console.error("Error fetching report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [reportId]);

  const handleSendReply = async () => {
    if (!reply.trim()) return;
    try {
      await sendAdminResponse(reportId, reply);
      setReply("");
      fetchReportData(); // Refresh to show the new message in timeline
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Responses are not supported by the current backend endpoint.");
    }
  };

  if (loading) return <div className="p-20 text-center font-black text-slate-400 animate-pulse uppercase tracking-[0.3em]">Loading Governance Records...</div>;
  if (!report) return <div className="p-20 text-center text-rose-500 font-bold">Report not found.</div>;

  return (
    <AdminLayout>
      <div className="flex">
        <HomeAdminSidebar />
        
        <div className="flex-1 p-8 space-y-6 animate-in fade-in duration-500">
          
          {/* --- TOP NAVIGATION BAR --- */}
          <div className="flex items-center justify-between bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
            <button 
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all font-bold text-sm"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Inquiries
            </button>
            
            <div className="flex gap-3">
              {report.status === 'PENDING' || report.status === 'IN_PROGRESS' ? (
                <>
                  <button 
                    onClick={() => setOpenReject(true)}
                    className="px-6 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-rose-100 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                  >
                    Reject Report
                  </button>
                  <button 
                    onClick={() => setOpenResolve(true)}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-100 hover:scale-105 transition-all"
                  >
                    <CheckCircle2 size={14} /> Resolve Issue
                  </button>
                </>
              ) : (
                <div className="px-6 py-2.5 bg-slate-100 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-200">
                  Case Closed: {report.status}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- LEFT COLUMN: MAIN CONTENT --- */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Report Body */}
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                      <Building2 size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-[1000] text-slate-800 tracking-tighter uppercase leading-none">
                        {report.pharmacy_name}
                      </h2>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Calendar size={12} /> {report.date_submitted} • REF: #REP-{report.id}
                      </p>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${report.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                    {report.status}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-3">Issue Category: {report.category}</p>
                    <h1 className="text-2xl font-black text-slate-800 leading-tight mb-4">{report.subject}</h1>
                    <p className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-[2rem] border border-slate-100 italic">
                      "{report.description}"
                    </p>
                  </div>

                  {/* Attachments Section */}
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Paperclip size={14} /> Evidence & Attachments
                    </p>
                    <div className="flex gap-4">
                      {report.attachments?.map((file, idx) => (
                        <div key={idx} className="w-24 h-24 bg-slate-100 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-500 transition-all cursor-pointer">
                          <Paperclip size={24} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Communication Section */}
              <div className="bg-slate-900 p-10 rounded-[3rem] shadow-xl text-white">
                <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                  <MessageSquare size={20} className="text-indigo-400" /> 
                  Respond to Pharmacy
                </h3>
                <textarea 
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20 mb-4 h-32 placeholder:text-white/20"
                  placeholder="Type your official response here..."
                />
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                    This response will be saved to the Governance Audit Trail.
                  </p>
                  <button 
                    onClick={handleSendReply}
                    className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    <Send size={14} /> Send Response
                  </button>
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN: TIMELINE/AUDIT TRAIL --- */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                  <History size={14} /> Audit Timeline
                </h4>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:left-[11px] before:w-0.5 before:bg-slate-50 before:h-full">
                  {report.history?.map((event, idx) => (
                    <div key={idx} className="relative pl-10">
                      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${event.type === 'STATUS_CHANGE' ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                      <p className="text-[10px] font-black text-slate-800 uppercase tracking-tight">{event.action}</p>
                      <p className="text-[9px] font-bold text-slate-400 mt-1">{event.timestamp}</p>
                      {event.note && (
                        <p className="mt-2 text-[11px] font-medium text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          {event.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Modals */}
          <ResolveReportModal 
            open={openResolve} 
            report={report} 
            onClose={() => setOpenResolve(false)} 
            refresh={fetchReportData} 
          />
          <RejectReportModal 
            open={openReject} 
            report={report} 
            onClose={() => setOpenReject(false)} 
            refresh={fetchReportData} 
          />

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReportDetails;