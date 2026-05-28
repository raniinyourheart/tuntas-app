const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const laporanRoutes = require('./routes/laporanRoutes');

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend berjalan! 🚀', timestamp: new Date() });
});

// API routes
app.use('/api/laporan', laporanRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route tidak ditemukan' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});