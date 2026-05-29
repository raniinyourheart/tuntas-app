import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import bgCampus from "../zmx/poltek.jpg";
import logo from "../zmx/logo-poltek.png";

export default function LupaPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Harap masukkan email Anda!");
      return;
    }
    
    if (!email.includes("@") || !email.includes(".")) {
      setError("Email tidak valid!");
      return;
    }
    
    setLoading(true);
    
    // Simulasi kirim OTP (nanti ganti dengan API)
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      // Simpan email ke sessionStorage untuk verifikasi OTP nanti
      sessionStorage.setItem("resetEmail", email);
    }, 1500);
  };

  if (otpSent) {
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Kode OTP Terkirim!</h2>
            <p className="text-gray-500 mb-6">
              Kami telah mengirimkan kode OTP ke <br />
              <span className="font-semibold text-blue-600">{email}</span>
            </p>
            <button
              onClick={() => navigate("/verifikasi-otp")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
            >
              Masukkan Kode OTP
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
            <h1 className="text-3xl font-bold mb-2">Lupa Password?</h1>
            <p className="text-sm text-blue-100">
              Masukkan email Anda, kami akan mengirimkan kode OTP untuk reset password.
            </p>
          </div>
        </div>

        <div className="w-1/2 bg-white/95 backdrop-blur-sm relative flex items-center justify-center px-10 py-12">
          
          <div className="w-full max-w-sm">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition"
            >
              <ArrowLeft size={18} />
              Kembali ke Login
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Reset Password
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Masukkan email terdaftar Anda.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSendOTP}>
              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Mengirim..." : "Kirim Kode OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}