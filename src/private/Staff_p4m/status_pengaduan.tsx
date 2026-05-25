import React, { useState } from "react";

const StatusPengaduan: React.FC = () => {
  const [dataPengaduan] = useState<any[]>([]);

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10 px-4">
      <div className="w-[1300px] max-w-full">
        
        {/* HEADER */}
        <div className="bg-[#5B6B7C] text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold leading-snug">
            Selamat Datang Di Transformasi Tata Kelola Organisasi:
            Aplikasi Pengelolaan Ketidaksesuaian Polibatam
          </h1>
          <p className="text-sm mt-2 opacity-80">
            👑 Staff P4M - Status dan Tindak Lanjut Pengaduan
          </p>
        </div>

        {/* BUTTON NAVIGASI */}
        <div className="flex gap-4 mt-4">
          <button 
            onClick={() => window.location.href = "/private/staff_p4m/pengaduan"}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 shadow rounded transition"
          >
            📝 Pengaduan
          </button>
          <button className="bg-blue-500 text-white px-6 py-2 shadow rounded">
            📊 Status Pengaduan
          </button>
          <button 
            onClick={() => window.location.href = "/private/staff_p4m/laporan"}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 shadow rounded transition"
          >
            📋 Laporan
          </button>
        </div>

        {/* TABLE STATUS PENGADUAN */}
        <div className="mt-6 border border-gray-400 rounded-lg overflow-hidden bg-white">
          
          {/* HEADER TABLE - 7 KOLOM */}
          <div className="grid grid-cols-7 text-center font-medium border-b border-gray-300 bg-gray-100">
            <div className="border-r border-gray-300 p-3 text-sm">Kritik / Pengaduan</div>
            <div className="border-r border-gray-300 p-3 text-sm">Penyebab</div>
            <div className="border-r border-gray-300 p-3 text-sm">Rencana Tindak Lanjut</div>
            <div className="border-r border-gray-300 p-3 text-sm">Status</div>
            <div className="border-r border-gray-300 p-3 text-sm">Hasil Tindak Lanjut</div>
            <div className="border-r border-gray-300 p-3 text-sm">Recap Pencapaian</div>
            <div className="p-3 text-sm">Export Report</div>
          </div>

          {/* CONTENT - KOSONG */}
          <div className="min-h-[300px]">
            {dataPengaduan.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-3">📭</div>
                <p>Belum ada data pengaduan</p>
                <p className="text-xs mt-1">Data akan tampil setelah civitas mengirim pengaduan</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {dataPengaduan.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-7">
                    <div className="border-r border-gray-200 p-3">
                      <div className="border border-gray-300 rounded p-2 bg-gray-50 min-h-[80px]">
                        <p className="text-sm">{item.kritik}</p>
                        <button className="mt-2 border border-gray-400 px-2 py-1 text-xs rounded flex items-center gap-1 hover:bg-gray-100">
                          🖼 Lihat Dokumen
                        </button>
                      </div>
                    </div>
                    <div className="border-r border-gray-200 p-3">
                      <textarea 
                        placeholder="Isi penyebab..."
                        className="w-full h-20 border border-gray-300 rounded p-2 text-sm resize-none focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="border-r border-gray-200 p-3">
                      <textarea 
                        placeholder="Rencana tindak lanjut..."
                        className="w-full h-20 border border-gray-300 rounded p-2 text-sm resize-none focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="border-r border-gray-200 p-3 flex items-start justify-center">
                      <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                        <option>Diterima</option>
                        <option>Diproses</option>
                        <option>Selesai</option>
                      </select>
                    </div>
                    <div className="border-r border-gray-200 p-3">
                      <div className="border border-gray-300 rounded p-2 bg-gray-50">
                        <p className="text-xs text-gray-500">Tanggal: -</p>
                        <p className="text-sm mt-1">-</p>
                        <button className="mt-2 border border-gray-400 px-2 py-1 text-xs rounded flex items-center gap-1">
                          🖼 Dokumen
                        </button>
                      </div>
                    </div>
                    <div className="border-r border-gray-200 p-3 flex flex-col gap-2 items-center justify-center">
                      <button className="border border-gray-500 px-3 py-1 text-xs rounded hover:bg-gray-100">
                        CLOSE
                      </button>
                      <button className="border border-gray-500 px-3 py-1 text-xs rounded hover:bg-gray-100">
                        OPEN
                      </button>
                    </div>
                    <div className="p-3 flex flex-col gap-2 items-center justify-center">
                      <button className="border border-gray-500 px-3 py-1 text-xs rounded hover:bg-gray-100">
                        📄 PDF
                      </button>
                      <button className="border border-gray-500 px-3 py-1 text-xs rounded hover:bg-gray-100">
                        📊 EXCEL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-300 rounded-lg text-xs text-gray-600 text-center">
          ⚡ Staff P4M dapat mengisi penyebab, rencana tindak lanjut, dan mengubah status pengaduan
        </div>

      </div>
    </div>
  );
};

export default StatusPengaduan;