import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  ClipboardList,
  BarChart3,
  FileText,
  FileSearch,
  Download,
} from "lucide-react";

const Laporan: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 DIGANTI: dari data dummy jadi state dari backend
  const [dataLaporan, setDataLaporan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  // 👇 TAMBAHAN: ambil data dari backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/laporan');
        const data = await response.json();
        // Filter hanya yang status Close
        const laporanClose = data.filter((item: any) => item.status === "Close");
        setDataLaporan(laporanClose);
      } catch (error) {
        console.error('Gagal ambil data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 👇 TAMBAHAN: fungsi export (sementara alert)
  const handleExport = (format: string) => {
    if (dataLaporan.length === 0) {
      alert("Tidak ada data untuk diekspor!");
      return;
    }
    alert(`📊 Ekspor ke ${format} (${dataLaporan.length} data)`);
  };

  // 👇 TAMBAHAN: loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Memuat data laporan...</p>
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
          👑 Staff P4M - Laporan Pengaduan
        </p>
      </div>

      {/* TAB - SAMA PERSIS */}
      <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const isActive = location.pathname.includes(tab.id);

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all shadow-md whitespace-nowrap
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

      {/* CONTENT - SAMA PERSIS */}
      <div className="mt-6 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        {/* EXPORT - DIUBAH Dikit biar bisa export */}
        <div className="flex justify-end gap-4 p-6 border-b text-sm">
          <button 
            onClick={() => handleExport("PDF")}
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Download size={16} />
            PDF
          </button>

          <button 
            onClick={() => handleExport("Excel")}
            className="flex items-center gap-2 text-green-600 hover:underline"
          >
            <Download size={16} />
            Excel
          </button>

          <button 
            onClick={() => handleExport("JPG")}
            className="flex items-center gap-2 text-orange-500 hover:underline"
          >
            <Download size={16} />
            JPG
          </button>
        </div>

        {/* TABLE - SAMA PERSIS */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px] border-collapse">

            {/* HEADER TABLE - SAMA PERSIS */}
            <thead className="bg-slate-100">
              <tr className="text-slate-700 text-sm">
                <th className="border p-4 text-center">No</th>
                <th className="border p-4 text-left">Uraian Ketidaksesuaian</th>
                <th className="border p-4 text-left">Penyebab</th>
                <th className="border p-4 text-left">Rencana Tindak Lanjut</th>
                <th className="border p-4 text-center">Status</th>
                <th className="border p-4 text-left">Hasil Tindak Lanjut</th>
              </tr>
            </thead>

            {/* BODY TABLE - ISI DARI BACKEND */}
            <tbody>

              {dataLaporan.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-20 text-slate-400"
                  >
                    📭 Belum ada data laporan dari backend
                  </td>
                </tr>
              ) : (
                dataLaporan.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">

                    <td className="border p-4 text-center">
                      {index + 1}
                    </td>

                    <td className="border p-4">
                      <div className="bg-slate-50 border rounded-xl p-3 h-28 overflow-auto">
                        {item.isi_laporan || "-"}
                      </div>

                      <button className="mt-4 flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-slate-100 text-sm">
                        <FileSearch size={16} />
                        Lihat Dokumen
                      </button>
                    </td>

                    <td className="border p-4">
                      <div className="bg-slate-50 border rounded-xl p-3 h-28 overflow-auto">
                        {item.penyebab || "-"}
                      </div>
                    </td>

                    <td className="border p-4">
                      <div className="bg-slate-50 border rounded-xl p-3 h-28 overflow-auto">
                        {item.rencana_tindak_lanjut || "-"}
                      </div>
                    </td>

                    <td className="border p-4 text-center">
                      <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                        {item.status || "Close"}
                      </span>
                    </td>

                    <td className="border p-4">
                      <div className="bg-slate-50 border rounded-xl p-3 h-32 text-sm overflow-auto">
                        {item.hasil_tindak_lanjut || "-"}
                      </div>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* FOOTER - SAMA PERSIS */}
      <div className="mt-6 bg-slate-200 rounded-2xl p-4 text-center text-sm text-slate-600 shadow">
        ⚡ Data laporan yang sudah Close akan muncul di sini
      </div>

    </div>
  );
};

export default Laporan;