import mysql from 'mysql2/promise';

// Membuat koneksi pool ke database
// Menggunakan pool lebih efisien daripada membuat koneksi baru setiap kali ada query
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true // Penting: Mengembalikan tanggal sebagai string, bukan objek Date
});

export default pool;
