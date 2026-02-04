import React from "react";

const PharmacyTable = ({ pharmacies, onView, loading }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Address</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Contact</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-400">
                Loading...
              </td>
            </tr>
          ) : pharmacies.length > 0 ? (
            pharmacies.map((pharmacy) => (
              <tr key={pharmacy.id}>
                <td className="px-4 py-2">{pharmacy.pharmacy_id}</td>
                <td className="px-4 py-2">{pharmacy.pharmacy_name}</td>
                <td className="px-4 py-2">{pharmacy.pharmacy_type}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      pharmacy.status === "ACTIVE"
                        ? "bg-green-500"
                        : pharmacy.status === "SUSPENDED"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {pharmacy.status}
                  </span>
                </td>
                <td className="px-4 py-2">{pharmacy.address}</td>
                <td className="px-4 py-2">{pharmacy.contact_number}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => onView(pharmacy.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    View / Manage
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-400">
                No pharmacies to display
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacyTable;
