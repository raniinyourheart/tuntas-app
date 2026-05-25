import React, { useState } from "react";

export default function ProsesKaP4M() {
  const [selectedAksi, setSelectedAksi] = useState("");
  const [inputAksi, setInputAksi] = useState("");

  const handleSend = () => {
    if (!selectedAksi || !inputAksi) {
      alert("Harap pilih tindakan dan isi aksi terlebih dahulu!");
      return;
    }
    alert(`Tindakan terkirim!\n\nPilih Tindakan: ${selectedAksi}\nAksi: ${inputAksi}`);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      
      {/* HEADER (tanpa navigasi) */}
      <div className="bg-slate-600 text-white p-6 border-4 border-blue-500 max-w-3xl">
        <h1 className="text-xl font-bold leading-snug">
          Selamat Datang Di Transformasi Tata Kelola Organisasi:
          Aplikasi Pengelolaan Ketidaksesuaian Polibatam
        </h1>
        <p className="text-sm mt-2 opacity-80">👑 Ka. P4M - Proses Pengaduan</p>
      </div>

      {/* SCROLL CONTAINER */}
      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[1100px] border border-black bg-white">
          
          {/* HEADER TABLE - 6 KOLOM */}
          <div className="grid grid-cols-6 border-b border-black text-center font-semibold bg-gray-100">
            <div className="p-3 border-r border-black col-span-2 text-lg">
              Masukan Kritik / Pengaduan
            </div>
            <div className="p-3 border-r border-black">Penyebab</div>
            <div className="p-3 border-r border-black">Rencana Tindak Lanjut</div>
            <div className="p-3 border-r border-black">Pilih Tindakan</div>
            <div className="p-3">Aksi (Ka. P4M)</div>
          </div>

          {/* ROW DATA */}
          <div className="grid grid-cols-6">
            
            {/* Kolom 1: Kritik - READONLY (dari Civitas) */}
            <div className="p-4 border-r border-black col-span-2 align-top">
              <textarea
                readOnly
                className="w-full h-32 border border-gray-400 p-2 resize-none bg-gray-100 text-gray-600"
                placeholder="Data dari civitas akan tampil di sini"
              />
              <button className="mt-2 text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-100">
                🖼 Lihat Dokumen Pendukung
              </button>
            </div>

            {/* Kolom 2: Penyebab - READONLY (dari Kepala Unit) */}
            <div className="p-4 border-r border-black align-top">
              <textarea
                readOnly
                className="w-full h-32 border border-gray-400 p-2 resize-none bg-gray-50 text-gray-600"
                placeholder="Data dari Kepala Unit akan tampil di sini"
              />
            </div>

            {/* Kolom 3: Rencana - READONLY (dari Kepala Unit) */}
            <div className="p-4 border-r border-black align-top">
              <textarea
                readOnly
                className="w-full h-32 border border-gray-400 p-2 resize-none bg-gray-50 text-gray-600"
                placeholder="Data dari Kepala Unit akan tampil di sini"
              />
            </div>

            {/* Kolom 4: Pilih Tindakan (Dropdown untuk Ka. P4M) */}
            <div className="p-4 border-r border-black">
              <select
                value={selectedAksi}
                onChange={(e) => setSelectedAksi(e.target.value)}
                className="w-full border border-gray-400 rounded p-2 bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Pilih Tindakan</option>
                <option value="Setujui">✅ Setujui</option>
                <option value="Revisi">🔄 Revisi ke Kepala Unit</option>
                <option value="Tolak">❌ Tolak</option>
              </select>
            </div>

            {/* Kolom 5: Aksi Ka. P4M (input teks) */}
            <div className="p-4">
              <textarea
                value={inputAksi}
                onChange={(e) => setInputAksi(e.target.value)}
                className="w-full h-32 border border-gray-400 rounded p-2 resize-none focus:outline-none focus:border-blue-500"
                placeholder="Isi aksi/tindak lanjut dari Ka. P4M..."
              />
            </div>

          </div>

          {/* TOMBOL SEND DI BAWAH */}
          <div className="p-4 border-t border-black flex justify-end">
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded font-semibold transition"
            >
              📤 SEND
            </button>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="mt-4 h-3 bg-gray-300 rounded-full w-full" />

      {/* FOOTER */}
      <div className="mt-4 p-2 bg-gray-300 rounded text-xs text-gray-600 text-center">
        👑 Ka. P4M menentukan tindakan (Setujui/Revisi/Tolak) dan memberikan aksi/tindak lanjut.
      </div>
    </div>
  );
}