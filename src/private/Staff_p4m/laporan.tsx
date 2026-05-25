import React from "react";
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

  // EMPTY DATA (backend nanti isi)
  const dataLaporan: any[] = [];

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
          👑 Staff P4M - Laporan Pengaduan
        </p>
      </div>

      {/* TAB */}
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

      {/* CONTENT */}
      <div className="mt-6 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        {/* EXPORT */}
        <div className="flex justify-end gap-4 p-6 border-b text-sm">
          <button className="flex items-center gap-2 text-blue-600 hover:underline">
            <Download size={16} />
            PDF
          </button>

          <button className="flex items-center gap-2 text-green-600 hover:underline">
            <Download size={16} />
            Excel
          </button>

          <button className="flex items-center gap-2 text-orange-500 hover:underline">
            <Download size={16} />
            JPG
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px] border-collapse">

            {/* HEADER TABLE */}
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

            {/* BODY TABLE */}
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
                      <div className="bg-slate-50 border rounded-xl p-3 h-28">
                        {item.uraian}
                      </div>

                      <button className="mt-4 flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-slate-100 text-sm">
                        <FileSearch size={16} />
                        Lihat Dokumen
                      </button>
                    </td>

                    <td className="border p-4">
                      <div className="bg-slate-50 border rounded-xl p-3 h-28">
                        {item.penyebab}
                      </div>
                    </td>

                    <td className="border p-4">
                      <div className="bg-slate-50 border rounded-xl p-3 h-28">
                        {item.rencana}
                      </div>
                    </td>

                    <td className="border p-4 text-center">
                      <span className="bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-sm">
                        -
                      </span>
                    </td>

                    <td className="border p-4">
                      <div className="bg-slate-50 border rounded-xl p-3 h-32 text-sm text-slate-500">
                        -
                      </div>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* FOOTER */}
      <div className="mt-6 bg-slate-200 rounded-2xl p-4 text-center text-sm text-slate-600 shadow">
        ⚡ Halaman ini akan otomatis terisi dari backend
      </div>

    </div>
  );
};

export default Laporan;