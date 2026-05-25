import React, { useState } from "react";

const Laporan: React.FC = () => {
  const [statusLaporan, setStatusLaporan] = useState<{ [key: number]: string }>({});
  const [komentar, setKomentar] = useState<{ [key: number]: string }>({});

  const handleCloseOpen = (id: number, action: string) => {
    if (action === "CLOSE") {
      setStatusLaporan({ ...statusLaporan, [id]: "CLOSED" });
      alert(`Laporan ID ${id} telah ditutup.`);
    } else if (action === "OPEN") {
      setStatusLaporan({ ...statusLaporan, [id]: "OPEN" });
      const msg = komentar[id] || "Belum sesuai, perlu perbaikan dari Kepala Unit";
      alert(`Laporan ID ${id} dibuka kembali. Catatan: ${msg}`);
    }
  };

  const handleKomentarChange = (id: number, value: string) => {
    setKomentar({ ...komentar, [id]: value });
  };

  // Data kosong - nanti dari backend
  const dataLaporan = [
    { id: 1, uraian: "", penyebab: "", rencana: "", status: "", hasil: "" },
    { id: 2, uraian: "", penyebab: "", rencana: "", status: "", hasil: "" },
  ];

  return (
    <div className="bg-gray-200 min-h-screen py-6 px-4">
      <div className="w-full max-w-full">
        
        {/* HEADER */}
        <div className="bg-[#5B6B7C] text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold leading-snug">
            Selamat Datang Di Transformasi Tata Kelola Organisasi:
            Aplikasi Pengelolaan Ketidaksesuaian Polibatam
          </h1>
          <p className="text-sm mt-2 opacity-80">
            👑 Staff P4M - Laporan Pengaduan
          </p>
        </div>

        {/* BUTTON NAVIGASI - DI BAWAH HEADER */}
        <div className="flex gap-4 mt-4">
          <button 
            onClick={() => window.location.href = "/private/staff_p4m/pengaduan"}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 shadow rounded transition"
          >
            📝 Pengaduan
          </button>
          <button 
            onClick={() => window.location.href = "/private/staff_p4m/status_pengaduan"}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 shadow rounded transition"
          >
            📊 Status Pengaduan
          </button>
          <button className="bg-blue-500 text-white px-6 py-2 shadow rounded">
            📋 Laporan
          </button>
        </div>

        {/* EXPORT */}
        <div className="mt-4 flex justify-end gap-3 text-xs text-blue-600 underline cursor-pointer">
          <span>EXPORT :</span>
          <span>📄 PDF</span>
          <span>📊 Excel</span>
          <span>🖼️ Jpg</span>
        </div>

        {/* TABEL - BISA DI GESER KE SAMPING */}
        <div className="mt-4 border border-gray-400 rounded-lg overflow-x-auto bg-white">
          <div className="min-w-[1000px]">
            
            {/* HEADER TABLE - 7 KOLOM */}
            <div className="grid grid-cols-7 bg-gray-100 text-sm font-semibold border-b border-gray-400">
              <div className="border-r border-gray-300 p-3 text-center">No</div>
              <div className="border-r border-gray-300 p-3">Uraian Ketidaksesuaian</div>
              <div className="border-r border-gray-300 p-3">Penyebab <span className="text-xs font-normal text-gray-500">(Kepala Unit)</span></div>
              <div className="border-r border-gray-300 p-3">Rencana Tindak Lanjut <span className="text-xs font-normal text-gray-500">(Kepala Unit)</span></div>
              <div className="border-r border-gray-300 p-3 text-center">Status <span className="text-xs font-normal text-gray-500">(Ka. P4M)</span></div>
              <div className="border-r border-gray-300 p-3">Hasil Tindak Lanjut <span className="text-xs font-normal text-gray-500">(Kepala Unit)</span></div>
              <div className="p-3 text-center">Recap Pencapaian <span className="text-xs font-normal text-gray-500">(Staff P4M)</span></div>
            </div>

            {/* ROW DATA - KOSONG */}
            {dataLaporan.map((item, idx) => (
              <div key={item.id} className="grid grid-cols-7 border-b border-gray-200 hover:bg-gray-50">
                
                {/* No */}
                <div className="border-r border-gray-200 p-3 text-center text-gray-500">
                  {idx + 1}
                </div>

                {/* Uraian - dari Civitas (readonly) */}
                <div className="border-r border-gray-200 p-3">
                  <textarea
                    readOnly
                    value={item.uraian || "(Data dari civitas akan tampil di sini)"}
                    className="w-full h-20 border border-gray-300 rounded p-2 text-xs bg-gray-100 text-gray-600 resize-none focus:outline-none"
                  />
                  <button className="mt-2 text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-100">
                    🖼 Lihat Dokumen Pendukung
                  </button>
                </div>

                {/* Penyebab - diisi Kepala Unit (readonly untuk Staff P4M) */}
                <div className="border-r border-gray-200 p-3">
                  <textarea
                    readOnly
                    value={item.penyebab || "(Belum diisi oleh Kepala Unit)"}
                    className="w-full h-20 border border-gray-300 rounded p-2 text-xs bg-gray-50 text-gray-500 resize-none focus:outline-none"
                  />
                </div>

                {/* Rencana - diisi Kepala Unit (readonly untuk Staff P4M) */}
                <div className="border-r border-gray-200 p-3">
                  <textarea
                    readOnly
                    value={item.rencana || "(Belum diisi oleh Kepala Unit)"}
                    className="w-full h-20 border border-gray-300 rounded p-2 text-xs bg-gray-50 text-gray-500 resize-none focus:outline-none"
                  />
                </div>

                {/* Status - dari Ka. P4M (readonly untuk Staff P4M) */}
                <div className="border-r border-gray-200 p-3 text-center">
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                    {item.status || "Menunggu"}
                  </span>
                </div>

                {/* Hasil Tindak Lanjut - dari Kepala Unit (readonly) */}
                <div className="border-r border-gray-200 p-3">
                  <div className="border border-gray-300 rounded p-2 bg-gray-50">
                    <p className="text-xs text-gray-400">Tanggal: ___ / ___ / _____</p>
                    <textarea
                      readOnly
                      value={item.hasil || "(Belum ada hasil tindak lanjut)"}
                      className="w-full h-16 border border-gray-200 rounded p-1 text-xs bg-gray-50 text-gray-500 resize-none mt-1 focus:outline-none"
                    />
                    <button className="mt-2 text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-100">
                      📎 Lihat Dokumen
                    </button>
                  </div>
                </div>

                {/* Recap Pencapaian - HANYA CLOSE/OPEN (Staff P4M) */}
                <div className="p-3 flex flex-col gap-2 items-center justify-center">
                  {statusLaporan[item.id] === "CLOSED" ? (
                    <div className="text-center">
                      <span className="text-green-600 text-xs font-semibold">✓ LAPORAN TELAH DITUTUP</span>
                      <button
                        onClick={() => handleCloseOpen(item.id, "OPEN")}
                        className="mt-2 border border-yellow-500 text-yellow-600 px-3 py-1 text-xs rounded hover:bg-yellow-50 w-full"
                      >
                        🔄 OPEN (Revisi)
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => handleCloseOpen(item.id, "CLOSE")}
                        className="border border-green-500 text-green-600 px-4 py-1 text-xs rounded hover:bg-green-50 w-full"
                      >
                        ✅ CLOSE (Selesai)
                      </button>
                      
                      {/* Kolom komentar jika OPEN */}
                      <textarea
                        value={komentar[item.id] || ""}
                        onChange={(e) => handleKomentarChange(item.id, e.target.value)}
                        placeholder="Komentar jika perlu perbaikan..."
                        className="w-full h-16 border border-gray-300 rounded p-1 text-xs mt-2 focus:outline-none focus:border-yellow-500"
                      />
                      
                      <button
                        onClick={() => handleCloseOpen(item.id, "OPEN")}
                        className="border border-yellow-500 text-yellow-600 px-4 py-1 text-xs rounded hover:bg-yellow-50 w-full"
                      >
                        🔄 OPEN (Kembalikan ke Kepala Unit)
                      </button>
                    </>
                  )}
                </div>

              </div>
            ))}

            {/* Row tambahan untuk data kosong */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              <div className="col-span-7 text-center py-10 text-gray-400">
                📭 Data laporan akan tampil di sini
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-4 p-3 bg-gray-300 rounded-lg text-xs text-gray-600 text-center">
          ⚡ Staff P4M hanya dapat CLOSE/OPEN laporan. Jika OPEN, Kepala Unit harus merevisi.
        </div>

      </div>
    </div>
  );
};

export default Laporan;