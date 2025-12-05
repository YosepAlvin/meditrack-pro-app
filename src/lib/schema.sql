-- Pastikan Anda menggunakan database yang benar
-- USE your_database_name;

-- Tabel untuk pengguna, bisa admin, dokter, atau pasien
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'dokter', 'pasien') NOT NULL,
  `avatar_url` VARCHAR(255)
);

-- Tabel untuk detail dokter, terhubung dengan users
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` VARCHAR(255) PRIMARY KEY,
  `user_id` INT NOT NULL,
  `specialty` VARCHAR(255) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Tabel untuk inventaris obat
CREATE TABLE IF NOT EXISTS `medications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `strength` VARCHAR(50),
  `stock` INT NOT NULL,
  `lowStockThreshold` INT NOT NULL
);

-- Tabel untuk janji temu
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `patientName` VARCHAR(255) NOT NULL,
  `doctorId` VARCHAR(255) NOT NULL,
  `clinic` VARCHAR(255) NOT NULL,
  `appointment_date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `status` ENUM('Terkonfirmasi', 'Menunggu', 'Dibatalkan', 'Selesai', 'Dipanggil') NOT NULL,
  `complaint` TEXT,
  FOREIGN KEY (`doctorId`) REFERENCES `doctors`(`id`)
);

-- Hapus data lama sebelum memasukkan data baru untuk menghindari duplikat
TRUNCATE TABLE `appointments`;
TRUNCATE TABLE `medications`;
TRUNCATE TABLE `doctors`;
TRUNCATE TABLE `users`;


-- Data Awal untuk Users dan Doctors
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `avatar_url`) VALUES
(1, 'Admin Utama', 'admin@example.com', 'admin123', 'admin', 'https://picsum.photos/seed/admin/100/100'),
(2, 'Dr. Wahyu', 'dr.wahyu@example.com', 'dokter123', 'dokter', 'https://picsum.photos/seed/dr-wahyu/100/100'),
(3, 'Dr. Indah', 'dr.indah@example.com', 'dokter123', 'dokter', 'https://picsum.photos/seed/dr-indah/100/100'),
(4, 'Dr. Gunawan', 'dr.gunawan@example.com', 'dokter123', 'dokter', 'https://picsum.photos/seed/dr-gunawan/100/100'),
(5, 'Budi Sanjoyo', 'budi.s@example.com', 'pasien123', 'pasien', 'https://picsum.photos/seed/budi/100/100'),
(6, 'Siti Aminah', 'siti.a@example.com', 'pasien123', 'pasien', 'https://picsum.photos/seed/siti/100/100');

INSERT INTO `doctors` (`id`, `user_id`, `specialty`) VALUES
('dr-wahyu', 2, 'Kardiologi'),
('dr-indah', 3, 'Neurologi'),
('dr-gunawan', 4, 'Pediatri');

-- Data Awal untuk Obat
INSERT INTO `medications` (`id`, `name`, `strength`, `stock`, `lowStockThreshold`) VALUES
(1, 'Parasetamol', '500mg', 150, 50),
(2, 'Amoksisilin', '250mg', 80, 30),
(3, 'Aspirin', '80mg', 200, 50),
(4, 'Ibuprofen', '400mg', 120, 40),
(5, 'Metformin', '500mg', 100, 30),
(6, 'Lisinopril', '10mg', 75, 25),
(7, 'Amlodipine', '5mg', 90, 30),
(8, 'Simvastatin', '20mg', 110, 40),
(9, 'Omeprazole', '20mg', 60, 20),
(10, 'Cefixime', '100mg', 15, 20);

-- Data Awal untuk Janji Temu (gunakan tanggal hari ini dan besok)
INSERT INTO `appointments` (`patientName`, `doctorId`, `clinic`, `appointment_date`, `time`, `status`, `complaint`) VALUES
('Budi Sanjoyo', 'dr-wahyu', 'Kardiologi', CURDATE(), '10:00:00', 'Terkonfirmasi', 'Nyeri dada'),
('Agus Setiawan', 'dr-wahyu', 'Kardiologi', CURDATE(), '13:00:00', 'Menunggu', 'Pusing dan mual'),
('Siti Aminah', 'dr-indah', 'Neurologi', CURDATE(), '11:30:00', 'Terkonfirmasi', 'Sakit kepala sebelah'),
('Dewi Lestari', 'dr-indah', 'Neurologi', CURDATE(), '14:30:00', 'Menunggu', 'Kesemutan di tangan'),
('Hariyanto', 'dr-indah', 'Neurologi', CURDATE(), '09:00:00', 'Menunggu', 'Sulit tidur'),
('Anak dari Eko Prasetyo', 'dr-gunawan', 'Pediatri', CURDATE(), '09:30:00', 'Menunggu', 'Demam dan batuk'),
('Anak dari Fitriani', 'dr-gunawan', 'Pediatri', CURDATE(), '10:30:00', 'Terkonfirmasi', 'Vaksinasi rutin');
