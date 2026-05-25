import React, { useState } from "react";

export default function FormPengaduan() {
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      
      {/* BUTTON NAVIGASI - TAMBAHAN */}
      <div className="flex gap-4 mb-4">
        <button className="bg-blue-500 text-white px-6 py-2 shadow rounded">
          📝 Pengaduan
        </button>
        <button 
          onClick={() => window.location.href = "/private/kepala_unit/pengerjaan"}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 shadow rounded transition"
        >
          🛠️ Pengerjaan
        </button>
      </div>

      {/* Header */}
      <div className="bg-slate-600 text-white p-6 border-4 border-blue-500 w-fit">
        <h1 className="text-lg font-semibold leading-snug max-w-xl">
          Selamat Datang Di Transformasi Tata Kelola Organisasi:
          Aplikasi Pengelolaan Ketidaksesuaian Polibatam
        </h1>
      </div>

      {/* Table Form */}
      <div className="mt-8 border-2 border-gray-600">
        {/* Header Row */}
        <div className="grid grid-cols-4 bg-gray-100 text-sm font-semibold border-b-2 border-gray-600 text-center">
          <div className="border-r-2 p-3">kritik atau pengaduan terkait polibatam</div>
          <div className="border-r-2 p-3">Penyebab</div>
          <div className="border-r-2 p-3">Rencana Tindak Lanjut</div>
          <div className="p-3">Aksi</div>
        </div>

        {/* Input Row */}
        <div className="grid grid-cols-4">
          {/* Kritik */}
          <div className="border-r-2 p-4">
            <textarea
              className="w-full h-40 border-2 border-gray-500 p-2"
              placeholder="Data dari civitas akan tampil di sini"
              readOnly
            />
          </div>

          {/* Penyebab */}
          <div className="border-r-2 p-4 flex items-start justify-center">
            <textarea
              className="w-full h-28 border-2 border-gray-500 p-2"
              placeholder="Isi penyebab ketidaksesuaian..."
            />
          </div>

          {/* Rencana */}
          <div className="border-r-2 p-4 flex items-start justify-center">
            <textarea
              className="w-full h-28 border-2 border-gray-500 p-2"
              placeholder="Isi rencana tindak lanjut..."
            />
          </div>

          {/* Aksi */}
          <div className="p-4 flex items-center justify-center">
            <button className="bg-blue-600 text-white px-6 py-2 font-semibold rounded hover:bg-blue-700 transition">
              SEND
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 p-2 bg-gray-300 rounded text-xs text-gray-600 text-center">
        📝 Kepala Unit mengisi Penyebab dan Rencana Tindak Lanjut
      </div>
    </div>
  );
}