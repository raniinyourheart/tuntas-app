const express = require('express');
const router = express.Router();
const db = require('../config/database');

// ========== CIVITAS (Tidak Perlu Login) ==========

// GET semua laporan
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM laporan ORDER BY tanggal_submit DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST laporan baru (dari Civitas)
router.post('/', (req, res) => {
  const { status_pengirim, isi_laporan, file_path } = req.body;
  const kode_unik = 'LK-' + Date.now();
  
  const sql = 'INSERT INTO laporan (kode_unik, status_pengirim, isi_laporan, file_path) VALUES (?, ?, ?, ?)';
  db.query(sql, [kode_unik, status_pengirim, isi_laporan, file_path || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ 
      message: 'Laporan berhasil dikirim', 
      id: result.insertId, 
      kode_unik 
    });
  });
});

// GET laporan by kode_unik (untuk civitas cek status)
router.get('/kode/:kode_unik', (req, res) => {
  const { kode_unik } = req.params;
  const sql = 'SELECT * FROM laporan WHERE kode_unik = ?';
  db.query(sql, [kode_unik], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Laporan tidak ditemukan' });
    res.json(results[0]);
  });
});

// GET laporan by ID (detail)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM laporan WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Laporan tidak ditemukan' });
    res.json(results[0]);
  });
});


// ========== STAFF P4M (Untuk Pengelolaan Laporan) ==========

// UPDATE distribusi laporan ke unit (Staff P4M)
router.put('/:id/distribusi', (req, res) => {
  const { id } = req.params;
  const { unit_tujuan } = req.body;
  
  if (!unit_tujuan) {
    return res.status(400).json({ error: 'Unit tujuan wajib diisi' });
  }
  
  const sql = 'UPDATE laporan SET unit_tujuan = ?, status = "Distribusi" WHERE id = ?';
  db.query(sql, [unit_tujuan, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Laporan tidak ditemukan' });
    res.json({ message: 'Laporan berhasil didistribusikan', unit_tujuan });
  });
});

// UPDATE status laporan (Staff P4M)
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const allowedStatus = ['Diterima', 'Distribusi', 'Diproses', 'Review Ka-P4M', 'Tindak Lanjut', 'Verifikasi', 'Close', 'Ditolak'];
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ error: 'Status tidak valid' });
  }
  
  const sql = 'UPDATE laporan SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Laporan tidak ditemukan' });
    res.json({ message: 'Status laporan berhasil diupdate', status });
  });
});

// CLOSE laporan (Staff P4M)
router.put('/:id/close', (req, res) => {
  const { id } = req.params;
  const { hasil_kesimpulan } = req.body;
  
  const sql = 'UPDATE laporan SET status = "Close", hasil_kesimpulan = ?, tanggal_selesai = CURDATE() WHERE id = ?';
  db.query(sql, [hasil_kesimpulan || 'Laporan selesai', id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Laporan tidak ditemukan' });
    res.json({ message: 'Laporan ditutup', hasil_kesimpulan: hasil_kesimpulan || 'Laporan selesai' });
  });
});

// OPEN laporan (Staff P4M - kembalikan ke Kepala Unit)
router.put('/:id/open', (req, res) => {
  const { id } = req.params;
  const { komentar } = req.body;
  
  const sql = 'UPDATE laporan SET status = "Tindak Lanjut" WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Laporan tidak ditemukan' });
    res.json({ message: 'Laporan dibuka kembali untuk revisi', komentar: komentar || 'Perlu perbaikan' });
  });
});


// ========== KEPALA UNIT ==========

// UPDATE penyebab dan rencana tindak lanjut (Kepala Unit)
router.put('/:id/penyebab-rtl', (req, res) => {
  const { id } = req.params;
  const { penyebab, rencana_tindak_lanjut } = req.body;
  
  const sql = 'UPDATE laporan SET penyebab = ?, rencana_tindak_lanjut = ?, status = "Review Ka-P4M" WHERE id = ?';
  db.query(sql, [penyebab, rencana_tindak_lanjut, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Laporan tidak ditemukan' });
    res.json({ message: 'Penyebab dan RTL berhasil disimpan' });
  });
});

// UPDATE hasil tindak lanjut (Kepala Unit setelah eksekusi)
router.put('/:id/hasil', (req, res) => {
  const { id } = req.params;
  const { hasil_tindak_lanjut, tanggal_pengerjaan } = req.body;
  
  const sql = 'UPDATE laporan SET hasil_tindak_lanjut = ?, status = "Verifikasi" WHERE id = ?';
  db.query(sql, [hasil_tindak_lanjut, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Laporan tidak ditemukan' });
    res.json({ message: 'Hasil tindak lanjut berhasil dikirim ke Staff P4M' });
  });
});


// ========== KA-P4M ==========

// UPDATE keputusan Ka-P4M (Setujui / Tidak Setujui)
router.put('/:id/keputusan', (req, res) => {
  const { id } = req.params;
  const { keputusan, alasan } = req.body;
  
  if (keputusan === 'Setujui') {
    const sql = 'UPDATE laporan SET status = "Tindak Lanjut" WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usulan disetujui, lanjut ke eksekusi' });
    });
  } else if (keputusan === 'Tidak Setujui') {
    const sql = 'UPDATE laporan SET status = "Revisi", alasan_penolakan = ? WHERE id = ?';
    db.query(sql, [alasan, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usulan tidak disetujui, perlu revisi', alasan });
    });
  } else {
    res.status(400).json({ error: 'Keputusan harus Setujui atau Tidak Setujui' });
  }
});


// ========== FILTER by Unit (untuk Kepala Unit) ==========

// GET laporan by unit_tujuan (Kepala Unit hanya lihat laporan unitnya)
router.get('/unit/:unit', (req, res) => {
  const { unit } = req.params;
  const sql = 'SELECT * FROM laporan WHERE unit_tujuan = ? ORDER BY tanggal_submit DESC';
  db.query(sql, [unit], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;