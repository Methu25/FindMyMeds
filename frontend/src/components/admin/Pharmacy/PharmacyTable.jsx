import React from "react";
import { useNavigate } from "react-router-dom";

/* =======================
   Helper: days until auto delete
======================= */
const getDaysLeft = (deletedAt) => {
  if (!deletedAt) return null;

  const deletedDate = new Date(deletedAt);
  const expiryDate = new Date(deletedDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  const today = new Date();
  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};

const PharmacyTable = ({ pharmacies = [], loading }) => {
  const navigate = useNavigate();

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
              <td colSpan={7} className="text-center py-6 text-gray-400">
                Loading pharmacies...
              </td>
            </tr>
          ) : pharmacies.length > 0 ? (
            pharmacies.map((pharmacy) => {
              const daysLeft =
                pharmacy.status === "REMOVED"
                  ? getDaysLeft(pharmacy.deletedAt)
                  : null;

              return (
                <tr key={pharmacy.pharmacy_id}>
                  <td className="px-4 py-2">{pharmacy.pharmacy_id}</td>

                  <td className="px-4 py-2 font-semibold">
                    {pharmacy.pharmacy_name}
                  </td>

                  <td className="px-4 py-2 uppercase text-sm">
                    {pharmacy.pharmacy_type}
                  </td>

                  <td className="px-4 py-2 space-y-1">
                    {/* Status badge */}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-white text-xs font-bold ${
                        pharmacy.status === "ACTIVE"
                          ? "bg-green-500"
                          : pharmacy.status === "SUSPENDED"
                          ? "bg-yellow-500"
                          : pharmacy.status === "REMOVED"
                          ? "bg-red-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {pharmacy.status}
                    </span>

                    {/* Countdown badge (ONLY for REMOVED) */}
                    {pharmacy.status === "REMOVED" && daysLeft !== null && (
                      <div className="text-[10px] text-red-500 font-bold">
                        Auto delete in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2">{pharmacy.address}</td>

                  <td className="px-4 py-2">{pharmacy.contact_number}</td>

                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/pharmacies/${pharmacy.pharmacy_id}`)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      View / Manage
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-400">
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
