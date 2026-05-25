import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// STAFF P4M
import PengaduanStaff from './private/Staff_p4m/pengaduan';
import StatusPengaduanStaff from './private/Staff_p4m/status_pengaduan';
import LaporanStaff from './private/Staff_p4m/laporan';

// KEPALA UNIT
import PengaduanKepalaUnit from './private/Kepala_unit/pengaduan';
import PengerjaanKepalaUnit from './private/Kepala_unit/pengerjaan';

// KA. P4M (cuma proses)
import ProsesKaP4M from './private/Ka_p4m/proses';

// CIVITAS
import BerandaCivitas from './Civitas/beranda';
import PengaduanCivitas from './Civitas/pengaduan';
import StatusCivitas from './Civitas/status';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== CIVITAS ========== */}
        <Route path="/" element={
          <BerandaCivitas 
            onNavigateToForm={() => window.location.href = '/pengaduan'}
            onNavigateToStatus={() => window.location.href = '/status'}
          />
        } />
        <Route path="/pengaduan" element={
          <PengaduanCivitas 
            onBackToHome={() => window.location.href = '/'}
            onNavigateToStatus={() => window.location.href = '/status'}
          />
        } />
        <Route path="/status" element={
          <StatusCivitas 
            onBackToHome={() => window.location.href = '/'}
            onNavigateToForm={() => window.location.href = '/pengaduan'}
          />
        } />

        {/* ========== STAFF P4M ========== */}
        <Route path="/private/staff_p4m/pengaduan" element={<PengaduanStaff />} />
        <Route path="/private/staff_p4m/status_pengaduan" element={<StatusPengaduanStaff />} />
        <Route path="/private/staff_p4m/laporan" element={<LaporanStaff />} />

        {/* ========== KEPALA UNIT ========== */}
        <Route path="/private/kepala_unit/pengaduan" element={<PengaduanKepalaUnit />} />
        <Route path="/private/kepala_unit/pengerjaan" element={<PengerjaanKepalaUnit />} />

        {/* ========== KA. P4M ========== */}
        <Route path="/private/ka_p4m/proses" element={<ProsesKaP4M />} />

        {/* REDIRECT */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;