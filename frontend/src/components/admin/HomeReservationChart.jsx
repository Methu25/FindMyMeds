import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const ReservationChart = () => {
  const data = {
    labels: Array.from({ length: 15 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        fill: true,
        label: 'Reservations',
        data: [50, 80, 65, 95, 120, 110, 140, 130, 160, 150, 185, 175, 200, 215, 225],
        borderColor: '#2FA4A9',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 280); 
          gradient.addColorStop(0, 'rgba(47, 164, 169, 0.2)');
          gradient.addColorStop(1, 'rgba(47, 164, 169, 0)');
          return gradient;
        },
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#2FA4A9',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { family: 'Inter', size: 14, weight: 'bold' },
        bodyFont: { family: 'Inter', size: 13 },
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { 
          color: '#94a3b8', 
          font: { family: 'Inter', size: 11, weight: '600' },
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9', drawBorder: false },
        ticks: { 
          color: '#94a3b8', 
          font: { family: 'Inter', size: 11, weight: '600' },
          stepSize: 50,
        },
      },
    },
  };

  return (
    // Only the white card and inner chart area
    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-[800] text-slate-800 tracking-tight">30-Day Reservation Volume</h3>
          <p className="text-xs font-semibold text-slate-400">Tracking system usage trends</p>
        </div>
        <span className="text-[10px] font-extrabold bg-[#E0F2F1] text-[#2FA4A9] px-3 py-1.5 rounded-full tracking-widest uppercase">
          Live System Data
        </span>
      </div>

      <div className="h-[260px] w-full"> {/* Adjust height here for perfect alignment */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ReservationChart;