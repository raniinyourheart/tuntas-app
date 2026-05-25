import React, { useState } from "react";

export default function Pengerjaan() {
  const [tanggal, setTanggal] = useState("");
  const [uraian, setUraian] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);

  // DATA KOSONG - nanti dari backend
  const [data] = useState({
    kritik: "",
    penyebab: "",
    rencana: "",
    status: ""
  });

  const handleSend = () => {
    if (!tanggal || !uraian) {
      alert("Harap isi tanggal dan uraian hasil tindak lanjut!");
      return;
    }
    alert(`Hasil pengerjaan telah dikirim ke Staff P4M\n\nTanggal: ${tanggal}\nUraian: ${uraian}\nGambar: ${gambar ? gambar.name : "Tidak ada"}`);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      
      {/* BUTTON NAVIGASI */}
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => window.location.href = "/private/kepala_unit/pengaduan"}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 shadow rounded transition"
        >
          📝 Pengaduan
        </button>
        <button className="bg-blue-500 text-white px-6 py-2 shadow rounded">
          🛠️ Pengerjaan
        </button>
      </div>

      {/* HEADER */}
      <div className="bg-slate-600 text-white p-6 border-4 border-blue-500">
        <h1 className="text-lg font-semibold leading-snug">
          Selamat Datang Di Transformasi Tata Kelola Organisasi:
          Aplikasi Pengelolaan Ketidaksesuaian Polibatam
        </h1>
      </div>

      {/* SCROLL CONTAINER */}
      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[1100px] border-2 border-gray-700 bg-white">
          
          {/* HEADER TABLE - 5 KOLOM */}
          <div className="grid grid-cols-[2fr_1fr_1fr_0.7fr_1.8fr] bg-gray-100 text-sm font-semibold border-b-2 border-gray-700 text-center">
            <div className="border-r-2 p-3">Kritik atau Pengaduan Terkait Polibatam</div>
            <div className="border-r-2 p-3">Penyebab</div>
            <div className="border-r-2 p-3">Rencana Tindak Lanjut</div>
            <div className="border-r-2 p-3">Status</div>
            <div className="p-3">Aksi (Kepala Unit)</div>
          </div>

          {/* ROW DATA - KOSONG */}
          <div className="grid grid-cols-[2fr_1fr_1fr_0.7fr_1.8fr]">
            
            {/* Kolom 1: Kritik - READONLY (dari Civitas) */}
            <div className="border-r-2 p-4 align-top">
              <textarea
                readOnly
                value={data.kritik || ""}
                className="w-full min-h-[120px] border-2 border-gray-500 p-2 resize-none bg-gray-100 text-gray-500"
                placeholder="Data dari civitas akan tampil di sini"
              />
              <button className="mt-2 text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-100">
                🖼 Lihat Dokumen Pendukung
              </button>
            </div>

            {/* Kolom 2: Penyebab - READONLY (dari Kepala Unit di halaman pengaduan) */}
            <div className="border-r-2 p-4 align-top">
              <textarea
                readOnly
                value={data.penyebab || ""}
                className="w-full min-h-[120px] border-2 border-gray-500 p-2 resize-none bg-gray-100 text-gray-500"
                placeholder="Belum diisi"
              />
            </div>

            {/* Kolom 3: Rencana Tindak Lanjut - READONLY */}
            <div className="border-r-2 p-4 align-top">
              <textarea
                readOnly
                value={data.rencana || ""}
                className="w-full min-h-[120px] border-2 border-gray-500 p-2 resize-none bg-gray-100 text-gray-500"
                placeholder="Belum diisi"
              />
            </div>

            {/* Kolom 4: Status - READONLY (dari Ka. P4M) */}
            <div className="border-r-2 p-4 flex items-start justify-center">
              <span className="px-3 py-1 rounded text-sm bg-gray-100 text-gray-500">
                {data.status || "Menunggu"}
              </span>
            </div>

            {/* Kolom 5: Aksi Kepala Unit */}
            <div className="p-4 space-y-4">
              {/* Tanggal */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">📅 Tanggal Pengerjaan</label>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full border border-gray-400 rounded p-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Uraian Hasil */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">📝 Uraian Hasil Tindak Lanjut</label>
                <textarea
                  value={uraian}
                  onChange={(e) => setUraian(e.target.value)}
                  className="w-full min-h-[100px] border border-gray-400 rounded p-2 text-sm resize-none focus:outline-none focus:border-blue-500"
                  placeholder="Isi hasil pengerjaan..."
                />
              </div>

              {/* Upload Gambar */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">🖼️ Tambahkan Gambar</label>
                <div className="flex items-center gap-2">
                  <label className="border border-gray-400 px-3 py-2 rounded text-xs cursor-pointer hover:bg-gray-100 bg-white">
                    📎 Pilih File
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg,.png,.jpeg,.pdf"
                      onChange={(e) => setGambar(e.target.files?.[0] || null)}
                    />
                  </label>
                  {gambar && (
                    <span className="text-xs text-green-600 truncate max-w-[150px]">
                      ✓ {gambar.name}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">*JPG, PNG, PDF</p>
              </div>

              {/* Tombol SEND ke Staff P4M */}
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition font-semibold"
              >
                📤 SEND ke Staff P4M
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="mt-3 h-3 bg-gray-300 rounded-full w-full" />

      {/* FOOTER */}
      <div className="mt-4 p-2 bg-gray-300 rounded text-xs text-gray-600 text-center">
        🛠️ Kepala Unit mengisi Tanggal, Uraian Hasil, dan Gambar. Data lainnya akan terisi otomatis dari backend.
      </div>
    </div>
  );
}