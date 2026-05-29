import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, ArrowLeft } from "lucide-react";
import bgCampus from "../zmx/poltek.jpg";
import logo from "../zmx/logo-poltek.png";

export default function VerifikasiOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      navigate("/lupa-password");
    }
  }, [navigate]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus ke input berikutnya
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      setError("Masukkan kode OTP 6 digit!");
      return;
    }
    
    setLoading(true);
    
    // Simulasi verifikasi OTP (nanti ganti dengan API)
    setTimeout(() => {
      if (otpCode === "123456") {
        // OTP benar, lanjut ke reset password
        navigate("/reset-password");
      } else {
        setError("Kode OTP salah! Coba lagi.");
      }
      setLoading(false);
    }, 1000);
  };

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
            <h1 className="text-3xl font-bold mb-2">Verifikasi OTP</h1>
            <p className="text-sm text-blue-100">
              Masukkan kode OTP yang dikirim ke email Anda.
            </p>
          </div>
        </div>

        <div className="w-1/2 bg-white/95 backdrop-blur-sm relative flex items-center justify-center px-10 py-12">
          
          <div className="w-full max-w-sm">
            <button
              onClick={() => navigate("/lupa-password")}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition"
            >
              <ArrowLeft size={18} />
              Kembali
            </button>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verifikasi
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Kode OTP telah dikirim ke <span className="font-semibold">{email}</span>
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOTP}>
              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-3 text-center">
                  Masukkan Kode OTP 6 Digit
                </label>
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm bg-white"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Kode OTP: <span className="font-mono font-bold">123456</span> (demo)
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Memverifikasi..." : "Verifikasi OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}