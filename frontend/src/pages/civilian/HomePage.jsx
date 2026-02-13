import React from "react";
import "../styles/CivilianDashboard.css";
import logo from "../assets/logo2.jpeg";

const CivilianDashboard = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <img src={logo} alt="Logo" style={{ width: "30px", height: "30px" }} />
          <span>Findmymeds</span>
        </div>

        <ul className="menu-list">
          <li>
            <a href="/civilian-main" className="menu-item active">
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </a>
          </li>

          <li>
            <a href="/civilian-main" className="menu-item">
              <i className="fa-solid fa-chart-line"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li>
            <a href="/civilian-reservation-history" className="menu-item">
              <i className="fa-regular fa-calendar-check"></i>
              <span>Your Activities</span>
            </a>
          </li>

          <li>
            <a href="/civilian-notification" className="menu-item">
              <i className="fa-regular fa-bell"></i>
              <span>Notifications</span>
            </a>
          </li>

          <li>
            <a href="/civilian-feedback" className="menu-item">
              <i className="fa-regular fa-comment-dots"></i>
              <span>Appeals & Feedbacks</span>
            </a>
          </li>

          <li>
            <a href="/logout" className="menu-item logout-btn">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        
        {/* HEADER */}
        <header className="header">
          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass" style={{ color: "var(--text-gray)" }}></i>
            <input type="text" placeholder="Search for your medicine..." />
          </div>

          <div className="user-profile">
            <i
              className="fa-regular fa-bell"
              style={{ fontSize: "20px", color: "var(--text-gray)", cursor: "pointer" }}
            ></i>
            <img
              src="https://randomuser.api/portraits/men/32.jpeg"
              alt="Profile"
            />
          </div>
        </header>

        {/* WELCOME BANNER */}
        <section className="welcome-banner">
          <div className="welcome-text">
            <h1>Welcome back, Yash! 👋</h1>
            <p>Find and reserve your essential medications easily today.</p>
          </div>
          <button
            className="reserve-btn"
            onClick={() => window.open("/civilian-medicine-reservation", "_blank")}
          >
            Reserve your medicine
          </button>
        </section>

        {/* DASHBOARD */}
        <div className="dashboard-container">
          
          {/* LEFT GROUP */}
          <div className="left-group">

            <div
              className="card main-card"
              onClick={() => window.open("/civilian-pharmacy-nearby", "_blank")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-header">
                <h3 className="card-title">Pharmacies Nearby</h3>
                <i className="fa-solid fa-map-location-dot card-icon"></i>
              </div>
              <div>
                <div className="stat-value">12</div>
                <p className="stat-label">Open now in your area</p>
              </div>
              <p className="card-footer-text">
                View Map <i className="fa-solid fa-arrow-right"></i>
              </p>
            </div>

            <div className="card main-card">
              <div
                className="card-header"
                onClick={() => window.open("/civilian-drug-dictionary", "_blank")}
                style={{ cursor: "pointer" }}
              >
                <h3 className="card-title">Drug Dictionary</h3>
                <i className="fa-solid fa-book-medical card-icon"></i>
              </div>
              <p className="stat-label">Search & learn about medicines.</p>
              <p className="card-footer-text">
                Start Searching <i className="fa-solid fa-arrow-right"></i>
              </p>
            </div>

            <div
              className="card main-card"
              onClick={() => window.open("/civilian-inquiries", "_blank")}
              style={{ cursor: "pointer" }}
            >
              <div className="card-header">
                <h3 className="card-title">My Inquiries</h3>
                <i className="fa-regular fa-circle-question card-icon"></i>
              </div>
              <div>
                <div className="stat-value">3</div>
                <p className="stat-label">Pending responses</p>
              </div>
            </div>

          </div>

          {/* RIGHT GROUP */}
          <div className="right-group">
            <div className="card highlight-card">
              <div className="card-header">
                <h3 className="card-title">Notifications</h3>
                <i className="fa-regular fa-bell card-icon"></i>
              </div>
            </div>

            <div className="card highlight-card">
              <div className="card-header">
                <h3 className="card-title">Popular Medicines</h3>
                <i className="fa-solid fa-fire card-icon"></i>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

const SearchBar = () => {
  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      const query = event.target.value.toLowerCase().trim();

      if (query.includes("medicine") || query.includes("drug")) {
        window.location.href = "/civilian-drug-dictionary";
      } else if (query.includes("pharmacy") || query.includes("near")) {
        window.location.href = "/civilian-pharmacy-nearby";
      } else {
        alert("No matching results found.");
      }
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for your medicine..."
      onKeyDown={handleSearchKeyDown}
    />
  );
};


export default CivilianDashboard;
