import React, { useState } from "react";

interface PengaduanProps {
  onBackToHome: () => void;
  onNavigateToStatus: () => void;
}

const Pengaduan: React.FC<PengaduanProps> = ({ onBackToHome, onNavigateToStatus }) => {
  const [formData, setFormData] = useState({
    status: "",
    pesan: "",
    files: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, status: e.target.value });
  };

  const handlePesanChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, pesan: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const maxFiles = 3;
      const currentCount = formData.files.length;
      const availableSlots = maxFiles - currentCount;
      
      if (newFiles.length > availableSlots) {
        alert(`Maksimal upload ${maxFiles} gambar. Saat ini sudah ${currentCount} file. Bisa upload ${availableSlots} file lagi.`);
        return;
      }
      
      setFormData({ ...formData, files: [...formData.files, ...newFiles] });
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...formData.files];
    newFiles.splice(index, 1);
    setFormData({ ...formData, files: newFiles });
  };

  const handleResetForm = () => {
    setFormData({ status: "", pesan: "", files: [] });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.status || !formData.pesan) {
      alert("Harap isi semua field yang diperlukan!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ status: "", pesan: "", files: [] });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative py-10 px-4 md:px-8">
      {/* BACKGROUND IMAGE - OVERLAY LEBIH TERANG */}
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
        
        {/* HEADER - TRANSPARAN */}
        <div className="bg-slate-600/80 backdrop-blur-sm text-white p-6 rounded-t-lg">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug">
            Selamat Datang Di Transformasi Tata Kelola Organisasi:
            Aplikasi Pengelolaan Ketidaksesuaian dan Tindak Lanjut Polibatam
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
              ← kembali ke beranda
            </button>
          </div>
        </div>

        {/* BUTTON NAVIGASI */}
        <div className="flex gap-4 mt-4">
          <button 
            onClick={handleResetForm}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center gap-2 shadow rounded transition-all duration-300"
          >
            📝 Form Pengajuan
          </button>
          <button 
            onClick={onNavigateToStatus}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 shadow rounded transition-all duration-300"
          >
            🔍 Lihat Status Pengajuan
          </button>
        </div>

        {/* FORM - DENGAN BACKGROUND PUTIH TRANSPARAN */}
        <form onSubmit={handleSubmit}>
          <div className="border border-gray-300 mt-4 p-6 bg-white/95 backdrop-blur-sm rounded-b-lg shadow-xl">
            
            {/* INPUT STATUS */}
            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
              <label className="w-40 font-medium mb-2 sm:mb-0">Input Status :</label>
              <select 
                value={formData.status}
                onChange={handleStatusChange}
                className="border border-gray-300 p-2 w-full sm:w-64 bg-white rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">pilih status anda </option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Dosen">Dosen</option>
                <option value="Masyarakat Umum">Masyarakat Umum</option>
              </select>
            </div>

            {/* TEXTAREA */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Masukan/Saran :
              </label>
              <textarea
                value={formData.pesan}
                onChange={handlePesanChange}
                placeholder="masukan kritik atau pengaduan terkait polibatam"
                className="w-full h-40 border border-gray-300 p-3 resize-none rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* UPLOAD GAMBAR */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Tambahkan Gambar :
              </label>

              <label className="flex items-center gap-2 border border-gray-300 w-fit px-3 py-2 bg-white cursor-pointer rounded hover:bg-gray-50 transition">
                📷
                <span className="text-gray-600">
                  {formData.files.length === 0 
                    ? "Tambahkan Dokumen Pendukung" 
                    : `+ Tambah gambar lagi (${formData.files.length}/3)`}
                </span>
                <input 
                  type="file" 
                  accept=".pdf,.png,.jpg,.jpeg" 
                  className="hidden" 
                  onChange={handleFileChange}
                  multiple
                />
              </label>

              {formData.files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {file.type.startsWith("image/") ? "🖼️" : "📄"}
                        </span>
                        <span className="text-sm text-gray-700 truncate max-w-[200px] md:max-w-[400px]">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition"
                      >
                        ✕ Hapus
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-red-500 mt-1">
                *Gambar Hanya Mendukung : PDF, PNG, JPG (Maksimal 3 file)
              </p>
            </div>

            {/* TOMBOL KIRIM */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    📤 Kirim Pengaduan
                  </>
                )}
              </button>

              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center mt-3">
                  <strong>✓ Berhasil!</strong> Pengaduan Anda telah terkirim dengan {formData.files.length} file lampiran.
                </div>
              )}
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default Pengaduan;