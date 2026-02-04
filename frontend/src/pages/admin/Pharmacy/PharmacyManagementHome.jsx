import { useEffect, useState } from "react";
/* 1. Added Plus and FileText for the QuickAction icons if needed */
import { Activity, CheckCircle, Clock, AlertTriangle, Search, Bell, Plus, FileText } from "lucide-react";

/* ===== Components ===== */
import MetricCard from "../../../components/admin/Pharmacy/MetricCard";
import NotificationPanel from "../../../components/admin/Pharmacy/NotificationPanel";
import PharmacyTable from "../../../components/admin/Pharmacy/PharmacyTable";
import PharmacyTypeCard from "../../../components/admin/Pharmacy/PharmacyTypeCard";
import QuickActionPanel from "../../../components/admin/Pharmacy/QuickActionPanel";

/* ===== Modals & Services ===== */
import ActivatePharmacyModal from "../../../components/admin/Pharmacy/ActivatePharmacyModal";
import RejectPharmacyModal from "../../../components/admin/Pharmacy/RejectPharmacyModal";
import RemovePharmacyModal from "../../../components/admin/Pharmacy/RemovePharmacyModal";
import SuspendPharmacyModal from "../../../components/admin/Pharmacy/SuspendPharmacyModal";
import { getPharmacies } from "../../../Service/admin/pharmacyService";

const PharmacyManagementHome = () => {
  /* =======================
      STATE & LOGIC
  ======================= */
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const [activeFilter, setActiveFilter] = useState('ACTIVE');
  const [searchTerm, setSearchTerm] = useState("");

  /* ===== Modal States ===== */
  const [openActivate, setOpenActivate] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openSuspend, setOpenSuspend] = useState(false);

  useEffect(() => {
    loadPharmacies();
    
    // LOGIC: Simulating fetching notifications, then filtering for top 5 unread
    const rawNotifications = [
      { id: 1, message: "Pharmacy verification pending for 'City Meds'", isRead: false, date: new Date() },
      { id: 2, message: "License expiration warning: 'HealthPlus'", isRead: false, date: new Date() },
      { id: 3, message: "New user registration: Admin 'Yash'", isRead: true, date: new Date() },
    ];

    const latestUnread = rawNotifications
      .filter(note => !note.isRead) // Logic to get unread
      .slice(0, 5); // Take top 5
      
    setNotifications(latestUnread);
  }, []);

  const loadPharmacies = async () => {
    setLoading(true);
    try {
      const response = await getPharmacies();
      setPharmacies(response.data || []);
    } catch (error) {
      console.error("Failed to load pharmacies", error);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
      HANDLERS
  ======================= */
  const handleFilterClick = (filterId) => setActiveFilter(filterId);
  const handleActivate = (p) => { setSelectedPharmacy(p); setOpenActivate(true); };
  const handleReject = (p) => { setSelectedPharmacy(p); setOpenReject(true); };
  const handleRemove = (p) => { setSelectedPharmacy(p); setOpenRemove(true); };
  const handleSuspend = (p) => { setSelectedPharmacy(p); setOpenSuspend(true); };
  const handleView = (id) => {
    const pharmacy = pharmacies.find(p => p.pharmacy_id === id);
    if (pharmacy) setSelectedPharmacy(pharmacy);
  };

  /* =======================
      FILTERING LOGIC
  ======================= */
  const filteredPharmacies = pharmacies.filter(p => {
    const matchesSearch = p.pharmacy_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'TOTAL' ? true : (p.status === activeFilter || p.pharmacy_type === activeFilter);
    return matchesSearch && matchesCategory;
  });

  const pharmacyTypes = ["COMMUNITY", "HOSPITAL", "CLINICAL", "COMPOUNDING", "ONLINE", "SPECIALTY", "INDUSTRIAL", "GOVERNMENT", "VETERINARY"];
  const actions = [{ label: "Add New Pharmacy", onClick: () => {} }, { label: "Generate Report", onClick: () => {} }];

  return (
    <div className="flex w-full min-h-screen bg-slate-50">
      <div className="flex-1 p-8 pt-4 space-y-4 overflow-y-auto">

        {/* 1. EPIC HEADER */}
        <div className="relative p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm overflow-hidden group">
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#2FA4A9]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#2FA4A9] shadow-lg shadow-[#2FA4A9]/20">
                <Activity size={26} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-[1000] text-[#2FA4A9] tracking-tight uppercase leading-none">Pharmacy Management</h1>
                <p className="text-sm text-slate-500 font-medium mt-2">Monitor, verify, and manage registered pharmacies</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Total" count={pharmacies.length} icon={Activity} isActive={activeFilter === 'TOTAL'} onClick={() => handleFilterClick('TOTAL')} />
          <MetricCard title="Active" count={pharmacies.filter(p => p.status === 'ACTIVE').length} icon={CheckCircle} color="#10B981" isActive={activeFilter === 'ACTIVE'} onClick={() => handleFilterClick('ACTIVE')} />
          <MetricCard title="Pending" count={pharmacies.filter(p => p.status === 'PENDING').length} icon={Clock} color="#F59E0B" isActive={activeFilter === 'PENDING'} onClick={() => handleFilterClick('PENDING')} />
          <MetricCard title="Suspended" count={pharmacies.filter(p => p.status === 'SUSPENDED').length} icon={AlertTriangle} color="#EF4444" isActive={activeFilter === 'SUSPENDED'} onClick={() => handleFilterClick('SUSPENDED')} />
        </div>

        {/* 3. TYPE FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacyTypes.map((t) => (
            <PharmacyTypeCard key={t} type={t} count={pharmacies.filter(p => p.pharmacy_type === t).length} isActive={activeFilter === t} onClick={() => handleFilterClick(t)} />
          ))}
        </div>

        {/* 4. SEARCH BAR & TABLE */}
        <div className="pt-6 border-t border-slate-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-black text-slate-800 capitalize">{activeFilter.toLowerCase()} Pharmacies</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search pharmacies..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#2FA4A9]/10 focus:border-[#2FA4A9] font-bold text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <PharmacyTable pharmacies={filteredPharmacies} loading={loading} onView={handleView} onActivate={handleActivate} onReject={handleReject} onRemove={handleRemove} onSuspend={handleSuspend} />
        </div>

        {/* MODALS */}
        <ActivatePharmacyModal open={openActivate} pharmacy={selectedPharmacy} onClose={() => setOpenActivate(false)} refresh={loadPharmacies} />
        <RejectPharmacyModal open={openReject} pharmacy={selectedPharmacy} onClose={() => setOpenReject(false)} refresh={loadPharmacies} />
        <RemovePharmacyModal open={openRemove} pharmacy={selectedPharmacy} onClose={() => setOpenRemove(false)} refresh={loadPharmacies} />
        <SuspendPharmacyModal open={openSuspend} pharmacy={selectedPharmacy} onClose={() => setOpenSuspend(false)} refresh={loadPharmacies} />
      </div>

      {/* 5. SLIM SIDEBAR (Updated width and padding) */}
      <div className="hidden xl:flex flex-col gap-6 w-[260px] p-6 border-l bg-white h-screen sticky top-0 overflow-y-auto">
        <NotificationPanel notifications={notifications} />
        <QuickActionPanel actions={actions} />
      </div>
    </div>
  );
};

export default PharmacyManagementHome;