import React from "react";
// import "../styles/NotificationPage.css"; // Commenting out to avoid conflicts

const NotificationPage = () => {
  const [notifications, setNotifications] = React.useState([]);

  // Mock ID
  const civilianId = 1;

  React.useEffect(() => {
    fetch(`http://localhost:8080/api/civilians/${civilianId}/notifications`)
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error("Failed to fetch notifications", err));
  }, []);

  // Compute stats from real data
  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;
  const reservationCount = notifications.filter(n => n.notificationType === 'RESERVATION_UPDATE').length; // Assuming backend type

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Notifications</h1>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-1">Total Notifications</h3>
          <span className="text-3xl font-bold text-slate-800">{notifications.length}</span>
        </div>
        {/*
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-1">Reservation Notifications</h3>
          <span className="text-3xl font-bold text-slate-800">{reservationCount}</span>
        </div>
        */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-1">Unread</h3>
          <span className="text-3xl font-bold text-emerald-600">{unreadCount}</span>
        </div>
      </div>

      {/* Notification Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No notifications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="p-4">Type</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {notifications.map((notif, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-slate-700">{notif.notificationType}</td>
                    <td className="p-4 font-semibold text-slate-800">{notif.title}</td>
                    <td className="p-4 text-gray-600">{notif.message}</td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${!notif.read ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                        {notif.read ? 'Read' : 'Unread'}
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
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
