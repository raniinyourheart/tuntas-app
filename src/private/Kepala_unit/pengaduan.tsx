import React, { useState } from "react";
import { ClipboardList, Wrench, Send, FileImage } from "lucide-react";

const Pengaduan: React.FC = () => {
  // Data kosong - nanti dari backend
  const [dataLaporan] = useState<any[]>([]);

  const [penyebab, setPenyebab] = useState<{ [key: number]: string }>({});
  const [rencana, setRencana] = useState<{ [key: number]: string }>({});

  const handleSend = (id: number) => {
    if (!penyebab[id] || !rencana[id]) {
      alert("Harap isi Penyebab dan Rencana Tindak Lanjut terlebih dahulu!");
      return;
    }
    alert(`Laporan ID ${id} telah dikirim ke Ka-P4M\n\nPenyebab: ${penyebab[id]}\nRencana: ${rencana[id]}`);
  };

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

        {/* TAB MENU - PAKAI LUCIDE */}
        <div className="flex gap-4 mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md font-medium flex items-center gap-2">
            <ClipboardList size={18} />
            Pengaduan
          </button>
          <button
            onClick={() => (window.location.href = "/private/kepala_unit/pengerjaan")}
            className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-xl shadow-md font-medium transition flex items-center gap-2"
          >
            <Wrench size={18} />
            Pengerjaan
          </button>
        </div>

        {/* KONTEN UTAMA */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
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
                  dataLaporan.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      {/* Kritik */}
                      <td className="border p-4 align-top">
                        <div className="bg-slate-100 border rounded-xl p-3 min-h-[100px] text-sm text-slate-700">
                          {item.kritik || "(Data dari civitas akan tampil di sini)"}
                        </div>
                        <button className="mt-3 text-xs border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition flex items-center gap-1">
                          <FileImage size={14} />
                          Lihat Dokumen
                        </button>
                      </td>

                      {/* Penyebab - INPUT */}
                      <td className="border p-4 align-top">
                        <textarea
                          value={penyebab[item.id] || ""}
                          onChange={(e) => setPenyebab({ ...penyebab, [item.id]: e.target.value })}
                          className="w-full min-h-[100px] border border-slate-300 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Isi penyebab ketidaksesuaian..."
                        />
                      </td>

                      {/* Rencana Tindak Lanjut - INPUT */}
                      <td className="border p-4 align-top">
                        <textarea
                          value={rencana[item.id] || ""}
                          onChange={(e) => setRencana({ ...rencana, [item.id]: e.target.value })}
                          className="w-full min-h-[100px] border border-slate-300 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Isi rencana tindak lanjut..."
                        />
                      </td>

                      {/* Aksi - Tombol SEND */}
                      <td className="border p-4 align-top text-center">
                        <button
                          onClick={() => handleSend(item.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-md flex items-center gap-2 mx-auto"
                        >
                          <Send size={16} />
                          Send ke Ka-P4M
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 bg-slate-200 rounded-xl p-4 text-center text-sm text-slate-600">
          Kepala Unit mengisi Penyebab dan Rencana Tindak Lanjut, lalu kirim ke Ka-P4M untuk direview.
        </div>
      </div>
    </div>
  );
};

export default Pengaduan;