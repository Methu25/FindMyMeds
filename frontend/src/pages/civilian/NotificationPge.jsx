import React from "react";
import "../styles/NotificationPage.css";

const CivilianNotifications = () => {
  return (
    <>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <i className="fa-solid fa-pills"></i>
          <span> FindMyMeds</span>
        </div>

        <ul className="menu-list">
          <li>
            <a href="civilian-main.html" className="menu-item">
              <i className="fa-solid fa-house"></i> Home
            </a>
          </li>
          <li>
            <a href="civilian-Reservation-history.html" className="menu-item">
              <i className="fa-solid fa-calendar-check"></i> Your Activities
            </a>
          </li>
          <li>
            <a href="civilian-notifications.html" className="menu-item active">
              <i className="fa-regular fa-bell"></i> Notifications
            </a>
          </li>
          <li>
            <a href="civilian-feedback.html" className="menu-item">
              <i className="fa-regular fa-comment-dots"></i> Appeals & Feedbacks
            </a>
          </li>
          <li>
            <a href="logout.html" className="menu-item logout-btn">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </a>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h2>Notifications</h2>

        {/* Top Metric Cards */}
        <div className="metrics">
          <div className="metric-card">
            <h3>Reservation Notifications</h3>
            <span>3</span>
          </div>
          <div className="metric-card">
            <h3>Appeal Notifications</h3>
            <span>1</span>
          </div>
          <div className="metric-card">
            <h3>Report / Inquiry</h3>
            <span>2</span>
          </div>
          <div className="metric-card">
            <h3>Account / System</h3>
            <span>1</span>
          </div>
        </div>

        {/* Read / Unread */}
        <div className="sub-metrics">
          <div className="metric-card">
            <h3>Unread</h3>
            <span>4</span>
          </div>
          <div className="metric-card">
            <h3>Read</h3>
            <span>3</span>
          </div>
        </div>

        {/* Notification Table */}
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Reservation</td>
              <td>Your reservation has been confirmed</td>
              <td>2025-01-10</td>
              <td>
                <span className="badge unread">Unread</span>
              </td>
              <td>
                <button className="btn">View</button>
              </td>
            </tr>

            <tr>
              <td>Appeal</td>
              <td>Your appeal has been approved</td>
              <td>2025-01-08</td>
              <td>
                <span className="badge read">Read</span>
              </td>
              <td>
                <button className="btn">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
};

export default CivilianNotifications;
