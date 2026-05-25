import React, { useState } from "react";

interface StatusProps {
  onBackToHome: () => void;
  onNavigateToForm: () => void;
}

const Status: React.FC<StatusProps> = ({ onBackToHome, onNavigateToForm }) => {
  // Data kosong - nanti diisi dari backend
  const [dataPengaduan] = useState<any[]>([]);
  const [selectedGambar, setSelectedGambar] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Diterima": return "bg-blue-100 text-blue-700 border-blue-300";
      case "Diproses": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Selesai": return "bg-green-100 text-green-700 border-green-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen relative py-10 px-4 md:px-8">
      {/* BACKGROUND IMAGE POLIBATAM */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {!imageError ? (
          <img 
            src="/src/zmx/poltek-2.jpg" 
            alt="Polibatam" 
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0a1a3a] to-[#0f2a4a]"></div>
        )}
      </div>

      <div className="max-w-5xl mx-auto relative z-20">
        
        {/* HEADER - TRANSPARAN DENGAN BLUR */}
        <div className="bg-[#5B6B7C]/80 backdrop-blur-sm text-white p-6 rounded-t-lg">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">
            Selamat Datang Di Transformasi Tata Kelola Organisasi:
            Aplikasi Pengelolaan Ketidaksesuaian Polibatam
          </h1>
          <p className="mt-2 text-sm md:text-base">
            Anda dapat memberi masukan, kritik dan/atau pengaduan terkait
            polibatam secara online
          </p>
          
          {/* TOMBOL KEMBALI */}
          <div className="mt-3">
            <button
              onClick={onBackToHome}
              className="text-white/80 hover:text-white text-sm flex items-center gap-1 transition-all duration-300 hover:underline"
            >
              ← kembali ke beranda
            </button>
          </div>
        </div>

        {/* BUTTON FORM & STATUS */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={onNavigateToForm}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center gap-2 shadow rounded transition-all duration-300"
          >
            📝 Form Pengajuan
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 shadow rounded cursor-default">
            🔍 Lihat Status Pengajuan
          </button>
        </div>

        {/* TABEL STATUS - DENGAN BACKGROUND PUTIH TRANSPARAN */}
        <div className="mt-6 border border-gray-300 rounded-lg overflow-hidden bg-white/95 backdrop-blur-sm shadow-xl">
          
          {/* HEADER TABLE */}
          <div className="grid grid-cols-3 border-b border-gray-300 bg-gray-100/80">
            <div className="col-span-2 py-3 px-4 border-r border-gray-300 font-semibold text-gray-700">
              Masukan / Kritik / Saran
            </div>
            <div className="py-3 px-4 text-center font-semibold text-gray-700">
              Status
            </div>
          </div>

          {/* KONTEN KOSONG */}
          {dataPengaduan.length === 0 ? (
            <div className="grid grid-cols-3 min-h-[300px]">
              <div className="col-span-2 border-r border-gray-200 p-4">
                <div className="border border-gray-300 rounded-lg p-3 bg-gray-50/80 min-h-[150px] flex items-center justify-center">
                  <p className="text-gray-500 italic text-center">
                    Belum ada pengaduan<br />
                    <span className="text-sm">Silakan buat pengaduan melalui Form Pengajuan</span>
                  </p>
                </div>
              </div>
              <div className="p-4 flex items-start justify-center">
                <div className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-500 border border-gray-300">
                  -
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {dataPengaduan.map((item) => (
                <div key={item.id} className="grid grid-cols-3">
                  <div className="col-span-2 border-r border-gray-200 p-4">
                    <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 min-h-[100px] flex flex-col justify-between">
                      <p className="text-gray-700">{item.pesan}</p>
                      <button 
                        onClick={() => setSelectedGambar(`Gambar untuk: ${item.pesan}`)}
                        className="border border-gray-400 px-3 py-1 text-sm w-fit rounded mt-3 flex items-center gap-1 hover:bg-gray-200 transition-all duration-300"
                      >
                        🖼 Lihat Gambar
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex items-start justify-center">
                    <div className={`px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL GAMBAR */}
        {selectedGambar && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedGambar(null)}>
            <div className="bg-white rounded-lg p-6 max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-lg mb-3">📷 Detail Gambar</h3>
              <div className="bg-gray-100 p-6 rounded text-center">
                <span className="text-4xl">🖼️</span>
                <p className="mt-2 text-gray-600">{selectedGambar}</p>
<p className="text-xs text-gray-400 mt-2">(Belum ada gambar - nanti terhubung ke backend)</p>
              </div>
              <button 
                onClick={() => setSelectedGambar(null)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Status;