import React from "react";
// import "../styles/NotificationPage.css"; // Commenting out to avoid conflicts

const NotificationPage = () => {
  // Mock Data
  const notifications = [
    { type: 'Reservation', message: 'Your reservation has been confirmed', date: '2025-01-10', status: 'unread' },
    { type: 'Appeal', message: 'Your appeal has been approved', date: '2025-01-08', status: 'read' },
    { type: 'Inquiry', message: 'Pharmacy responded to your inquiry', date: '2025-01-05', status: 'read' },
    { type: 'System', message: 'Welcome to FindMyMeds!', date: '2025-01-01', status: 'read' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Notifications</h1>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-1">Reservation Notifications</h3>
          <span className="text-3xl font-bold text-slate-800">3</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-1">Appeal Notifications</h3>
          <span className="text-3xl font-bold text-slate-800">1</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-1">Report / Inquiry</h3>
          <span className="text-3xl font-bold text-slate-800">2</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-1">Account / System</h3>
          <span className="text-3xl font-bold text-slate-800">1</span>
        </div>
      </div>

      {/* Read / Unread */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <h3 className="text-emerald-800 font-medium mb-1">Unread</h3>
          <span className="text-3xl font-bold text-emerald-900">1</span>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <h3 className="text-gray-600 font-medium mb-1">Read</h3>
          <span className="text-3xl font-bold text-gray-800">3</span>
        </div>
      </div>

      {/* Notification Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="p-4">Type</th>
                <th className="p-4">Message</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notifications.map((notif, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-slate-700">{notif.type}</td>
                  <td className="p-4 text-gray-600">{notif.message}</td>
                  <td className="p-4 text-gray-500 text-sm">{notif.date}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${notif.status === 'unread' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {notif.status.charAt(0).toUpperCase() + notif.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
