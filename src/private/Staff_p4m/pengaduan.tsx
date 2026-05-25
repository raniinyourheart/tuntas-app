import React, { useState } from "react";

const Pengaduan: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState("");
  const [dataPengaduan] = useState<any[]>([]); // KOSONG

  const handleSend = () => {
    if (!selectedUnit) {
      alert("Pilih unit tujuan terlebih dahulu!");
      return;
    }
    alert(`Pengaduan berhasil diteruskan ke ${selectedUnit}`);
    setSelectedUnit("");
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10 px-4">
      <div className="w-[1200px] max-w-full">
        
        {/* HEADER */}
        <div className="bg-[#5B6B7C] text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold leading-snug">
            Selamat Datang Di Transformasi Tata Kelola Organisasi:
            Aplikasi Pengelolaan Ketidaksesuaian Polibatam
          </h1>
          <p className="text-sm mt-2 opacity-80">
            👑 Staff P4M - Panel Pengelolaan Pengaduan
          </p>
        </div>

        {/* BUTTON NAVIGASI */}
        <div className="flex gap-4 mt-4">
          <button className="bg-blue-500 text-white px-6 py-2 shadow rounded">
            📝 Pengaduan
          </button>
          <button 
            onClick={() => window.location.href = "/private/staff_p4m/status_pengaduan"}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 shadow rounded transition"
          >
            📊 Status Pengaduan
          </button>
          <button 
            onClick={() => window.location.href = "/private/staff_p4m/laporan"}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 shadow rounded transition"
          >
            📋 Laporan
          </button>
        </div>

        {/* FORM PENGADUAN - 3 KOLOM SEJAJAR */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-5">
          <h2 className="font-bold text-gray-700 mb-3 text-lg">📋 Teruskan Pengaduan ke Unit Terkait</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Kolom Kritik/Pengaduan - READ ONLY (tidak bisa diketik) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kritik / Pengaduan (dari Civitas)</label>
              <textarea
                readOnly
                value="Belum ada data. Data akan tampil dari civitas."
                className="w-full h-24 border border-gray-300 rounded-lg p-2 resize-none text-sm bg-gray-100 text-gray-500 focus:outline-none"
              />
            </div>

            {/* Kolom Unit Tujuan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit Yang Dituju</label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Pilih Unit</option>
                <option value="Unit Akademik">📚 Unit Akademik</option>
                <option value="Unit IT">💻 Unit IT</option>
                <option value="Unit Sarana">🔧 Unit Sarana & Prasarana</option>
                <option value="Unit Keuangan">💰 Unit Keuangan</option>
                <option value="Unit Kemahasiswaan">🎓 Unit Kemahasiswaan</option>
                <option value="Unit P4M">📋 Unit P4M</option>
              </select>
            </div>

            {/* Kolom Tombol - SEKARANG SEJAJAR */}
            <div>
              <button
                onClick={handleSend}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition w-full"
              >
                📤 Teruskan Pengaduan
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-4 p-3 bg-gray-300 rounded-lg text-xs text-gray-600 text-center">
          ⚡ Staff P4M dapat melihat semua pengaduan dari civitas dan meneruskannya ke unit terkait
        </div>

      </div>
    </div>
  );
};

export default Pengaduan;