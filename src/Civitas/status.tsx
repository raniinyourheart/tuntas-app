import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, FileText, Search, Eye, X, 
  CheckCircle, AlertCircle, Calendar, MessageSquare
} from "lucide-react";

interface StatusProps {
  onBackToHome: () => void;
  onNavigateToForm: () => void;
}

interface Pengaduan {
  id: number;
  judul?: string;
  pesan: string;
  status: string;
  statusDetail?: string;
  hasilPenyelesaian?: string;
  alasanPenolakan?: string;
  unitTujuan?: string;
  tanggalSubmit: string;
  kode_unik?: string;
  isi_laporan?: string;
}

const Status: React.FC<StatusProps> = ({ onBackToHome, onNavigateToForm }) => {
  const [dataPengaduan, setDataPengaduan] = useState<Pengaduan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPengaduan, setSelectedPengaduan] = useState<Pengaduan | null>(null);
  const [imageError, setImageError] = useState(false);
  const [searchKode, setSearchKode] = useState("");
  const [filteredData, setFilteredData] = useState<Pengaduan[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/laporan');
      const data = await response.json();
      const mappedData = data.map((item: any) => ({
        id: item.id,
        judul: item.isi_laporan?.substring(0, 50) + (item.isi_laporan?.length > 50 ? "..." : ""),
        pesan: item.isi_laporan,
        status: item.status,
        statusDetail: `Status laporan saat ini: ${item.status}`,
        hasilPenyelesaian: item.hasil_kesimpulan,
        alasanPenolakan: item.alasan_penolakan,
        unitTujuan: item.unit_tujuan,
        tanggalSubmit: new Date(item.tanggal_submit).toLocaleDateString('id-ID'),
        kode_unik: item.kode_unik,
      }));
      setDataPengaduan(mappedData);
      setFilteredData(mappedData);
    } catch (error) {
      console.error('Gagal ambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchKode.trim()) {
      setFilteredData(dataPengaduan);
      return;
    }
    const filtered = dataPengaduan.filter(
      item => item.kode_unik?.toLowerCase().includes(searchKode.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Diterima": return "bg-blue-100 text-blue-700";
      case "Distribusi": return "bg-purple-100 text-purple-700";
      case "Diproses": return "bg-yellow-100 text-yellow-700";
      case "Review Ka-P4M": return "bg-indigo-100 text-indigo-700";
      case "Tindak Lanjut": return "bg-cyan-100 text-cyan-700";
      case "Close": return "bg-green-100 text-green-700";
      case "Ditolak": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative py-10 px-4 md:px-8 flex items-center justify-center">
        <div className="bg-white/80 p-8 rounded-2xl shadow-xl text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Memuat data laporan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative py-10 px-4 md:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {!imageError ? (
          <img src="/src/zmx/poltek-2.jpg" alt="Polibatam" className="w-full h-full object-cover" onError={() => setImageError(true)} />
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
          <p className="mt-2 text-sm md:text-base">Anda dapat memberi masukan, kritik dan/atau pengaduan terkait polibatam secara online</p>
          <div className="mt-3">
            <button onClick={onBackToHome} className="text-white/80 hover:text-white text-sm flex items-center gap-1">
              <ArrowLeft size={14} /> kembali ke beranda
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button onClick={onNavigateToForm} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center gap-2 shadow rounded">
            <FileText size={16} /> Form Pengajuan
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 shadow rounded cursor-default flex items-center gap-2">
            <Search size={16} /> Lihat Status Pengajuan
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <input type="text" placeholder="Cari berdasarkan kode unik (LK-xxx)..." value={searchKode} onChange={(e) => setSearchKode(e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white/90" />
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition flex items-center gap-2">
            <Search size={16} /> Cari
          </button>
        </div>

        <div className="mt-6 border border-gray-300 rounded-lg overflow-hidden bg-white/95 shadow-xl">
          <div className="grid grid-cols-4 border-b border-gray-300 bg-gray-100/80">
            <div className="col-span-2 py-3 px-4 border-r border-gray-300 font-semibold text-gray-700 flex items-center gap-2">
              <MessageSquare size={16} /> Masukan / Kritik / Saran
            </div>
            <div className="py-3 px-4 text-center font-semibold text-gray-700 border-r border-gray-300">Status</div>
            <div className="py-3 px-4 text-center font-semibold text-gray-700">Aksi</div>
          </div>

          {filteredData.length === 0 ? (
            <div className="grid grid-cols-4 min-h-[300px]">
              <div className="col-span-2 border-r border-gray-200 p-4">
                <div className="border border-gray-300 rounded-lg p-3 bg-gray-50/80 flex items-center justify-center">
                  <p className="text-gray-500 italic text-center">
                    <FileText size={32} className="mx-auto mb-2 opacity-50" />
                    Belum ada pengaduan
                  </p>
                </div>
              </div>
              <div className="border-r border-gray-200 p-4 flex justify-center"><div className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-500">-</div></div>
              <div className="p-4 flex justify-center"><div className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-500">-</div></div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <div key={item.id} className="grid grid-cols-4 hover:bg-gray-50/50">
                  <div className="col-span-2 border-r border-gray-200 p-4">
                    <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                      <h3 className="font-semibold text-gray-800 mb-1">{item.judul || `Laporan #${item.id}`}</h3>
                      <p className="text-gray-700 text-sm line-clamp-2">{item.pesan}</p>
                      {item.kode_unik && <p className="text-xs text-gray-400 mt-2">Kode: {item.kode_unik}</p>}
                      <div className="text-xs text-gray-400 mt-2 flex items-center gap-1"><Calendar size={12} /> {item.tanggalSubmit}</div>
                    </div>
                  </div>
                  <div className="border-r border-gray-200 p-4 flex justify-center items-start">
                    <div className={`px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </div>
                  </div>
                  <div className="p-4 flex justify-center items-start">
                    <button onClick={() => setSelectedPengaduan(item)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1">
                      <Eye size={14} /> Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedPengaduan && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPengaduan(null)}>
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">Detail Pengaduan</h2>
                    <p className="text-blue-100 text-sm mt-1">ID: {selectedPengaduan.id} | Kode: {selectedPengaduan.kode_unik}</p>
                  </div>
                  <button onClick={() => setSelectedPengaduan(null)}><X size={20} /></button>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div><h3 className="font-semibold mb-2 flex items-center gap-2"><FileText size={16} className="text-blue-500" /> Laporan</h3><div className="bg-gray-50 rounded-lg p-4 border">{selectedPengaduan.pesan}</div></div>
                <div><h3 className="font-semibold mb-2 flex items-center gap-2"><AlertCircle size={16} className="text-blue-500" /> Status Saat Ini</h3><div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(selectedPengaduan.status)}`}>{selectedPengaduan.status}</div></div>
                {selectedPengaduan.status === "Close" && selectedPengaduan.hasilPenyelesaian && (<div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg"><h3 className="font-semibold text-green-700 mb-2">✅ Hasil Penyelesaian</h3><p>{selectedPengaduan.hasilPenyelesaian}</p></div>)}
                {selectedPengaduan.status === "Ditolak" && selectedPengaduan.alasanPenolakan && (<div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg"><h3 className="font-semibold text-red-700 mb-2">❌ Alasan Penolakan</h3><p>{selectedPengaduan.alasanPenolakan}</p></div>)}
                {selectedPengaduan.unitTujuan && (<div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg"><h3 className="font-semibold text-yellow-700 mb-2">🏢 Unit Penanggung Jawab</h3><p>{selectedPengaduan.unitTujuan}</p></div>)}
              </div>
              <div className="border-t p-4 bg-gray-50 rounded-b-xl">
                <button onClick={() => setSelectedPengaduan(null)} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"><X size={16} /> Tutup</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;