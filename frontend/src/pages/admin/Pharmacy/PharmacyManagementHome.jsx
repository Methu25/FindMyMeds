import React, { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import AdminSidebar from "../../../components/admin/HomeAdminSidebar";
import MetricCard from "../../../components/admin/Pharmacy/MetricCard";
import TypeCard from "../../../components/admin/Pharmacy/PharmacyTypeCard";
import PharmacyTable from "../../../components/admin/Pharmacy/PharmacyTable";
import NotificationPanel from "../../../components/admin/Pharmacy/NotificationPanel";
import QuickActionsPanel from "../../../components/admin/Pharmacy/QuickActionPanel";

const PharmacyManagementHome = () => {
  const [metrics] = useState({ total: 124, active: 98, suspended: 26, removed: 10 });
  const pharmacyTypes = [
    "COMMUNITY", "HOSPITAL", "CLINICAL", "COMPOUNDING",
    "ONLINE", "SPECIALTY", "INDUSTRIAL", "GOVERNMENT", "VETERINARY"
  ];
  const [typeCounts] = useState({ COMMUNITY: 20, HOSPITAL: 15, CLINICAL: 10 });
  const [notifications] = useState({ pendingApprovals: 5, newReports: 12 });
  const [filteredPharmacies] = useState([]);
  const [role] = useState("ADMIN"); // Example, fetch from context/session

  const handleMetricClick = (status) => console.log("Filter:", status);
  const handleTypeClick = (type) => console.log("Filter Type:", type);
  const handleViewPharmacy = (id) => console.log("View pharmacy:", id);

  return (
    <AdminLayout>
      <div className="flex gap-6">
        <AdminSidebar activeTab="Pharmacy Management" />

        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Pharmacy Management</h1>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <MetricCard title="Total Pharmacies" count={metrics.total} color="bg-blue-500" onClick={() => handleMetricClick("ALL")} />
            <MetricCard title="Active" count={metrics.active} color="bg-green-500" onClick={() => handleMetricClick("ACTIVE")} />
            <MetricCard title="Suspended" count={metrics.suspended} color="bg-yellow-500" onClick={() => handleMetricClick("SUSPENDED")} />
            <MetricCard title="Removed" count={metrics.removed} color="bg-red-500" onClick={() => handleMetricClick("REMOVED")} />
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {pharmacyTypes.map((type) => (
              <TypeCard key={type} type={type} count={typeCounts[type] || 0} onClick={() => handleTypeClick(type)} />
            ))}
          </div>

          {filteredPharmacies.length > 0 && <PharmacyTable pharmacies={filteredPharmacies} onView={handleViewPharmacy} />}
        </div>

        <div className="flex flex-col gap-6">
          <NotificationPanel notifications={notifications} />
          <QuickActionsPanel role={role} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default PharmacyManagementHome;
