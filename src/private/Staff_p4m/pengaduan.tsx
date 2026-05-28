import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  BarChart3,
  FileText,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Pengaduan: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedUnit, setSelectedUnit] = useState("");
  const [dataPengaduan, setDataPengaduan] = useState<any[]>([]);
  const [selectedLaporanId, setSelectedLaporanId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // 👇 TAMBAHAN: ambil data dari backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/laporan');
        const data = await response.json();
        // Filter laporan yang statusnya "Diterima" (belum didistribusi)
        const belumDistribusi = data.filter((item: any) => item.status === "Diterima");
        setDataPengaduan(belumDistribusi);
        // Set default ke laporan pertama kalau ada
        if (belumDistribusi.length > 0) {
          setSelectedLaporanId(belumDistribusi[0].id);
        }
      } catch (error) {
        console.error('Gagal ambil data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 👇 TAMBAHAN: ambil data laporan yang dipilih
  const selectedLaporan = dataPengaduan.find(item => item.id === selectedLaporanId);

  // 👇 UBAH: handleSend jadi async dan panggil API
  const handleSend = async () => {
    if (!selectedUnit) {
      alert("Pilih unit tujuan terlebih dahulu!");
      return;
    }
    if (!selectedLaporanId) {
      alert("Tidak ada laporan yang dipilih!");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/laporan/${selectedLaporanId}/distribusi`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit_tujuan: selectedUnit })
      });
      
      if (response.ok) {
        alert(`✅ Pengaduan berhasil diteruskan ke ${selectedUnit}`);
        // Refresh data
        const refreshResponse = await fetch('http://localhost:5000/api/laporan');
        const refreshData = await refreshResponse.json();
        const belumDistribusi = refreshData.filter((item: any) => item.status === "Diterima");
        setDataPengaduan(belumDistribusi);
        if (belumDistribusi.length > 0) {
          setSelectedLaporanId(belumDistribusi[0].id);
        } else {
          setSelectedLaporanId(null);
        }
        setSelectedUnit("");
      } else {
        alert("❌ Gagal meneruskan pengaduan");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("❌ Gagal, cek koneksi backend");
    }
  };

  const tabs = [
    {
      id: "pengaduan",
      label: "Pengaduan",
      icon: <ClipboardList size={18} />,
      path: "/private/staff_p4m/pengaduan",
    },
    {
      id: "status",
      label: "Status Pengaduan",
      icon: <BarChart3 size={18} />,
      path: "/private/staff_p4m/status_pengaduan",
    },
    {
      id: "laporan",
      label: "Laporan",
      icon: <FileText size={18} />,
      path: "/private/staff_p4m/laporan",
    },
  ];

  // 👇 TAMBAHAN: loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Memuat data pengaduan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER - SAMA PERSIS */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold leading-snug">
          Selamat Datang Di Transformasi Tata Kelola Organisasi:
          <br />
          Aplikasi Pengelolaan Ketidaksesuaian Polibatam
        </h1>
        <p className="mt-3 text-slate-200 text-sm">
          👑 Staff P4M - Panel Pengelolaan Pengaduan
        </p>
      </div>

      {/* TAB MENU - SAMA PERSIS */}
      <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 shadow-md whitespace-nowrap
              ${
                isActive
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-slate-600 text-white hover:bg-slate-700"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* CONTENT CARD - SAMA PERSIS */}
      <div className="mt-6 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-6">

          <h2 className="text-xl font-bold text-slate-700 mb-6">
            📋 Teruskan Pengaduan ke Unit Terkait
          </h2>

          {/* TAMBAHAN: Pilih Laporan (jika ada banyak) */}
          {dataPengaduan.length > 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Pilih Pengaduan
              </label>
              <select
                value={selectedLaporanId || ""}
                onChange={(e) => setSelectedLaporanId(Number(e.target.value))}
                className="w-full border border-slate-200 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              >
                {dataPengaduan.map((item) => (
                  <option key={item.id} value={item.id}>
                    ID: {item.id} - {item.isi_laporan?.substring(0, 50)}...
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* FORM GRID - SAMA PERSIS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

            {/* KOLOM 1 - ISI DARI BACKEND */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Kritik / Pengaduan (dari Civitas)
              </label>

              <textarea
                readOnly
                value={selectedLaporan?.isi_laporan || "Belum ada data. Data akan tampil dari civitas."}
                className="w-full h-28 bg-slate-100 border border-slate-200 rounded-2xl p-3 text-sm text-slate-500 resize-none"
              />
            </div>

            {/* KOLOM 2 - DAFTAR UNIT LENGKAP */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Unit Yang Dituju
              </label>

              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl p-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Pilih Unit</option>
                <option value="Akademik">📚 Unit Akademik</option>
                <option value="BMN dan Pengadaan">📦 BMN dan Pengadaan</option>
                <option value="Career Development Center">💼 CDC</option>
                <option value="Jurusan Elektro">⚡ Jurusan Elektro</option>
                <option value="K3L">🛡️ K3L</option>
                <option value="Kehumasan dan Protokoler">📢 Kehumasan</option>
                <option value="Kemahasiswaan">🎓 Kemahasiswaan</option>
                <option value="Kerjasama">🤝 Kerjasama</option>
                <option value="P4M">📋 P4M</option>
                <option value="Perencanaan">📐 Perencanaan</option>
                <option value="Perpustakaan">📚 Perpustakaan</option>
                <option value="Satgas PPKPT">🚨 Satgas PPKPT</option>
                <option value="Shilau">💻 Shilau</option>
                <option value="Sub Bagian Umum">📁 Sub Bagian Umum</option>
                <option value="UPA PP">🏢 UPA PP</option>
                <option value="UPA TIK">💻 UPA TIK</option>
              </select>
            </div>

            {/* KOLOM 3 - TOMBOL SEND */}
            <div className="flex flex-col justify-end">
              <button
                onClick={handleSend}
                disabled={!selectedLaporanId || dataPengaduan.length === 0}
                className={`w-full py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-2
                  ${!selectedLaporanId || dataPengaduan.length === 0 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              >
                📤 Teruskan Pengaduan
              </button>
            </div>
          </div>

          {/* TAMBAHAN: info jumlah antrian */}
          {dataPengaduan.length > 0 && (
            <p className="text-xs text-slate-400 mt-4">
              📋 Menampilkan {dataPengaduan.length} pengaduan yang menunggu didistribusikan
            </p>
          )}
        </div>
      </div>

      {/* FOOTER - SAMA PERSIS */}
      <div className="mt-6 bg-slate-200 rounded-2xl p-4 text-center text-sm text-slate-600 shadow">
        ⚡ Staff P4M dapat melihat semua pengaduan dan meneruskannya ke unit terkait
      </div>

    </div>
  );
};

export default Pengaduan;