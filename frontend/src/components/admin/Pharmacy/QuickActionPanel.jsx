import React from "react";

const QuickActionPanel = ({ actions }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg flex flex-col gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActionPanel;
