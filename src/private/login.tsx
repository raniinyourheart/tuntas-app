import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import bgCampus from "../zmx/poltek.jpg";
import logo from "../zmx/logo-poltek.png";

export default function Login3D() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("Harap isi username dan password!");
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      if (username === "staff" && password === "staff123") {
        navigate("/private/staff_p4m/dashboard");
      } else if (username === "kepala" && password === "kepala123") {
        navigate("/private/kepala_unit/dashboard");
      } else if (username === "ka" && password === "ka123") {
        navigate("/private/ka_p4m/dashboard");
      } else {
        setError("Username atau password salah!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center overflow-hidden px-4"
      style={{ backgroundImage: `url(${bgCampus})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Background Blur 3D Shapes */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-300/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl h-[600px] rounded-[40px] overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex">

        {/* Left Side - Welcome Section */}
        <div className="relative w-1/2 bg-gradient-to-br from-blue-800/80 to-blue-500/80 flex flex-col justify-center px-12 text-white overflow-hidden">
          
          {/* 3D Shapes */}
          <div className="absolute w-72 h-72 bg-blue-300/20 rounded-full top-[-80px] left-[-80px] blur-sm" />
          <div className="absolute w-56 h-56 bg-cyan-200/20 rounded-full bottom-[-40px] left-[-20px]" />
          <div className="absolute w-44 h-44 bg-blue-100/20 rounded-full bottom-10 right-10" />

          {/* Floating Balls */}
          <div className="absolute bottom-16 left-10 w-36 h-36 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 shadow-2xl animate-bounce opacity-60" />
          <div className="absolute bottom-28 right-12 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-200 to-blue-400 shadow-2xl animate-pulse opacity-50" />

          <div className="relative z-10 text-center">
            {/* WELCOME TO - NAIK KE ATAS (diberi jarak dengan elemen bawah) */}
            <h1 className="text-5xl font-extrabold mb-12 tracking-wide text-white">
              WELCOME TO
            </h1>
            
            {/* Logo + TUNTAS POLIBATAM - TETAP DI SINI */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={logo} alt="Logo Polibatam" className="w-12 h-12 object-contain drop-shadow-xl" />
              <h2 className="text-2xl font-bold tracking-wide">
                <span className="bg-gradient-to-r from-[#d4af37] via-yellow-200 to-[#d4af37] bg-[length:200%_auto] bg-clip-text text-transparent animate-[shine_3s_linear_infinite]">
                  TUNTAS
                </span>
                <span className="text-white"> POLIBATAM</span>
              </h2>
            </div>
            
            {/* Subtitle */}
            <p className="text-xs text-blue-100 leading-relaxed max-w-sm mx-auto">
              Transformasi Tata Kelola Organisasi; Aplikasi pengelolaan Ketidaksesuaian dan Tindak Lanjut di Politeknik Negeri Batam
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 bg-white/95 backdrop-blur-sm relative flex items-center justify-center px-12">
          
          {/* Decorative Shape */}
          <div className="absolute top-0 left-[-60px] w-40 h-full bg-gradient-to-b from-blue-700 to-blue-500 rounded-r-[100px]" />

          <div className="relative z-10 w-full max-w-sm">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Sign In
            </h2>
            <p className="text-gray-500 mb-8">
              Welcome back! Please login to your account.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* Username with Icon */}
              <div className="mb-5">
                <label className="block text-sm text-gray-600 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm bg-white"
                  />
                </div>
              </div>

              {/* Password with Icon */}
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
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
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 text-sm text-gray-500">
                  <input type="checkbox" className="rounded" /> Remember me
                </label>
                <button 
                  type="button"
                  onClick={() => navigate("/lupa-password")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}