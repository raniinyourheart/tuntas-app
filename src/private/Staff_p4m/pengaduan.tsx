import React, { useState } from "react";
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
  const [dataPengaduan] = useState<any[]>([]);

  const handleSend = () => {
    if (!selectedUnit) {
      alert("Pilih unit tujuan terlebih dahulu!");
      return;
    }
    alert(`Pengaduan berhasil diteruskan ke ${selectedUnit}`);
    setSelectedUnit("");
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

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
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

      {/* TAB MENU */}
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

      {/* CONTENT CARD */}
      <div className="mt-6 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-6">

          <h2 className="text-xl font-bold text-slate-700 mb-6">
            📋 Teruskan Pengaduan ke Unit Terkait
          </h2>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

            {/* KOLOM 1 */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Kritik / Pengaduan (dari Civitas)
              </label>

              <textarea
                readOnly
                value="Belum ada data. Data akan tampil dari civitas."
                className="w-full h-28 bg-slate-100 border border-slate-200 rounded-2xl p-3 text-sm text-slate-500 resize-none"
              />
            </div>

            {/* KOLOM 2 */}
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
                <option value="Unit Akademik">📚 Unit Akademik</option>
                <option value="Unit IT">💻 Unit IT</option>
                <option value="Unit Sarana">🔧 Unit Sarana & Prasarana</option>
                <option value="Unit Keuangan">💰 Unit Keuangan</option>
                <option value="Unit Kemahasiswaan">🎓 Unit Kemahasiswaan</option>
                <option value="Unit P4M">📋 Unit P4M</option>
              </select>
            </div>

            {/* KOLOM 3 */}
            <div className="flex flex-col justify-end">
              <button
                onClick={handleSend}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-2"
              >
                📤 Teruskan Pengaduan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 bg-slate-200 rounded-2xl p-4 text-center text-sm text-slate-600 shadow">
        ⚡ Staff P4M dapat melihat semua pengaduan dan meneruskannya ke unit terkait
      </div>

    </div>
  );
};

export default Pengaduan;