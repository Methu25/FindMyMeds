-- Insert Random Admins
INSERT INTO admins (full_name, email, password, role, is_active, created_at) VALUES
('Super Admin', 'super@admin.com', '$2a$10$wW.wW.wW', 'SUPER_ADMIN', true, NOW()),
('Admin User 1', 'admin1@test.com', '$2a$10$wW.wW.wW', 'ADMIN', true, NOW() - INTERVAL 10 DAY),
('Admin User 2', 'admin2@test.com', '$2a$10$wW.wW.wW', 'ADMIN', true, NOW() - INTERVAL 5 DAY),
('Inactive Admin', 'inactive@test.com', '$2a$10$wW.wW.wW', 'ADMIN', false, NOW() - INTERVAL 20 DAY);

-- Insert Random Civilians (more data)
INSERT INTO civilian (full_name, email, phone, nic_number, account_status, created_at) VALUES 
('Alice Civilian', 'alice@civ.com', '0771112222', '111111111V', 'ACTIVE', NOW() - INTERVAL 2 DAY),
('Bob Targeted', 'bob@civ.com', '0773334444', '222222222V', 'TEMP_BANNED', NOW() - INTERVAL 5 DAY),
('Charlie Bad', 'charlie@civ.com', '0775556666', '333333333V', 'PERMANENT_BANNED', NOW() - INTERVAL 30 DAY);

-- Insert Random Pharmacies
INSERT INTO pharmacy (pharmacy_name, license_number, status, created_at) VALUES
('HealthPlus Pharma', 'LIC001', 'APPROVED', NOW() - INTERVAL 60 DAY),
('City Care Meds', 'LIC002', 'APPROVED', NOW() - INTERVAL 45 DAY),
('Quick Meds', 'LIC003', 'PENDING_APPROVAL', NOW() - INTERVAL 2 DAY),
('Fake Pharmacy', 'LIC004', 'REJECTED', NOW() - INTERVAL 10 DAY);

-- Insert Random Reservations (for graph)
-- Need to check table structure for 'reservation' but assuming common fields
-- You might need to adjust column names based on your entity
-- INSERT INTO reservation (civilian_id, pharmacy_id, reserved_at, status) VALUES ...
