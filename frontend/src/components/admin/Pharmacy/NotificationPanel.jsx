import React from "react";

const NotificationPanel = ({ notifications }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h3 className="text-gray-600 font-semibold mb-2">Notifications</h3>
      <ul>
        {notifications.map((note) => (
          <li key={note.id} className="border-b py-2 text-sm">
            {note.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
