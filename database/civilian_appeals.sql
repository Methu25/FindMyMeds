CREATE TABLE civilian_appeals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    civilian_id BIGINT,
    ban_type ENUM('TEMP', 'PERMANENT'),
    appeal_number INT,
    appeal_reason TEXT,
    attachment VARCHAR(255),
    status ENUM('PENDING', 'APPROVED', 'REJECTED'),
    created_at DATETIME,
    resolved_at DATETIME,
    FOREIGN KEY (civilian_id) REFERENCES civilians(id)
);