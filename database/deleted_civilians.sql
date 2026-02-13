CREATE TABLE deleted_civilians (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    original_civilian_id BIGINT,
    masked_name VARCHAR(255),
    masked_email VARCHAR(255),
    masked_nic VARCHAR(255),
    history_log TEXT,
    deletion_date DATETIME
);