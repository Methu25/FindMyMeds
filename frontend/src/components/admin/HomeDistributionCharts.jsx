import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

// Register specific Chart.js components for Pie and Bar charts
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const HomeDistributionCharts = () => {
  // 1. Civilian Distribution (Doughnut)
  const civilianData = {
    labels: ['Active', 'Banned', 'Pending'],
    datasets: [{
      data: [75, 15, 10],
      backgroundColor: ['#2FA4A9', '#ef4444', '#60a5fa'],
      hoverOffset: 4,
      borderWidth: 0,
    }]
  };

  // 2. Pharmacy Health (Bar)
  const pharmacyData = {
    labels: ['Active', 'Pending', 'Suspended'],
    datasets: [{
      label: 'Pharmacies',
      data: [156, 12, 5],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      borderRadius: 8,
      barThickness: 40,
    }]
  };

  // 3. Admin Status (Bar)
  const adminData = {
    labels: ['Active', 'Deactivated', 'Removed'],
    datasets: [{
      label: 'Admins',
      data: [14, 2, 1],
      backgroundColor: ['#8b5cf6', '#cbd5e1', '#1e293b'],
      borderRadius: 8,
      barThickness: 40,
    }]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { usePointStyle: true, padding: 20, font: { size: 11, weight: '600' } }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Civilian Distribution */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[420px]">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Civilian Distribution</h3>
        <div className="flex-1">
          <Doughnut data={civilianData} options={{ ...commonOptions, cutout: '70%' }} />
        </div>
      </div>

      {/* Pharmacy Health */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[420px]">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Pharmacy Health</h3>
        <div className="flex-1">
          <Bar data={pharmacyData} options={commonOptions} />
        </div>
      </div>

      {/* Admin Status */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[420px]">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Admin Status</h3>
        <div className="flex-1">
          <Bar data={adminData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
};

export default HomeDistributionCharts;