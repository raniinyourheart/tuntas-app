import React, { useState } from "react";
import { CheckCircle2, XCircle, Send, FileImage, AlertCircle } from "lucide-react";

const ProsesKaP4M: React.FC = () => {
  // State untuk form
  const [selectedTindakan, setSelectedTindakan] = useState("");
  const [alasan, setAlasan] = useState("");

  // Data kosong - nanti dari backend
  const [dataLaporan] = useState<any[]>([
    // Nanti diisi dari backend
    // {
    //   id: 1,
    //   kritik: "Toilet lantai 2 rusak...",
    //   penyebab: "Karet flush rusak",
    //   rencana: "Ganti karet flush",
    //   unit: "Unit Sarana",
    //   kepalaUnit: "Budi"
    // }
  ]);

  const handleSend = () => {
    if (!selectedTindakan) {
      alert("Harap pilih tindakan terlebih dahulu!");
      return;
    }
    if (selectedTindakan === "Tidak Setujui" && !alasan) {
      alert("Harap isi alasan mengapa tidak disetujui!");
      return;
    }
    alert(
      `Keputusan telah dikirim ke Kepala Unit\n\n` +
      `Tindakan: ${selectedTindakan}\n` +
      `${selectedTindakan === "Tidak Setujui" ? `Alasan: ${alasan}\n` : ""}` +
      `\nStatus laporan akan diperbarui.`
    );
  };

  const getWarnaTindakan = (tindakan: string) => {
    if (tindakan === "Setujui") return "text-green-600 border-green-400 bg-green-50";
    if (tindakan === "Tidak Setujui") return "text-red-600 border-red-400 bg-red-50";
    return "";
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
            <CheckCircle2 size={16} /> Ka. P4M - Proses Pengaduan
          </p>
        </div>

        {/* KONTEN UTAMA */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px]">
              <thead className="bg-slate-100">
                <tr className="text-sm text-slate-700">
                  <th className="border p-4 text-left min-w-[250px]">Masukan Kritik / Pengaduan</th>
                  <th className="border p-4 text-left min-w-[200px]">Penyebab <span className="text-xs text-slate-400">(Kepala Unit)</span></th>
                  <th className="border p-4 text-left min-w-[200px]">Rencana Tindak Lanjut <span className="text-xs text-slate-400">(Kepala Unit)</span></th>
                  <th className="border p-4 text-center min-w-[150px]">Pilih Tindakan</th>
                  <th className="border p-4 text-left min-w-[250px]">Aksi (Ka. P4M)</th>
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
                  dataLaporan.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      {/* Kritik - READONLY */}
                      <td className="border p-4 align-top">
                        <div className="bg-slate-100 border rounded-xl p-3 min-h-[120px] text-sm text-slate-700">
                          {item.kritik || "(Data dari civitas akan tampil di sini)"}
                        </div>
                        <button className="mt-3 text-xs border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition flex items-center gap-1">
                          <FileImage size={14} />
                          Lihat Dokumen
                        </button>
                      </td>

                      {/* Penyebab - READONLY */}
                      <td className="border p-4 align-top">
                        <div className="bg-slate-50 border rounded-xl p-3 min-h-[120px] text-sm text-slate-600">
                          {item.penyebab || "(Belum diisi oleh Kepala Unit)"}
                        </div>
                      </td>

                      {/* RTL - READONLY */}
                      <td className="border p-4 align-top">
                        <div className="bg-slate-50 border rounded-xl p-3 min-h-[120px] text-sm text-slate-600">
                          {item.rencana || "(Belum diisi oleh Kepala Unit)"}
                        </div>
                      </td>

                      {/* Pilih Tindakan - DROPDOWN */}
                      <td className="border p-4 align-top">
                        <select
                          value={selectedTindakan}
                          onChange={(e) => setSelectedTindakan(e.target.value)}
                          className={`w-full border rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${getWarnaTindakan(selectedTindakan)}`}
                        >
                          <option value="" className="text-gray-500">Pilih Tindakan</option>
                          <option value="Setujui" className="text-green-600">✓ Setujui</option>
                          <option value="Tidak Setujui" className="text-red-600">✗ Tidak Setujui</option>
                        </select>
                        <p className="text-xs text-slate-400 mt-2">
                          {selectedTindakan === "Setujui" && "Kepala Unit akan melanjutkan ke eksekusi"}
                          {selectedTindakan === "Tidak Setujui" && "Berikan alasan, Kepala Unit akan revisi"}
                        </p>
                      </td>

                      {/* Aksi Ka. P4M - INPUT TEXTAREA */}
                      <td className="border p-4 align-top">
                        <textarea
                          value={alasan}
                          onChange={(e) => setAlasan(e.target.value)}
                          className="w-full min-h-[100px] border border-slate-300 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder={
                            selectedTindakan === "Setujui"
                              ? "Isi catatan tambahan (opsional)..."
                              : "Wajib isi alasan mengapa tidak disetujui..."
                          }
                        />
                        {selectedTindakan === "Tidak Setujui" && !alasan && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> Alasan wajib diisi jika tidak setujui
                          </p>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* TOMBOL SEND DI BAWAH */}
          {dataLaporan.length > 0 && (
            <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50">
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium transition shadow-md flex items-center gap-2"
              >
                <Send size={18} />
                Send ke Kepala Unit
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-6 bg-slate-200 rounded-xl p-4 text-center text-sm text-slate-600">
          <CheckCircle2 size={14} className="inline mr-1" /> Ka. P4M menentukan tindakan (Setujui / Tidak Setujui).
          Jika Tidak Setujui, wajib memberikan alasan untuk revisi oleh Kepala Unit.
        </div>
      </div>
    </div>
  );
};

export default ProsesKaP4M;