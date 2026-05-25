import React, { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  ClipboardList,
  BarChart3,
  FileText,
  FileSearch,
  CheckCircle2,
  RotateCcw,
  Filter,
  Search,
  Bell,
} from "lucide-react";

const StatusPengaduan: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // STATE
  const [statusLaporan, setStatusLaporan] = useState<{
    [key: number]: string;
  }>({});
  const [komentar, setKomentar] = useState<{
    [key: number]: string;
  }>({});
  const [filterStatus, setFilterStatus] = useState<string>("semua");
  const [filterUnit, setFilterUnit] = useState<string>("semua");

  // 🔴 DATA KOSONG (nanti diisi dari backend)
  const [dataLaporan, setDataLaporan] = useState<any[]>([]);

  // DAFTAR UNIT UNTUK FILTER
  const daftarUnit = [
    "semua",
    "Akademik",
    "BMN dan Pengadaan",
    "Career Development Center",
    "Jurusan Elektro",
    "K3L",
    "Kehumasan dan Protokoler",
    "Kemahasiswaan",
    "Kerjasama",
    "P4M",
    "Perencanaan",
    "Perpustakaan",
    "Satgas PPKPT",
    "Shilau",
    "Sub Bagian Umum",
    "UPA PP",
    "UPA TIK",
  ];

  // FUNGSI HITUNG HARI TERSISA
  const hitungHariTersisa = (deadline: string): number => {
    if (!deadline) return 0;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // FUNGSI DAPATKAN WARNA BERDASARKAN HARI TERSISA
  const getWarnaOverdue = (hariTersisa: number): string => {
    if (hariTersisa < 0) return "bg-red-50 border-l-4 border-l-red-500";
    if (hariTersisa <= 2) return "bg-yellow-50 border-l-4 border-l-yellow-500";
    return "";
  };

  // FUNGSI DAPATKAN TEKS HARI
  const getTeksHari = (hariTersisa: number): string => {
    if (hariTersisa < 0) return `⏰ Telat ${Math.abs(hariTersisa)} hari`;
    if (hariTersisa === 0) return "⏰ Deadline hari ini!";
    return `📅 ${hariTersisa} hari lagi`;
  };

  // 🔴 FUNGSI KIRIM NOTIFIKASI KE KEPALA UNIT
  const kirimNotifikasiKeKepalaUnit = (unitTujuan: string, idLaporan: number, judulLaporan: string) => {
    // Simulasi notifikasi (nanti ganti dengan API call ke backend)
    alert(
      `📢 NOTIFIKASI TERKIRIM!\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Kepada: Kepala Unit ${unitTujuan}\n` +
      `Dari: Staff P4M\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `⚠️ Laporan #${idLaporan} "${judulLaporan}"\n` +
      `SUDAH MELEWATI DEADLINE!\n\n` +
      `Mohon segera ditindaklanjuti.\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `(Di sistem nyata, ini bisa kirim email/WA/notifikasi in-app)`
    );
  };

  // FUNGSI DAPATKAN WARNA STATUS
  const getWarnaStatus = (status: string) => {
    switch (status) {
      case "Diterima":
        return "bg-blue-100 text-blue-700";
      case "Distribusi":
        return "bg-purple-100 text-purple-700";
      case "Diproses":
        return "bg-yellow-100 text-yellow-700";
      case "Review Ka-P4M":
        return "bg-indigo-100 text-indigo-700";
      case "Tindak Lanjut":
        return "bg-cyan-100 text-cyan-700";
      case "Close":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // FILTER DATA
  const dataLaporanFiltered = dataLaporan.filter((item) => {
    if (filterStatus !== "semua" && item.status !== filterStatus) return false;
    if (filterUnit !== "semua" && item.unit !== filterUnit) return false;
    return true;
  });

  // HANDLE CLOSE / OPEN
  const handleCloseOpen = (id: number, action: string) => {
    if (action === "CLOSE") {
      setStatusLaporan({ ...statusLaporan, [id]: "CLOSED" });
      alert(`✅ Laporan ID ${id} telah ditutup.`);
    }
    if (action === "OPEN") {
      setStatusLaporan({ ...statusLaporan, [id]: "OPEN" });
      const msg = komentar[id] || "Belum sesuai, perlu perbaikan dari Kepala Unit";
      alert(`🔄 Laporan ID ${id} dibuka kembali.\nCatatan: ${msg}`);
    }
  };

  const handleKomentarChange = (id: number, value: string) => {
    setKomentar({ ...komentar, [id]: value });
  };

  // TAB MENU
  const tabs = [
    { id: "pengaduan", label: "Pengaduan", icon: <ClipboardList size={18} />, path: "/private/staff_p4m/pengaduan" },
    { id: "status_pengaduan", label: "Status Pengaduan", icon: <BarChart3 size={18} />, path: "/private/staff_p4m/status_pengaduan" },
    { id: "laporan", label: "Laporan", icon: <FileText size={18} />, path: "/private/staff_p4m/laporan" },
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
        <p className="mt-3 text-slate-200 text-sm">👑 Staff P4M - Status Pengaduan</p>
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
              ${isActive ? "bg-blue-600 text-white scale-105" : "bg-slate-600 text-white hover:bg-slate-700"}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="mt-6 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-6">
          {/* EXPORT & FILTER */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex gap-4 text-sm text-blue-600">
              <button className="hover:underline">📄 PDF</button>
              <button className="hover:underline">📊 Excel</button>
              <button className="hover:underline">🖼 JPG</button>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
                <Filter size={16} className="text-slate-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-transparent text-sm outline-none cursor-pointer"
                >
                  <option value="semua">Semua Status</option>
                  <option value="Distribusi">Distribusi</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Review Ka-P4M">Review Ka-P4M</option>
                  <option value="Tindak Lanjut">Tindak Lanjut</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
                <Search size={16} className="text-slate-500" />
                <select
                  value={filterUnit}
                  onChange={(e) => setFilterUnit(e.target.value)}
                  className="bg-transparent text-sm outline-none cursor-pointer"
                >
                  {daftarUnit.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit === "semua" ? "Semua Unit" : unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[1600px]">
              <thead className="bg-slate-100">
                <tr className="text-sm text-slate-700">
                  <th className="border p-3 text-center">No</th>
                  <th className="border p-3 text-left">Uraian Ketidaksesuaian</th>
                  <th className="border p-3 text-left">Penyebab <span className="text-xs text-slate-400">(Kepala Unit)</span></th>
                  <th className="border p-3 text-left">Rencana Tindak Lanjut <span className="text-xs text-slate-400">(Kepala Unit)</span></th>
                  <th className="border p-3 text-center">Status</th>
                  <th className="border p-3 text-left">Hasil Tindak Lanjut</th>
                  <th className="border p-3 text-center">Unit Tujuan</th>
                  <th className="border p-3 text-center">Deadline</th>
                  <th className="border p-3 text-center">Sisa Hari & Aksi</th>
                  <th className="border p-3 text-center">Recap Pencapaian</th>
                </tr>
              </thead>
              <tbody>
                {dataLaporanFiltered.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-16 text-slate-400">
                      📭 Belum ada data laporan. Silakan tunggu pengaduan dari Civitas.
                    </td>
                  </tr>
                ) : (
                  dataLaporanFiltered.map((item, idx) => {
                    const hariTersisa = hitungHariTersisa(item.deadline);
                    const warnaOverdue = getWarnaOverdue(hariTersisa);
                    const teksHari = getTeksHari(hariTersisa);
                    const isClosed = statusLaporan[item.id] === "CLOSED";
                    const isOverdue = hariTersisa < 0;

                    return (
                      <tr key={item.id} className={`hover:bg-slate-50 transition ${warnaOverdue}`}>
                        <td className="border p-3 text-center align-top">{idx + 1}</td>
                        <td className="border p-3 align-top">
                          <div className="bg-slate-100 border rounded-xl p-3 min-h-[80px] text-sm">
                            {item.uraian}
                          </div>
                          <button className="mt-2 flex items-center gap-1 border px-2 py-1 rounded-lg text-xs hover:bg-slate-100">
                            <FileSearch size={12} /> Lihat Dokumen
                          </button>
                        </td>
                        <td className="border p-3 align-top">
                          <div className="bg-slate-50 border rounded-xl p-3 min-h-[80px] text-sm">
                            {item.penyebab || "(Belum diisi)"}
                          </div>
                        </td>
                        <td className="border p-3 align-top">
                          <div className="bg-slate-50 border rounded-xl p-3 min-h-[80px] text-sm">
                            {item.rencana || "(Belum diisi)"}
                          </div>
                        </td>
                        <td className="border p-3 text-center align-top">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getWarnaStatus(item.status)}`}>
                            {item.status || "Menunggu"}
                          </span>
                        </td>
                        <td className="border p-3 align-top">
                          <div className="bg-slate-50 border rounded-xl p-2 text-sm min-h-[80px]">
                            <p className="text-xs text-slate-400">Tgl: {item.deadline || "-"}</p>
                            {item.hasil || "(Belum ada)"}
                          </div>
                          <button className="mt-2 flex items-center gap-1 border px-2 py-1 rounded-lg text-xs hover:bg-slate-100">
                            <FileSearch size={12} /> Lihat Dokumen
                          </button>
                        </td>
                        <td className="border p-3 text-center align-top">
                          <span className="bg-slate-100 px-2 py-1 rounded-full text-xs">
                            {item.unit || "-"}
                          </span>
                        </td>
                        <td className="border p-3 text-center align-top font-mono text-sm">
                          {item.deadline || "-"}
                        </td>
                        <td className="border p-3 align-top">
                          <div className="text-center">
                            <span className={`text-xs font-semibold ${hariTersisa < 0 ? "text-red-600" : hariTersisa <= 2 ? "text-yellow-600" : "text-green-600"}`}>
                              {teksHari}
                            </span>
                            {/* 🔴 TOMBOL NOTIFIKASI (hanya muncul jika telat) */}
                            {isOverdue && !isClosed && (
                              <button
                                onClick={() => kirimNotifikasiKeKepalaUnit(item.unit, item.id, item.uraian)}
                                className="mt-2 w-full bg-red-500 text-white text-xs py-1.5 px-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-1"
                              >
                                <Bell size={12} /> Kirim Notifikasi
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="border p-3 align-top min-w-[180px]">
                          {isClosed ? (
                            <div className="space-y-2">
                              <div className="bg-green-100 text-green-700 text-center py-1 rounded-lg text-sm font-semibold">
                                ✓ CLOSED
                              </div>
                              <button
                                onClick={() => handleCloseOpen(item.id, "OPEN")}
                                className="w-full flex items-center justify-center gap-1 border border-yellow-500 text-yellow-600 py-1 rounded-lg text-xs hover:bg-yellow-50"
                              >
                                <RotateCcw size={14} /> OPEN (Revisi)
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button
                                onClick={() => handleCloseOpen(item.id, "CLOSE")}
                                className="w-full flex items-center justify-center gap-1 border border-green-500 text-green-600 py-1 rounded-lg text-xs hover:bg-green-50"
                              >
                                <CheckCircle2 size={14} /> CLOSE (Selesai)
                              </button>
                              <textarea
                                value={komentar[item.id] || ""}
                                onChange={(e) => handleKomentarChange(item.id, e.target.value)}
                                placeholder="Komentar jika perlu revisi..."
                                className="w-full mt-2 border rounded-lg p-2 h-16 text-xs resize-none outline-none focus:ring-1 focus:ring-blue-400"
                              />
                              <button
                                onClick={() => handleCloseOpen(item.id, "OPEN")}
                                className="w-full mt-2 flex items-center justify-center gap-1 border border-yellow-500 text-yellow-600 py-1 rounded-lg text-xs hover:bg-yellow-50"
                              >
                                <RotateCcw size={14} /> OPEN (Kembalikan)
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 bg-slate-200 rounded-2xl p-4 text-center text-sm text-slate-600 shadow">
        ⚡ Staff P4M: CLOSE jika selesai & sesuai | OPEN jika perlu perbaikan dari Kepala Unit
        <br />
        🟢 Normal &nbsp;|&nbsp; 🟡 Mendekati deadline &nbsp;|&nbsp; 🔴 Overdue (tekan tombol notifikasi)
      </div>
    </div>
  );
};

export default StatusPengaduan;