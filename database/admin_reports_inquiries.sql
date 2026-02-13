CREATE TABLE admin_reports_inquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    submitted_by_admin_id BIGINT NOT NULL,
    type ENUM('SYSTEM', 'USER', 'PHARMACY', 'OTHER') NOT NULL,
    status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED') DEFAULT 'PENDING',
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') DEFAULT 'MEDIUM',
    category ENUM('TECHNICAL', 'ACCOUNT', 'INQUIRY', 'OTHER') NOT NULL,
    attachments TEXT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    internal_notes TEXT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    resolved_at DATETIME,
    rejected_at DATETIME
);