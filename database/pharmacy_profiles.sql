CREATE TABLE pharmacy_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pharmacy_id BIGINT NOT NULL,
    logo_path VARCHAR(255),
    license_document VARCHAR(255),
    created_at DATETIME,
    FOREIGN KEY (pharmacy_id) REFERENCES pharmacy(id)
);