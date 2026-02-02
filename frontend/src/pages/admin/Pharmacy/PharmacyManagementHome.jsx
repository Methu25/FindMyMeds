import { useEffect, useState } from "react";

/* ===== Components ===== */
import MetricCard from "../../components/admin/Pharmacy/MetricCard";
import NotificationPanel from "../../components/admin/Pharmacy/NotificationPanel";
import PharmacyTable from "../../components/admin/Pharmacy/PharmacyTable";
import PharmacyTypeCard from "../../components/admin/Pharmacy/PharmacyTypeCard";
import QuickActionPanel from "../../components/admin/Pharmacy/QuickActionPanel";

/* ===== Modals ===== */
import ActivatePharmacyModal from "../../components/admin/Pharmacy/ActivatePharmacyModal";
import RejectPharmacyModal from "../../components/admin/Pharmacy/RejectPharmacyModal";
import RemovePharmacyModal from "../../components/admin/Pharmacy/RemovePharmacyModal";
import SuspendPharmacyModal from "../../components/admin/Pharmacy/SuspendPharmacyModal";

/* ===== Services ===== */
import {
  getAllPharmacies,
} from "../../Service/admin/pharmacyService";

const PharmacyManagementHome = () => {
  /* =======================
     STATE
  ======================= */

  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  /* ===== Modal States ===== */
  const [openActivate, setOpenActivate] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openSuspend, setOpenSuspend] = useState(false);

  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  /* =======================
     DATA FETCH
  ======================= */

  useEffect(() => {
    loadPharmacies();
    // Simulate fetching notifications
    setNotifications([
      { id: 1, message: "Pharmacy verification pending for 'City Meds'" },
      { id: 2, message: "License expiration warning: 'HealthPlus'" }
    ]);
  }, []);

  const loadPharmacies = async () => {
    setLoading(true);
    try {
      const response = await getAllPharmacies();
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

  const handleActivate = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setOpenActivate(true);
  };

  const handleReject = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setOpenReject(true);
  };

  const handleRemove = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setOpenRemove(true);
  };

  const handleSuspend = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setOpenSuspend(true);
  };

  const handleView = (id) => {
    console.log("View Pharmacy ID:", id);
    const pharmacy = pharmacies.find(p => p.pharmacy_id === id);
    if (pharmacy) setSelectedPharmacy(pharmacy);
  };

  /* =======================
     RENDER
  ======================= */

  const actions = [
    { label: "Add New Pharmacy", onClick: () => console.log("Add Pharmacy") },
    { label: "Generate Report", onClick: () => console.log("Generate Report") },
    { label: "Review Approvals", onClick: () => console.log("Review Approvals") }
  ];

  return (
    <div className="flex w-full min-h-screen bg-slate-50">

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 p-6 space-y-6">

        {/* ===== PAGE HEADER ===== */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Pharmacy Management
          </h1>
          <p className="text-sm text-slate-500">
            Monitor, verify, and manage registered pharmacies
          </p>
        </div>

        {/* ===== METRICS ===== */}
        <MetricCard pharmacies={pharmacies} loading={loading} />

        {/* ===== FILTER / TYPE ===== */}
        <PharmacyTypeCard pharmacies={pharmacies} loading={loading} />

        {/* ===== TABLE ===== */}
        <PharmacyTable
          pharmacies={pharmacies}
          loading={loading}
          onView={handleView}
          onActivate={handleActivate}
          onReject={handleReject}
          onRemove={handleRemove}
          onSuspend={handleSuspend}
        />

        {/* ===== MODALS ===== */}
        <ActivatePharmacyModal
          open={openActivate}
          pharmacy={selectedPharmacy}
          onClose={() => setOpenActivate(false)}
          refresh={loadPharmacies}
        />

        <RejectPharmacyModal
          open={openReject}
          pharmacy={selectedPharmacy}
          onClose={() => setOpenReject(false)}
          refresh={loadPharmacies}
        />

        <RemovePharmacyModal
          open={openRemove}
          pharmacy={selectedPharmacy}
          onClose={() => setOpenRemove(false)}
          refresh={loadPharmacies}
        />

        <SuspendPharmacyModal
          open={openSuspend}
          pharmacy={selectedPharmacy}
          onClose={() => setOpenSuspend(false)}
          refresh={loadPharmacies}
        />
      </div>

      {/* ===== RIGHT SIDEBAR ===== */}
      <div className="flex flex-col gap-6 w-80 p-6 border-l bg-white">
        <NotificationPanel notifications={notifications} />
        <QuickActionPanel actions={actions} />
      </div>
    </div>
  );
};

export default PharmacyManagementHome;
