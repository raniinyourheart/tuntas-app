import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import bgCampus from "../zmx/poltek.jpg";
import logo from "../zmx/logo-poltek.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!password || !confirmPassword) {
      setError("Harap isi semua field!");
      return;
    }
    
    if (password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      return;
    }
    
    setLoading(true);
    
    // Simulasi reset password (nanti ganti dengan API)
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      // Hapus email dari sessionStorage setelah berhasil
      sessionStorage.removeItem("resetEmail");
    }, 1500);
  };

  if (success) {
    return (
      <div
        className="min-h-screen bg-cover bg-center relative flex items-center justify-center overflow-hidden px-4"
        style={{ backgroundImage: `url(${bgCampus})` }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Berhasil Diubah!</h2>
            <p className="text-gray-500 mb-6">
              Password Anda telah berhasil direset. Silakan login dengan password baru Anda.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
            >
              Login Sekarang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center overflow-hidden px-4"
      style={{ backgroundImage: `url(${bgCampus})` }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      <div className="absolute w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-300/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex">

        <div className="w-1/2 bg-gradient-to-br from-blue-800/80 to-blue-500/80 flex flex-col justify-center px-10 text-white">
          <div className="text-center">
            <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4 drop-shadow-xl" />
            <h1 className="text-3xl font-bold mb-2">Buat Password Baru</h1>
            <p className="text-sm text-blue-100">
              Masukkan password baru untuk akun Anda.
            </p>
          </div>
        </div>

        <div className="w-1/2 bg-white/95 backdrop-blur-sm relative flex items-center justify-center px-10 py-12">
          
          <div className="w-full max-w-sm">
            <button
              onClick={() => navigate("/verifikasi-otp")}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition"
            >
              <ArrowLeft size={18} />
              Kembali
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Reset Password
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Buat password baru untuk akun <span className="font-semibold">{email}</span>
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleResetPassword}>
              <div className="mb-5">
                <label className="block text-sm text-gray-600 mb-2">
                  Password Baru
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-11 pr-12 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Minimal 6 karakter</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-2">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-11 pr-12 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}