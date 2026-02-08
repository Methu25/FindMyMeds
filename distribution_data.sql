-- Add some more Pharmacies to show different statuses
INSERT INTO pharmacy (pharmacy_name, license_number, status, created_at) VALUES
('Pending Pharma 1', 'PEND001', 'PENDING_APPROVAL', NOW()),
('Pending Pharma 2', 'PEND002', 'PENDING_APPROVAL', NOW()),
('Pending Pharma 3', 'PEND003', 'PENDING_APPROVAL', NOW()),
('Suspended Pharma', 'SUSP001', 'SUSPENDED', NOW());

-- Add Admins
INSERT INTO admins (full_name, email, password, role, is_active, created_at) VALUES 
('Deactivated Admin', 'deactive@admin.com', 'hash', 'ADMIN', false, NOW());

-- Add Civilian Appeals to show up in alerts
-- Assuming a 'civilian_appeal' table exists
-- INSERT INTO civilian_appeal (civilian_id, reason, status, created_at) VALUES (@civ_id, 'Unban please', 'PENDING', NOW());
