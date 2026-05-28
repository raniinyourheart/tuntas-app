import React, { useState, useEffect } from "react";
import { ClipboardList, Wrench, Send, FileImage } from "lucide-react";

const Pengaduan: React.FC = () => {
  const [dataLaporan, setDataLaporan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [penyebab, setPenyebab] = useState<{ [key: number]: string }>({});
  const [rencana, setRencana] = useState<{ [key: number]: string }>({});

  const unitSaya = "Sarana";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/laporan/unit/${unitSaya}`);
        const data = await response.json();
        const perluDiisi = data.filter((item: any) => item.status === "Distribusi");
        setDataLaporan(perluDiisi);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSend = async (id: number) => {
    if (!penyebab[id] || !rencana[id]) {
      alert("Harap isi Penyebab dan Rencana Tindak Lanjut terlebih dahulu!");
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/laporan/${id}/penyebab-rtl`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          penyebab: penyebab[id],
          rencana_tindak_lanjut: rencana[id]
        })
      });
      
      if (response.ok) {
        alert(`✅ Laporan ID ${id} telah dikirim ke Ka-P4M`);
        const refresh = await fetch(`http://localhost:5000/api/laporan/unit/${unitSaya}`);
        const refreshData = await refresh.json();
        setDataLaporan(refreshData.filter((item: any) => item.status === "Distribusi"));
        setPenyebab((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
        setRencana((prev) => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      } else {
        alert("❌ Gagal mengirim ke Ka-P4M");
      }
    } catch (error) {
      alert("❌ Gagal, cek koneksi backend");
    }
  };

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
        {/* HEADER */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-t-2xl p-6">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">
            Selamat Datang Di Transformasi Tata Kelola Organisasi:
            <br />
            Aplikasi Pengelolaan Ketidaksesuaian Polibatam
          </h1>
          <p className="mt-2 text-slate-200 text-sm flex items-center gap-2">
            <ClipboardList size={16} /> Kepala Unit - Pengaduan Masuk
          </p>
        </div>

        {/* TAB MENU */}
        <div className="flex gap-4 mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md font-medium flex items-center gap-2">
            <ClipboardList size={18} /> Pengaduan
          </button>
          <button
            onClick={() => (window.location.href = "/private/kepala_unit/pengerjaan")}
            className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-xl shadow-md font-medium transition flex items-center gap-2"
          >
            <Wrench size={18} /> Pengerjaan
          </button>
        </div>

        {/* KONTEN */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-100">
                <tr className="text-sm text-slate-700">
                  <th className="border p-4 text-left">Kritik / Pengaduan</th>
                  <th className="border p-4 text-left">Penyebab</th>
                  <th className="border p-4 text-left">Rencana Tindak Lanjut</th>
                  <th className="border p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataLaporan.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-20 text-slate-400">
                      <ClipboardList size={48} className="mx-auto mb-3 opacity-50" />
                      Belum ada pengaduan yang masuk ke unit Anda
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
                      <td className="border p-4">
                        <textarea
                          value={penyebab[item.id] || ""}
                          onChange={(e) => setPenyebab({ ...penyebab, [item.id]: e.target.value })}
                          className="w-full border rounded-xl p-2 text-sm resize-none"
                          rows={3}
                          placeholder="Isi penyebab..."
                        />
                      </td>
                      <td className="border p-4">
                        <textarea
                          value={rencana[item.id] || ""}
                          onChange={(e) => setRencana({ ...rencana, [item.id]: e.target.value })}
                          className="w-full border rounded-xl p-2 text-sm resize-none"
                          rows={3}
                          placeholder="Isi rencana tindak lanjut..."
                        />
                      </td>
                      <td className="border p-4 text-center">
                        <button
                          onClick={() => handleSend(item.id)}
                          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm"
                        >
                          <Send size={14} /> Send
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
          Kepala Unit mengisi Penyebab dan Rencana Tindak Lanjut
        </div>
      </div>
    </div>
  );
};

export default Pengaduan;