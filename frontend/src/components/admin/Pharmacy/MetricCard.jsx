import React from "react";

const MetricCard = ({ title, count, onClick }) => {
  return (
    <div
      className="bg-white shadow p-4 rounded-lg cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
};

export default MetricCard;
