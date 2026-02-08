-- Assumes you have at least one Civilian and one Pharmacy in the database
-- If not, run the dashboard_data_queries.sql first

-- Get IDs for a civilian and a pharmacy (just taking the first ones found)
SET @civ_id = (SELECT id FROM civilian LIMIT 1);
SET @pharma_id = (SELECT id FROM pharmacy LIMIT 1);

-- Insert Reservations for the last 30 days
INSERT INTO reservation (id, civilian_id, pharmacy_id, reservation_date, status, total_amount, created_at) VALUES
(UUID(), @civ_id, @pharma_id, NOW(), 'PENDING', 1500.00, NOW()),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 1 DAY, 'CONFIRMED', 2500.00, NOW() - INTERVAL 1 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 2 DAY, 'COLLECTED', 1200.00, NOW() - INTERVAL 2 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 2 DAY, 'PENDING', 800.00, NOW() - INTERVAL 2 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 3 DAY, 'CANCELLED', 0.00, NOW() - INTERVAL 3 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 5 DAY, 'COLLECTED', 3000.00, NOW() - INTERVAL 5 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 6 DAY, 'CONFIRMED', 4500.00, NOW() - INTERVAL 6 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 7 DAY, 'PENDING', 600.00, NOW() - INTERVAL 7 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 10 DAY, 'COLLECTED', 2200.00, NOW() - INTERVAL 10 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 12 DAY, 'CONFIRMED', 1800.00, NOW() - INTERVAL 12 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 14 DAY, 'COLLECTED', 900.00, NOW() - INTERVAL 14 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 15 DAY, 'PENDING', 5000.00, NOW() - INTERVAL 15 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 18 DAY, 'CANCELLED', 100.00, NOW() - INTERVAL 18 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 20 DAY, 'COLLECTED', 3200.00, NOW() - INTERVAL 20 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 22 DAY, 'CONFIRMED', 1100.00, NOW() - INTERVAL 22 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 25 DAY, 'PENDING', 750.00, NOW() - INTERVAL 25 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 28 DAY, 'COLLECTED', 1900.00, NOW() - INTERVAL 28 DAY),
(UUID(), @civ_id, @pharma_id, NOW() - INTERVAL 29 DAY, 'CONFIRMED', 2100.00, NOW() - INTERVAL 29 DAY);
