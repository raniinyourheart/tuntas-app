import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Search,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Building,
  FileImage,
  Calendar,
  Mail,
  Send,
  PlusCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";

interface StatusProps {
  onBackToHome: () => void;
  onNavigateToForm: () => void;
}

interface Pengaduan {
  id: number;
  judul: string;
  pesan: string;
  status: string;
  statusDetail: string;
  hasilPenyelesaian?: string;
  alasanPenolakan?: string;
  targetSelesai?: string;
  unitTujuan?: string;
  tanggalSubmit: string;
  gambar?: string;
}

const Status: React.FC<StatusProps> = ({ onBackToHome, onNavigateToForm }) => {
  const [dataPengaduan] = useState<Pengaduan[]>([]);
  const [selectedPengaduan, setSelectedPengaduan] = useState<Pengaduan | null>(
    null
  );
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Diterima":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Distribusi":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "Diproses":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Review Ka-P4M":
        return "bg-indigo-100 text-indigo-700 border-indigo-300";
      case "Revisi":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "Tindak Lanjut":
        return "bg-cyan-100 text-cyan-700 border-cyan-300";
      case "Verifikasi":
        return "bg-pink-100 text-pink-700 border-pink-300";
      case "Close":
        return "bg-green-100 text-green-700 border-green-300";
      case "Ditolak":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Diterima":
        return <Mail size={14} />;
      case "Distribusi":
        return <Send size={14} />;
      case "Diproses":
        return <Clock size={14} />;
      case "Review Ka-P4M":
        return <Eye size={14} />;
      case "Revisi":
        return <PlusCircle size={14} />;
      case "Tindak Lanjut":
        return <CheckCircle size={14} />;
      case "Verifikasi":
        return <Eye size={14} />;
      case "Close":
        return <CheckCircle size={14} />;
      case "Ditolak":
        return <XCircle size={14} />;
      default:
        return <FileText size={14} />;
    }
  };

  const handleLihatDetail = (pengaduan: Pengaduan) => {
    setSelectedPengaduan(pengaduan);
  };

  const closeModal = () => {
    setSelectedPengaduan(null);
  };

  return (
    <div className="min-h-screen relative py-10 px-4 md:px-8">
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

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="bg-[#5B6B7C]/80 backdrop-blur-sm text-white p-6 rounded-t-lg">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">
            Selamat Datang Di Transformasi Tata Kelola Organisasi:
            Aplikasi Pengelolaan Ketidaksesuaian Polibatam
          </h1>
          <p className="mt-2 text-sm md:text-base">
            Anda dapat memberi masukan, kritik dan/atau pengaduan terkait
            polibatam secara online
          </p>
          <div className="mt-3">
            <button
              onClick={onBackToHome}
              className="text-white/80 hover:text-white text-sm flex items-center gap-1 transition-all duration-300 hover:underline"
            >
              <ArrowLeft size={14} />
              kembali ke beranda
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={onNavigateToForm}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center gap-2 shadow rounded transition-all duration-300"
          >
            <FileText size={16} />
            Form Pengajuan
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 shadow rounded cursor-default flex items-center gap-2">
            <Search size={16} />
            Lihat Status Pengajuan
          </button>
        </div>

        <div className="mt-6 border border-gray-300 rounded-lg overflow-hidden bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="grid grid-cols-4 border-b border-gray-300 bg-gray-100/80">
            <div className="col-span-2 py-3 px-4 border-r border-gray-300 font-semibold text-gray-700 flex items-center gap-2">
              <MessageSquare size={16} />
              Masukan / Kritik / Saran
            </div>
            <div className="py-3 px-4 text-center font-semibold text-gray-700 border-r border-gray-300">
              Status
            </div>
            <div className="py-3 px-4 text-center font-semibold text-gray-700">
              Aksi
            </div>
          </div>

          {dataPengaduan.length === 0 ? (
            <div className="grid grid-cols-4 min-h-[300px]">
              <div className="col-span-2 border-r border-gray-200 p-4">
                <div className="border border-gray-300 rounded-lg p-3 bg-gray-50/80 min-h-[150px] flex items-center justify-center">
                  <p className="text-gray-500 italic text-center">
                    <FileText size={32} className="mx-auto mb-2 opacity-50" />
                    Belum ada pengaduan
                    <br />
                    <span className="text-sm">
                      Silakan buat pengaduan melalui Form Pengajuan
                    </span>
                  </p>
                </div>
              </div>
              <div className="border-r border-gray-200 p-4 flex items-start justify-center">
                <div className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-500 border border-gray-300">
                  -
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
                <div
                  key={item.id}
                  className="grid grid-cols-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="col-span-2 border-r border-gray-200 p-4">
                    <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 min-h-[100px] flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {item.judul}
                        </h3>
                        <p className="text-gray-700 text-sm line-clamp-2">
                          {item.pesan}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <Calendar size={12} />
                        {item.tanggalSubmit}
                      </div>
                    </div>
                  </div>
                  <div className="border-r border-gray-200 p-4 flex items-start justify-center">
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium border flex items-center gap-2 ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusIcon(item.status)}
                      <span>{item.status}</span>
                    </div>
                  </div>
                  <div className="p-4 flex items-start justify-center">
                    <button
                      onClick={() => handleLihatDetail(item)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-all duration-300 flex items-center gap-1"
                    >
                      <Eye size={14} />
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedPengaduan && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">Detail Pengaduan</h2>
                    <p className="text-blue-100 text-sm mt-1 flex items-center gap-1">
                      ID: {selectedPengaduan.id} • <Calendar size={12} />{" "}
                      {selectedPengaduan.tanggalSubmit}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FileText size={16} className="text-blue-500" />
                    Laporan
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="font-medium text-gray-800 mb-2">
                      {selectedPengaduan.judul}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {selectedPengaduan.pesan}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <AlertCircle size={16} className="text-blue-500" />
                    Status Saat Ini
                  </h3>
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(
                      selectedPengaduan.status
                    )}`}
                  >
                    {getStatusIcon(selectedPengaduan.status)}
                    <span className="font-medium">{selectedPengaduan.status}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    {selectedPengaduan.statusDetail}
                  </p>
                </div>

                {selectedPengaduan.status === "Close" &&
                  selectedPengaduan.hasilPenyelesaian && (
                    <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                      <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Hasil Penyelesaian
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {selectedPengaduan.hasilPenyelesaian}
                      </p>
                    </div>
                  )}

                {selectedPengaduan.status === "Ditolak" &&
                  selectedPengaduan.alasanPenolakan && (
                    <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                      <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                        <XCircle size={16} />
                        Alasan Penolakan
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {selectedPengaduan.alasanPenolakan}
                      </p>
                    </div>
                  )}

                {selectedPengaduan.status === "Tindak Lanjut" &&
                  selectedPengaduan.targetSelesai && (
                    <div className="border-l-4 border-cyan-500 bg-cyan-50 p-4 rounded-r-lg">
                      <h3 className="font-semibold text-cyan-700 mb-2 flex items-center gap-2">
                        <Clock size={16} />
                        Target Penyelesaian
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Target selesai: {selectedPengaduan.targetSelesai}
                      </p>
                    </div>
                  )}

                {(selectedPengaduan.status === "Diproses" ||
                  selectedPengaduan.status === "Review Ka-P4M") &&
                  selectedPengaduan.unitTujuan && (
                    <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                      <h3 className="font-semibold text-yellow-700 mb-2 flex items-center gap-2">
                        <Building size={16} />
                        Unit Penanggung Jawab
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {selectedPengaduan.unitTujuan}
                      </p>
                    </div>
                  )}

                {selectedPengaduan.gambar && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FileImage size={16} className="text-blue-500" />
                      Dokumentasi
                    </h3>
                    <div className="bg-gray-100 rounded-lg p-4 text-center border border-gray-300">
                      <FileImage size={32} className="mx-auto text-gray-400" />
                      <p className="text-gray-500 text-sm mt-2">
                        (Gambar akan tampil setelah terhubung ke backend)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-xl">
                <button
                  onClick={closeModal}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;