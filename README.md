# 💊 FindMyMeds

**FindMyMeds** is a full-stack medicine discovery, inventory management, and prescription reservation platform built to streamline interactions between Civilians (patients), Pharmacies, and System Administrators.

---

## 🌟 Leadership & Roles

- **Project Supervisor & Guidance:** **EJ Yohan Methusael** (`Methu25` / `yohanjason25@gmail.com`) — Project guide, repository lead, and supervisor overseeing the entire development lifecycle and team direction.
- **System Design & Core Developer:** **MTR Mathota** (`coder-chetto` / `thisarirashvini@gmail.com`) — Played the major role from initial system design to core backend/frontend development, civilian reservation services, and notification architecture.

---

## 👥 Project Contributors

Below is the complete list of team members and contributors who built FindMyMeds based on git commit history and key feature areas:

- 👑 **EJ Yohan Methusael (`Methu25` / `METHU25`)** — Project Guidance, Repository Lead, Code Reviews, Routing & Integration Fixes.
- ⚡ **MTR Mathota (`coder-chetto`)** — System Architecture, Core Developer, Civilian Layout, Reservation Module, Notification Center & Activity Pages.
- 📝 **Yashara Gamage (`YasharaGamage` / `Yash2`)** — Reporting & Appeal System, Multi-Role Authentication, Civilian Auth Services & UI.
- ⚙️ **K.U. K. Rakshan (`Rakshan200417`)** — UI Integration, Merge Conflict Resolutions, Build & Artifact Cleanup.
- 📊 **P. Rejishanth (`P.Rejishanth`)** — Pharmacy Analytics, Inventory Management, Database Schema Dumps & Reporting Services.
- 🛠️ **Dumidu (Dumee-25 / KADP Kumarapeli)** — Supporting Feature Development & Backend Integrations.
- 📱 **Gaweesha (`Gaweesha` / `Kumarathunga`)** — Reservation Workflow & DTO Structure Design.
- 💡 **Chamidudayan (`chathuranga`)** — Supporting Frontend Component Enhancements.
- 🔒 **Sanith Sathnidu (`Sanith Sathnidu`)** — Support & Backend Security Module Enhancements.
- 🎨 **Sandil Ranmeth (`rwsrrajasekara`)** — Early Frontend Prototype & Styling Contributions.

---

## 🚀 Key Features

### 👤 Civilian Portal
- **Pharmacy & Medicine Search:** Search medicines by name and find nearby participating pharmacies on interactive maps (Leaflet).
- **Medicine Reservation:** Reserve required medications online directly from local pharmacies.
- **Notifications & History:** Real-time updates on reservation statuses and activity tracking.

### 🏥 Pharmacy Portal
- **Stock & Inventory Management:** Add, update, and manage medicine inventories seamlessly.
- **Reservation Processing:** Manage incoming reservation requests and status updates (Pending, Approved, Rejected, Completed).
- **Analytics & Reporting:** Generate detailed pharmacy reports and stock analytics.

### 🛡️ Admin Portal
- **System Dashboard & User Management:** Oversee pharmacy approvals, civilian user activity, and system settings.
- **Medicine Registry:** Master registry of standardized medicines.
- **Appeals & Reporting Center:** Manage user reports, system logs, and appeal workflows.

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.5.x (Java 21)
- **Security:** Spring Security, JWT (JSON Web Tokens)
- **Database:** MySQL with Spring Data JPA & Hibernate
- **Build Tool:** Maven

### Frontend
- **Framework:** React 18 (Vite 7.x)
- **Styling:** Tailwind CSS v4, Lucide React icons
- **Maps:** Leaflet & React-Leaflet
- **Charts & PDF:** Chart.js, React-Chartjs-2, jsPDF & jsPDF-AutoTable
- **HTTP Client:** Axios with React Router DOM v7

---

## 📁 Repository Structure

```
FindMyMeds/
├── backend/                  # Spring Boot 3 Java Backend
│   ├── src/main/java/        # Controllers, Services, Models, Security Configs
│   ├── src/main/resources/   # Application properties & Data SQL
│   └── pom.xml               # Maven configuration
├── frontend/                 # React + Vite Frontend
│   ├── src/
│   │   ├── API/              # Axios HTTP client configuration
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context (Notifications, Auth)
│   │   ├── pages/            # Civilian, Pharmacy, and Admin pages
│   │   └── services/         # API integration services
│   ├── package.json          # NPM dependencies
│   └── vite.config.js        # Vite config
├── database/                 # SQL DDL & Database Dumps
├── admin_postman_collection.json    # API Testing Collection (Admin)
└── pharmacy_postman_collection.json # API Testing Collection (Pharmacy)
```

---

## ⚙️ Getting Started

### Prerequisites
- **JDK 21** installed
- **Node.js** (v18+ recommended) & npm
- **MySQL Database** running locally or remotely

### 1. Database Setup
1. Create a MySQL database named `findmymeds` (or as configured in `application.properties`).
2. Run initial scripts located in the `database/` directory or let Spring Boot automatically create tables via JPA.

### 2. Backend Setup
```bash
cd backend
# Run Spring Boot application
./mvnw spring-boot:run
```
*Backend will run on `http://localhost:8080` (or `8081` depending on `application.properties`).*

### 3. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install

# Start development server
npm run dev
```
*Frontend will run locally (typically at `http://localhost:5173`).*

---

## 📜 License
This project was developed for educational and community health management purposes.
