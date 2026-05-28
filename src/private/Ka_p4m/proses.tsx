import React, { useState, useEffect } from "react";
import { CheckCircle2, Send, FileImage, AlertCircle } from "lucide-react";

const ProsesKaP4M: React.FC = () => {
  const [selectedTindakan, setSelectedTindakan] = useState<{ [key: number]: string }>({});
  const [alasan, setAlasan] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [dataLaporan, setDataLaporan] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/laporan');
        const data = await response.json();
        const perluReview = data.filter((item: any) => item.status === "Review Ka-P4M");
        setDataLaporan(perluReview);
      } catch (error) {
        console.error('Gagal ambil data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSend = async (id: number) => {
    const tindakan = selectedTindakan[id];
    if (!tindakan) {
      alert("Harap pilih tindakan terlebih dahulu!");
      return;
    }
    if (tindakan === "Tidak Setujui" && !alasan[id]) {
      alert("Harap isi alasan mengapa tidak disetujui!");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/laporan/${id}/keputusan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keputusan: tindakan,
          alasan: alasan[id] || null
        })
      });
      
      if (response.ok) {
        alert(`✅ Keputusan telah dikirim ke Kepala Unit`);
        const refreshResponse = await fetch('http://localhost:5000/api/laporan');
        const refreshData = await refreshResponse.json();
        const perluReview = refreshData.filter((item: any) => item.status === "Review Ka-P4M");
        setDataLaporan(perluReview);
        setSelectedTindakan({});
        setAlasan({});
      } else {
        alert("❌ Gagal mengirim keputusan");
      }
    } catch (error) {
      alert("❌ Gagal, cek koneksi backend");
    }
  };

  const getWarnaTindakan = (tindakan: string) => {
    if (tindakan === "Setujui") return "text-green-600 border-green-400 bg-green-50";
    if (tindakan === "Tidak Setujui") return "text-red-600 border-red-400 bg-red-50";
    return "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Memuat data usulan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-t-2xl p-6">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">
            Selamat Datang Di Transformasi Tata Kelola Organisasi:
            <br />
            Aplikasi Pengelolaan Ketidaksesuaian Polibatam
          </h1>
          <p className="mt-2 text-slate-200 text-sm flex items-center gap-2">
            <CheckCircle2 size={16} /> Ka. P4M - Proses Pengaduan
          </p>
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px]">
              <thead className="bg-slate-100">
                <tr className="text-sm text-slate-700">
                  <th className="border p-4 text-left">Masukan Kritik / Pengaduan</th>
                  <th className="border p-4 text-left">Penyebab</th>
                  <th className="border p-4 text-left">Rencana Tindak Lanjut</th>
                  <th className="border p-4 text-center">Pilih Tindakan</th>
                  <th className="border p-4 text-left">Aksi (Ka. P4M)</th>
                </tr>
              </thead>
              <tbody>
                {dataLaporan.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-20 text-slate-400">
                      <CheckCircle2 size={48} className="mx-auto mb-3 opacity-50" />
                      Belum ada laporan yang perlu diproses
                    </td>
                  </tr>
                ) : (
                  dataLaporan.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="border p-4 align-top">
                        <div className="bg-slate-100 border rounded-xl p-3 text-sm">
                          {item.isi_laporan || "(Data dari civitas)"}
                        </div>
                        <button className="mt-2 text-xs border px-2 py-1 rounded-lg">
                          <FileImage size={12} /> Lihat Dokumen
                        </button>
                      </td>
                      <td className="border p-4 align-top text-sm">
                        {item.penyebab || "(Belum diisi)"}
                       </td>
                      <td className="border p-4 align-top text-sm">
                        {item.rencana_tindak_lanjut || "(Belum diisi)"}
                       </td>
                      <td className="border p-4 align-top text-center">
                        <select
                          value={selectedTindakan[item.id] || ""}
                          onChange={(e) => setSelectedTindakan({ ...selectedTindakan, [item.id]: e.target.value })}
                          className={`border rounded-lg p-2 text-sm w-40 ${getWarnaTindakan(selectedTindakan[item.id])}`}
                        >
                          <option value="">Pilih Tindakan</option>
                          <option value="Setujui">✓ Setujui</option>
                          <option value="Tidak Setujui">✗ Tidak Setujui</option>
                        </select>
                        <p className="text-xs text-slate-400 mt-1">
                          {selectedTindakan[item.id] === "Setujui" && "Kepala Unit akan eksekusi"}
                          {selectedTindakan[item.id] === "Tidak Setujui" && "Wajib isi alasan"}
                        </p>
                       </td>
                      <td className="border p-4 align-top">
                        <textarea
                          value={alasan[item.id] || ""}
                          onChange={(e) => setAlasan({ ...alasan, [item.id]: e.target.value })}
                          className="w-full border rounded-lg p-2 text-sm resize-none"
                          rows={3}
                          placeholder="Isi alasan..."
                        />
                        {selectedTindakan[item.id] === "Tidak Setujui" && !alasan[item.id] && (
                          <p className="text-xs text-red-500 mt-1">⚠️ Alasan wajib diisi</p>
                        )}
                        <button
                          onClick={() => handleSend(item.id)}
                          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
                        >
                          <Send size={14} /> Kirim
                        </button>
                       </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-slate-200 rounded-xl p-4 text-center text-sm text-slate-600">
          Ka. P4M menentukan tindakan (Setujui / Tidak Setujui)
        </div>
      </div>
    </div>
  );
};

export default ProsesKaP4M;