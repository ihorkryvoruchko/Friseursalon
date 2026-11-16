USE schnittpunkt;

INSERT INTO employee (id, name) VALUES
(1, 'Sabine'),
(2, 'Mara'),
(3, 'Jonas');

INSERT INTO service (id, name, duration, price, status) VALUES
(1, 'Herrenschnitt', 30, 28.00, 1),
(2, 'Damenschnitt', 45, 42.00, 1),
(3, 'Waschen & Föhnen', 30, 22.00, 1),
(4, 'Kinderschnitt', 20, 16.00, 1),
(5, 'Bartpflege', 15, 12.00, 1),
(6, 'Färben', 90, 75.00, 1);

INSERT INTO employee_service (employee_id, service_id) VALUES
-- Sabine
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
-- Mara 
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
-- Jonas 
(3, 1), (3, 3), (3, 4), (3, 5);

INSERT INTO client (id, name, phone, email) VALUES (1, 'K. Berger', '015123455', 'k.berger@example.com');

INSERT INTO appointment (id, client_id, employee_id, start_time, end_time, status, cancel_code) VALUES
(1, 1, 1, '2026-11-17 09:00:00', '2026-11-17 10:30:00', 'gebucht', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');

INSERT INTO appointment_service (appointment_id, service_id) VALUES (1, 6); 