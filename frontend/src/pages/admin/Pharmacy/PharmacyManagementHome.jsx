import React, { useState } from "react";
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

  // FIXED: Notifications should be an array for the panel
  const [notifications] = useState([
    { id: 1, message: "5 Pending Pharmacy Approvals" },
    { id: 2, message: "12 New Suspicious Reports" }
  ]);

  const [filteredPharmacies] = useState([]);
  const [role] = useState("ADMIN");

  const handleMetricClick = (status) => console.log("Filter:", status);
  const handleTypeClick = (type) => console.log("Filter Type:", type);
  const handleViewPharmacy = (id) => console.log("View pharmacy:", id);

  // FIXED: Define actions for QuickActionsPanel
  const actions = [
    { label: "Add New Pharmacy", onClick: () => console.log("Add Pharmacy") },
    { label: "Generate Report", onClick: () => console.log("Generate Report") },
    { label: "Review Approvals", onClick: () => console.log("Review Approvals") }
  ];

  return (
    <div className="flex gap-6 h-full">
      <div className="flex-1 p-6 overflow-y-auto">
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

        <PharmacyTable pharmacies={filteredPharmacies} onView={handleViewPharmacy} />
      </div>

      <div className="flex flex-col gap-6 w-80 p-6 border-l bg-white">
        <NotificationPanel notifications={notifications} />
        <QuickActionsPanel actions={actions} />
      </div>
    </div>
  );
};


export default PharmacyManagementHome;
