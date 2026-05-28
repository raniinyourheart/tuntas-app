import React, { useState, useEffect } from "react";
import { ClipboardList, Wrench, Send, FileImage, Calendar, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const Pengerjaan: React.FC = () => {
  // State untuk form
  const [tanggal, setTanggal] = useState<{ [key: number]: string }>({});
  const [uraian, setUraian] = useState<{ [key: number]: string }>({});
  const [gambar, setGambar] = useState<{ [key: number]: File | null }>({});
  const [loading, setLoading] = useState(true);

  // 👇 DIGANTI: dari data dummy jadi state dari backend
  const [dataLaporan, setDataLaporan] = useState<any[]>([]);

  // Sementara hardcode unit (nanti ambil dari login)
  const unitSaya = "Sarana";

  // 👇 TAMBAHAN: ambil data dari backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/laporan/unit/${unitSaya}`);
        const data = await response.json();
        // Filter laporan yang statusnya "Tindak Lanjut" (disetujui Ka-P4M)
        const perluDikerjakan = data.filter((item: any) => item.status === "Tindak Lanjut");
        
        // Mapping data dari backend ke format yang dipakai frontend
        const mappedData = perluDikerjakan.map((item: any) => ({
          id: item.id,
          kritik: item.isi_laporan,
          penyebab: item.penyebab,
          rencana: item.rencana_tindak_lanjut,
          status: item.status === "Tindak Lanjut" ? "Disetujui" : item.status,
          deadline: item.deadline,
          unit: item.unit_tujuan,
          kode_unik: item.kode_unik,
        }));
        setDataLaporan(mappedData);
      } catch (error) {
        console.error('Gagal ambil data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fungsi hitung sisa hari
  const hitungSisaHari = (deadline: string) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getWarnaDeadline = (sisaHari: number | null) => {
    if (sisaHari === null) return "bg-gray-100 text-gray-500 border-gray-200";
    if (sisaHari < 0) return "bg-red-100 text-red-700 border-red-300";
    if (sisaHari === 0) return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  const getIconDeadline = (sisaHari: number | null) => {
    if (sisaHari === null) return <Clock size={14} />;
    if (sisaHari < 0) return <AlertCircle size={14} />;
    if (sisaHari === 0) return <AlertCircle size={14} />;
    return <CheckCircle2 size={14} />;
  };

  const getTeksDeadline = (sisaHari: number | null) => {
    if (sisaHari === null) return "Belum ditentukan";
    if (sisaHari < 0) return `Terlambat ${Math.abs(sisaHari)} hari`;
    if (sisaHari === 0) return "Deadline hari ini!";
    return `Sisa ${sisaHari} hari`;
  };

  // 👇 UBAH: handleSend jadi async dan panggil API
  const handleSend = async (id: number) => {
    if (!tanggal[id] || !uraian[id]) {
      alert("Harap isi tanggal dan uraian hasil tindak lanjut!");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/laporan/${id}/hasil`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hasil_tindak_lanjut: uraian[id],
          tanggal_pengerjaan: tanggal[id]
        })
      });
      
      if (response.ok) {
        alert(`✅ Hasil pengerjaan laporan ID ${id} telah dikirim ke Staff P4M`);
        // Refresh data
        const refreshResponse = await fetch(`http://localhost:5000/api/laporan/unit/${unitSaya}`);
        const refreshData = await refreshResponse.json();
        const perluDikerjakan = refreshData.filter((item: any) => item.status === "Tindak Lanjut");
        const mappedData = perluDikerjakan.map((item: any) => ({
          id: item.id,
          kritik: item.isi_laporan,
          penyebab: item.penyebab,
          rencana: item.rencana_tindak_lanjut,
          status: item.status === "Tindak Lanjut" ? "Disetujui" : item.status,
          deadline: item.deadline,
          unit: item.unit_tujuan,
        }));
        setDataLaporan(mappedData);
        // Reset form untuk laporan yang sudah dikirim
        setTanggal((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
        setUraian((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
        setGambar((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      } else {
        alert("❌ Gagal mengirim hasil pengerjaan");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("❌ Gagal, cek koneksi backend");
    }
  };

  const handleFileChange = (id: number, file: File | null) => {
    setGambar({ ...gambar, [id]: file });
  };

  // 👇 TAMBAHAN: loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Memuat data laporan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER - SAMA PERSIS */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-t-2xl p-6">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">
            Selamat Datang Di Transformasi Tata Kelola Organisasi:
            <br />
            Aplikasi Pengelolaan Ketidaksesuaian Polibatam
          </h1>
          <p className="mt-2 text-slate-200 text-sm flex items-center gap-2">
            <Wrench size={16} /> Kepala Unit - Pengerjaan Tindak Lanjut
          </p>
        </div>

        {/* TAB MENU - SAMA PERSIS */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => (window.location.href = "/private/kepala_unit/pengaduan")}
            className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-xl shadow-md font-medium transition flex items-center gap-2"
          >
            <ClipboardList size={18} />
            Pengaduan
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md font-medium flex items-center gap-2">
            <Wrench size={18} />
            Pengerjaan
          </button>
        </div>

        {/* KONTEN UTAMA - SAMA PERSIS */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px]">
              <thead className="bg-slate-100">
                <tr className="text-sm text-slate-700">
                  <th className="border p-4 text-left">Kritik / Pengaduan</th>
                  <th className="border p-4 text-left">Penyebab</th>
                  <th className="border p-4 text-left">Rencana Tindak Lanjut</th>
                  <th className="border p-4 text-center">Status</th>
                  <th className="border p-4 text-center">Deadline</th>
                  <th className="border p-4 text-left">Aksi (Kepala Unit)</th>
                </tr>
              </thead>
              <tbody>
                {dataLaporan.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-20 text-slate-400">
                      <Wrench size={48} className="mx-auto mb-3 opacity-50" />
                      Belum ada laporan yang perlu dikerjakan
                    </td>
                  </tr>
                ) : (
                  dataLaporan.map((item) => {
                    const sisaHari = hitungSisaHari(item.deadline);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50 transition">
                        {/* Kritik */}
                        <td className="border p-4 align-top">
                          <div className="bg-slate-100 border rounded-xl p-3 min-h-[100px] text-sm">
                            {item.kritik || "(Data dari civitas akan tampil di sini)"}
                          </div>
                          <button className="mt-3 text-xs border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition flex items-center gap-1">
                            <FileImage size={14} />
                            Lihat Dokumen
                          </button>
                        </td>

                        {/* Penyebab (readonly) */}
                        <td className="border p-4 align-top">
                          <div className="bg-slate-50 border rounded-xl p-3 min-h-[100px] text-sm text-slate-600">
                            {item.penyebab || "(Belum diisi)"}
                          </div>
                        </td>

                        {/* RTL (readonly) */}
                        <td className="border p-4 align-top">
                          <div className="bg-slate-50 border rounded-xl p-3 min-h-[100px] text-sm text-slate-600">
                            {item.rencana || "(Belum diisi)"}
                          </div>
                        </td>

                        {/* Status dari Ka-P4M */}
                        <td className="border p-4 text-center align-top">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                            item.status === "Disetujui" 
                              ? "bg-green-100 text-green-700" 
                              : item.status === "Tidak Disetujui"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {item.status === "Disetujui" && <CheckCircle2 size={12} />}
                            {item.status === "Tidak Disetujui" && <AlertCircle size={12} />}
                            {item.status || "Menunggu Review"}
                          </span>
                        </td>

                        {/* Deadline & Sisa Hari */}
                        <td className="border p-4 text-center align-top">
                          <div className={`inline-flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border ${getWarnaDeadline(sisaHari)}`}>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{item.deadline || "-"}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              {getIconDeadline(sisaHari)}
                              <span>{getTeksDeadline(sisaHari)}</span>
                            </div>
                          </div>
                        </td>

                        {/* FORM AKSI */}
                        <td className="border p-4 align-top min-w-[340px]">
                          <div className="space-y-3">
                            {/* Tanggal */}
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                                <Calendar size={12} /> Tanggal Pengerjaan
                              </label>
                              <input
                                type="date"
                                value={tanggal[item.id] || ""}
                                onChange={(e) => setTanggal({ ...tanggal, [item.id]: e.target.value })}
                                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                            </div>

                            {/* Uraian Hasil */}
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                                <ClipboardList size={12} /> Uraian Hasil Tindak Lanjut
                              </label>
                              <textarea
                                value={uraian[item.id] || ""}
                                onChange={(e) => setUraian({ ...uraian, [item.id]: e.target.value })}
                                className="w-full min-h-[80px] border border-slate-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Isi hasil pengerjaan..."
                              />
                            </div>

                            {/* Upload Gambar */}
                            <div>
                              <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                                <FileImage size={12} /> Dokumentasi
                              </label>
                              <div className="flex items-center gap-2">
                                <label className="border border-slate-300 px-3 py-1.5 rounded-lg text-xs cursor-pointer hover:bg-slate-50 bg-white transition flex items-center gap-1">
                                  <FileImage size={14} />
                                  Pilih File
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept=".jpg,.png,.jpeg,.pdf"
                                    onChange={(e) => handleFileChange(item.id, e.target.files?.[0] || null)}
                                  />
                                </label>
                                {gambar[item.id] && <span className="text-xs text-green-600 truncate">✓ {gambar[item.id]?.name}</span>}
                              </div>
                            </div>

                            {/* Tombol SEND */}
                            <button
                              onClick={() => handleSend(item.id)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition shadow-md flex items-center justify-center gap-2 mt-3"
                            >
                              <Send size={16} />
                              Send ke Staff P4M
                            </button>
                          </div>
                        </td>
                       </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER - SAMA PERSIS */}
        <div className="mt-6 bg-slate-200 rounded-xl p-4 text-center text-sm text-slate-600">
          <Wrench size={14} className="inline mr-1" /> Kepala Unit mengisi Tanggal, Uraian Hasil, dan Dokumentasi.
          {dataLaporan.length > 0 && " Perhatikan deadline! Jika terlambat, Staff P4M akan mengirim notifikasi."}
        </div>
      </div>
    </div>
  );
};

export default Pengerjaan;