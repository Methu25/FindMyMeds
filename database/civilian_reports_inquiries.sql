CREATE TABLE civilian_reports_inquiries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reference_code VARCHAR(255),
    civilian_id BIGINT,
    type ENUM('COMPLAINT', 'INQUIRY', 'SUGGESTION'),
    issue_category ENUM('PHARMACY', 'MEDICINE', 'SYSTEM', 'OTHER'),
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'),
    title VARCHAR(255),
    description TEXT,
    attachment_path VARCHAR(255),
    status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'),
    created_at DATETIME,
    status_changed_at DATETIME,
    admin_response TEXT,
    admin_response_attachment VARCHAR(255),
    resolved_at DATETIME,
    rejected_at DATETIME,
    FOREIGN KEY (civilian_id) REFERENCES civilians(id)
);