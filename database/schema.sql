-- Database Schema for FindMyMeds

-- CIVILIAN TABLES

CREATE TABLE civilians (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    nic_number VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255),
    password_hash VARCHAR(255),
    account_status ENUM('ACTIVE', 'TEMP_BANNED', 'PERMANENT_BANNED'),
    temp_ban_count INT DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE civilian_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    civilian_id BIGINT,
    address TEXT,
    date_of_birth DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    created_at DATETIME,
    FOREIGN KEY (civilian_id) REFERENCES civilians(id)
);

CREATE TABLE reservations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reservation_code VARCHAR(255) UNIQUE,
    civilian_id BIGINT,
    pharmacy_id BIGINT,
    status ENUM('PENDING', 'CONFIRMED', 'READY', 'COLLECTED', 'CANCELLED'),
    pickup_date DATE,
    prescription_file VARCHAR(255),
    notes TEXT,
    total_amount DECIMAL(10, 2),
    created_at DATETIME,
    status_changed_at DATETIME,
    FOREIGN KEY (civilian_id) REFERENCES civilians(id)
    -- Foreign key for pharmacy_id added after pharmacies table creation
);

CREATE TABLE reservation_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reservation_id BIGINT,
    medicine_id BIGINT,
    quantity INT,
    unit_price DECIMAL(10, 2),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
    -- Foreign key for medicine_id added after medicines table creation
);

CREATE TABLE civilian_reports_inquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reference_code VARCHAR(255),
    civilian_id BIGINT,
    type ENUM('REPORT', 'INQUIRY'),
    issue_category ENUM('TECHNICAL', 'SERVICE', 'PAYMENT', 'OTHER'),
    priority ENUM('LOW', 'MEDIUM', 'HIGH'),
    title VARCHAR(255),
    description TEXT,
    attachment_path VARCHAR(255),
    status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'),
    created_at DATETIME,
    status_changed_at DATETIME,
    FOREIGN KEY (civilian_id) REFERENCES civilians(id)
);

CREATE TABLE civilian_appeals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    civilian_id BIGINT,
    ban_type ENUM('TEMPORARY', 'PERMANENT'),
    appeal_reason TEXT,
    attachment VARCHAR(255),
    status ENUM('PENDING', 'APPROVED', 'REJECTED'),
    created_at DATETIME,
    resolved_at DATETIME,
    FOREIGN KEY (civilian_id) REFERENCES civilians(id)
);

-- PHARMACY TABLES

CREATE TABLE pharmacies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pharmacy_name VARCHAR(255),
    license_number VARCHAR(255) UNIQUE,
    owner_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    address TEXT,
    latitude DOUBLE,
    longitude DOUBLE;
    operating_hours VARCHAR(255),
    status ENUM('PENDING','ACTIVE','SUSPENDED','REJECTED','REMOVED'),
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at DATETIME,
    created_at DATETIME
);

CREATE TABLE pharmacy_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pharmacy_id BIGINT,
    logo_path VARCHAR(255),
    license_document VARCHAR(255),
    verified BOOLEAN,
    created_at DATETIME,
    FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id)
);

CREATE TABLE pharmacy_inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pharmacy_id BIGINT,
    medicine_id BIGINT,
    available_quantity INT,
    price DECIMAL(10, 2),
    last_updated DATETIME,
    FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id)
    -- Foreign key for medicine_id added after medicines table creation
);

CREATE TABLE pharmacy_reports_inquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pharmacy_id BIGINT,
    type ENUM('REPORT', 'INQUIRY'),
    issue_category ENUM('TECHNICAL', 'SERVICE', 'PAYMENT', 'OTHER'),
    priority ENUM('LOW', 'MEDIUM', 'HIGH'),
    title VARCHAR(255),
    description TEXT,
    attachment VARCHAR(255),
    status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'),
    created_at DATETIME,
    status_changed_at DATETIME,
    FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id)
);

-- ADMIN TABLES

CREATE TABLE admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    role ENUM('ADMIN', 'SUPER_ADMIN'),
    password_hash VARCHAR(255),
    created_at DATETIME
);

CREATE TABLE admin_actions_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_id BIGINT,
    action_type VARCHAR(255),
    target_table VARCHAR(255),
    target_id BIGINT,
    description TEXT,
    created_at DATETIME,
    FOREIGN KEY (admin_id) REFERENCES admins(id)
);

-- SHARED TABLES

CREATE TABLE medicines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    medicine_name VARCHAR(255),
    generic_name VARCHAR(255),
    dosage_form VARCHAR(255),
    strength VARCHAR(255),
    description TEXT,
    created_at DATETIME
);

CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_type ENUM('CIVILIAN', 'PHARMACY', 'ADMIN'),
    user_id BIGINT,
    notification_type ENUM('RESERVATION', 'APPEAL', 'REPORT', 'ACCOUNT', 'SYSTEM'),
    title VARCHAR(255),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME
);

CREATE TABLE rules_regulations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    active BOOLEAN,
    created_at DATETIME
);

CREATE TABLE system_cleanup_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(255),
    record_id BIGINT,
    deleted_at DATETIME,
    reason VARCHAR(255)
);

-- ADDING REMAINING CONSTRAINTS

ALTER TABLE reservations ADD FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id);
ALTER TABLE reservation_items ADD FOREIGN KEY (medicine_id) REFERENCES medicines(id);
ALTER TABLE pharmacy_inventory ADD FOREIGN KEY (medicine_id) REFERENCES medicines(id);
