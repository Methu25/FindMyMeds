import React from 'react';
import HomeMetricCard from '../../components/admin/HomeMetricCard';
import HomeReservationChart from '../../components/admin/HomeReservationChart';
import HomeQuickAccess from '../../components/admin/HomeQuickAccess';
import HomeAlertCard from '../../components/admin/HomeAlertCard';
import HomeDistributionCharts from '../../components/admin/HomeDistributionCharts';

const AdminDashboard = () => {
  // Metric data mapped to your Super Admin requirements
  const metricsData = [
    { label: "Total Civilians", value: "12,840", color: "#3b82f6" },
    { label: "Total Admins", value: "10", color: "#ef4444" },       
    { label: "Active Admins", value: "7", color: "#f97316" },       
    { label: "Total Pharmacies", value: "204", color: "#8b5cf6" },  
    { label: "Pending Pharmacy Approval", value: "12", color: "#10b981" }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {metricsData.map((metric, index) => (
          <HomeMetricCard 
            key={index}
            label={metric.label}
            value={metric.value}
            borderColor={metric.color}
          />
        ))}
      </div>

      {/* 2. Middle Section: Large Analytics & Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reservation Analytics Chart */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col">       
          <div className="flex-1 min-h-[350px]">
            <HomeReservationChart />
          </div>
        </div>

        {/* Right Sidebar: Quick Actions & Alerts */}
        <div className="space-y-8 flex flex-col h-full">
           <HomeQuickAccess />
           <HomeAlertCard />
        </div>
      </div>

      {/* 3. Bottom Section: Categorized Distribution Charts */}
      <HomeDistributionCharts />
    </div>
  );
};

export default AdminDashboard;