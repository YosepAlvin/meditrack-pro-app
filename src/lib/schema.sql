-- Skema dasar untuk aplikasi MediTrack Pro

-- Tabel untuk semua pengguna sistem (pasien, dokter, admin)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL, -- Di dunia nyata, ini harus di-hash
  `role` ENUM('pasien', 'dokter', 'admin') NOT NULL,
  `avatar_url` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk data spesifik dokter
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` VARCHAR(255) PRIMARY KEY, -- ID unik berbasis nama, cth: dr-wahyu
  `user_id` INT NOT NULL,
  `specialty` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Tabel untuk janji temu
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `patientName` VARCHAR(255) NOT NULL,
  `doctorId` VARCHAR(255) NOT NULL,
  `clinic` VARCHAR(255) NOT NULL,
  `appointment_date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `status` ENUM('Menunggu', 'Terkonfirmasi', 'Dipanggil', 'Selesai', 'Dibatalkan') NOT NULL DEFAULT 'Menunggu',
  `complaint` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`doctorId`) REFERENCES `doctors`(`id`)
);

-- Tabel untuk inventaris obat
CREATE TABLE IF NOT EXISTS `medications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `strength` VARCHAR(100),
  `stock` INT NOT NULL DEFAULT 0,
  `lowStockThreshold` INT NOT NULL DEFAULT 10,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menambahkan beberapa data awal jika diperlukan

-- Contoh Admin
INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES ('Admin Utama', 'admin@example.com', 'admin123', 'admin');

-- Contoh Dokter 1
INSERT INTO `users` (`name`, `email`, `password`, `role`, `avatar_url`) VALUES ('Dr. Wahyu', 'dr-wahyu@example.com', 'dokter123', 'dokter', 'https://picsum.photos/seed/101/100/100');
SET @wahyu_user_id = LAST_INSERT_ID();
INSERT INTO `doctors` (`id`, `user_id`, `specialty`) VALUES ('dr-wahyu', @wahyu_user_id, 'Spesialis Kardiologi');

-- Contoh Dokter 2
INSERT INTO `users` (`name`, `email`, `password`, `role`, `avatar_url`) VALUES ('Dr. Indah', 'dr-indah@example.com', 'dokter123', 'dokter', 'https://picsum.photos/seed/102/100/100');
SET @indah_user_id = LAST_INSERT_ID();
INSERT INTO `doctors` (`id`, `user_id`, `specialty`) VALUES ('dr-indah', @indah_user_id, 'Spesialis Neurologi');

-- Contoh Janji Temu
INSERT INTO `appointments` (`patientName`, `doctorId`, `clinic`, `appointment_date`, `time`, `status`, `complaint`) VALUES
('Budi Sanjoyo', 'dr-wahyu', 'Kardiologi', CURDATE(), '10:00:00', 'Terkonfirmasi', 'Nyeri dada'),
('Siti Aminah', 'dr-indah', 'Neurologi', CURDATE(), '11:30:00', 'Terkonfirmasi', 'Sakit kepala sebelah'),
('Agus Setiawan', 'dr-wahyu', 'Kardiologi', CURDATE(), '13:00:00', 'Menunggu', 'Pusing dan mual');

-- Contoh Obat
INSERT INTO `medications` (`name`, `strength`, `stock`, `lowStockThreshold`) VALUES
('Parasetamol', '500mg', 150, 50),
('Amoksisilin', '250mg', 80, 30),
('Aspirin', '80mg', 200, 50),
('Ibuprofen', '400mg', 120, 40),
('Metformin', '500mg', 100, 30);
