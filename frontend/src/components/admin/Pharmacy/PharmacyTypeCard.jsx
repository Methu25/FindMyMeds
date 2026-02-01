import React from "react";

const PharmacyTypeCard = ({ type, count, onClick }) => {
  return (
    <div
      className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition"
      onClick={onClick}
    >
      <h4 className="font-medium">{type}</h4>
      <p className="text-xl font-bold">{count}</p>
    </div>
  );
};

export default PharmacyTypeCard;
