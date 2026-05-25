import React, { useEffect, useState } from 'react';
import { 
  FileText, Search, CheckCircle, AlertCircle, 
  Building, Users, Shield, Lightbulb, 
  Clock, Settings, Archive, ArrowRight,
  Menu, X, Home, Info, Layers, Mail
} from 'lucide-react';

interface BerandaProps {
  onNavigateToForm: () => void;
  onNavigateToStatus: () => void;
}

const Beranda: React.FC<BerandaProps> = ({ onNavigateToForm, onNavigateToStatus }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [heroImageError, setHeroImageError] = useState(false);
  const [ctaImageError, setCtaImageError] = useState(false);

  const textOptions = [
    "Sampaikan masukan, kritik, dan pengaduan secara online",
    "Mudah, cepat, dan terpantau statusnya",
    "Bersama wujudkan Polibatam yang lebih baik"
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (textIndex < textOptions.length) {
      const currentText = textOptions[textIndex];
      if (typedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setTypedText(currentText.slice(0, typedText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setTypedText("");
          setTextIndex((textIndex + 1) % textOptions.length);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
  }, [typedText, textIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { id: "beranda", label: "Beranda", icon: <Home size={16} /> },
    { id: "tentang", label: "Tentang", icon: <Info size={16} /> },
    { id: "layanan", label: "Layanan", icon: <Layers size={16} /> },
    { id: "pengaduan", label: "Pengaduan", icon: <Mail size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/10 ${
        scrolled
          ? "bg-[#07152e]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] py-3"
          : "bg-[#07152e]/70 backdrop-blur-md py-5"
      }`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* LOGO + TEXT */}
          <div className="flex items-center gap-4 cursor-pointer group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#d4af37]/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <img
                src="public/politeknik logo.png"
                alt="Logo Polibatam"
                className="relative w-12 h-12 md:w-14 md:h-14 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <h1 className="text-white font-black text-xl md:text-2xl tracking-wide transition-all duration-300 group-hover:tracking-wider">
                <span className="bg-gradient-to-r from-[#d4af37] via-yellow-200 to-[#d4af37] bg-[length:200%_auto] bg-clip-text text-transparent animate-[shine_4s_linear_infinite]">
                  TUNTAS
                </span>
                <span className="ml-2 text-white group-hover:text-[#d4af37] transition-all duration-300">
                  Polibatam
                </span>
              </h1>
              <span className="text-[10px] md:text-xs uppercase tracking-[3px] text-gray-300 group-hover:text-white transition-all duration-300">
                Sistem Pengaduan Kampus
              </span>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative group transition-all duration-300 hover:text-[#d4af37] flex items-center gap-1"
              >
                {item.icon}
                <span className="relative z-10 tracking-wide">{item.label}</span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#d4af37] to-yellow-200 rounded-full transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-2xl hover:text-[#d4af37] transition-all duration-300"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#07152e]/95 backdrop-blur-xl border-t border-white/10 mt-3 py-4">
            <div className="flex flex-col items-center gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white hover:text-[#d4af37] transition flex items-center gap-2 py-2"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="beranda" className="relative text-white pt-32 pb-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          {!heroImageError ? (
            <img 
              src="/src/zmx/poltek.jpg" 
              alt="Polibatam" 
              className="w-full h-full object-cover"
              onError={() => setHeroImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0a1a3a] to-[#0f2a4a]"></div>
          )}
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Selamat Datang di <span className="text-[#d4af37] shine-horizontal">Aplikasi Pengelolaan</span>
            <br />
            <span className="shine-horizontal-delay">Ketidaksesuaian dan Tindak Lanjut Polibatam</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 min-h-[80px]">
            {typedText}<span className="animate-blink border-r-2 border-white ml-1">|</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onNavigateToForm} 
              className="bg-[#d4af37] hover:bg-[#c4a030] text-[#0a1a3a] font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-2xl flex items-center gap-2"
            >
              <FileText size={18} />
              Buat Pengaduan Baru
            </button>
            <button 
              onClick={onNavigateToStatus} 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#0a1a3a] font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Search size={18} />
              Lihat Status Pengajuan
            </button>
          </div>
        </div>
      </section>

      {/* TENTANG APLIKASI */}
      <section id="tentang" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a3a] text-center mb-6">Tentang Aplikasi Ini</h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto mb-8 rounded-full"></div>
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-2xl shadow-xl border-l-8 border-[#d4af37] card-glow">
            <p className="text-gray-700 text-center max-w-3xl mx-auto text-lg leading-relaxed">
              Aplikasi ini membantu civitas Polibatam menyampaikan ketidaksesuaian (masalah, saran, kritik, keluhan) yang ditemukan di lingkungan kampus.
              <br /><br />
              <span className="font-semibold text-[#0a1a3a] card-content-hover">Setiap laporan bisa dipantau statusnya.</span>
            </p>
          </div>
        </div>
      </section>

      {/* APA YANG BISA DILAPORKAN */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a3a] text-center mb-4">Apa Saja yang Bisa Kamu Laporkan?</h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto mb-12 rounded-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Building size={40} />, title: "Sarana & Prasarana", desc: "AC, kursi, lab, fasilitas rusak" },
              { icon: <Users size={40} />, title: "Pelayanan Administrasi", desc: "Kurang nyaman atau lambat" },
              { icon: <Shield size={40} />, title: "Perilaku Tidak Sesuai", desc: "Melanggar aturan kampus" },
              { icon: <Lightbulb size={40} />, title: "Saran Perbaikan", desc: "Untuk organisasi & tata kelola" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer card-hover-glow text-center">
                <div className="text-[#d4af37] flex justify-center mb-4 icon-hover">{item.icon}</div>
                <h3 className="text-xl font-semibold text-[#0a1a3a] mb-2 card-content-hover">{item.title}</h3>
                <p className="text-gray-600 desc-hover">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARA MENGGUNAKAN */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a3a] text-center mb-4">Cara Menggunakan</h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto mb-12 rounded-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: "1", title: "Pilih Status", desc: "Mahasiswa / Dosen / Masyarakat Umum", icon: <Users size={24} /> },
              { number: "2", title: "Tulis Masukan", desc: "Kritik, saran, atau pengaduan", icon: <FileText size={24} /> },
              { number: "3", title: "Upload Gambar", desc: "PDF/PNG/JPG (opsional)", icon: <FileText size={24} /> },
              { number: "4", title: "Kirim", desc: "Dapatkan status pengaduan", icon: <ArrowRight size={24} /> },
            ].map((step, idx) => (
              <div key={idx} className="text-center group cursor-pointer step-card">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0a1a3a] to-[#0f2a4a] text-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl step-number-hover">
                  {step.icon}
                </div>
                <h3 className="font-bold text-xl text-[#0a1a3a] mb-2 group-hover:text-[#d4af37] transition-colors step-title-hover">{step.title}</h3>
                <p className="text-gray-500 desc-hover">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-20 bg-[#0a1a3a] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Keunggulan Pakai Aplikasi Ini</h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto mb-12 rounded-full"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <CheckCircle size={40} />, text: "Tidak perlu login" },
              { icon: <Users size={40} />, text: "Bisa anonim" },
              { icon: <FileText size={40} />, text: "Upload dokumen pendukung" },
              { icon: <Search size={40} />, text: "Status jelas: diterima -> diproses -> selesai" },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0f2a4a] p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer advantage-card text-center">
                <div className="text-[#d4af37] flex justify-center mb-3 advantage-icon-hover">{item.icon}</div>
                <p className="text-lg card-content-hover">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFORMASI LAYANAN */}
      <section id="layanan" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1a3a] text-center mb-4">Informasi Layanan</h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto mb-12 rounded-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition service-card">
              <div className="text-blue-600 flex justify-center mb-3 service-icon-hover">
                <Clock size={40} />
              </div>
              <h3 className="font-bold text-blue-800 mb-2 service-text-hover">Respon Cepat</h3>
              <p className="service-text-hover">maksimal <strong>1x24 jam</strong></p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition service-card">
              <div className="text-yellow-600 flex justify-center mb-3 service-icon-hover">
                <Settings size={40} />
              </div>
              <h3 className="font-bold text-yellow-800 mb-2 service-text-hover">Proses Penyelesaian</h3>
              <p className="service-text-hover">disesuaikan tingkat <strong>kompleksitas</strong></p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition service-card">
              <div className="text-green-600 flex justify-center mb-3 service-icon-hover">
                <Archive size={40} />
              </div>
              <h3 className="font-bold text-green-800 mb-2 service-text-hover">Terdokumentasi Rapi</h3>
              <p className="service-text-hover"><strong>Semua laporan</strong> tersimpan aman</p>
            </div>
          </div>
        </div>
      </section>

      {/* PENGADUAN (CTA) */}
      <section id="pengaduan" className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          {!ctaImageError ? (
            <img 
              src="/src/zmx/poltek-2.jpg" 
              alt="Polibatam" 
              className="w-full h-full object-cover"
              onError={() => setCtaImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#0a1a3a] to-[#0f2a4a]"></div>
          )}
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-pulse">Yuk Mulai!</h2>
          <p className="text-xl mb-8">Sampaikan sekarang, bantu Polibatam lebih baik.</p>
          <button 
            onClick={onNavigateToForm} 
            className="bg-[#d4af37] hover:bg-[#c4a030] text-[#0a1a3a] font-bold px-10 py-4 rounded-lg transition-all duration-300 shadow-xl text-lg hover:scale-105 cta-button flex items-center gap-2 mx-auto"
          >
            <FileText size={20} />
            Buat Pengaduan Baru
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#06122a] text-gray-400 py-10">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm">
          <p>&copy; 2026 Aplikasi Pengelolaan Ketidaksesuaian dan Tindak lanjut Polibatam. Semua hak dilindungi.</p>
          <p className="mt-2">Transformasi Tata Kelola Organisasi</p>
        </div>
      </footer>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shine-horizontal {
          background: linear-gradient(90deg, #d4af37, #ffffff, #d4af37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 3s linear infinite;
        }
        
        .shine-horizontal-delay {
          background: linear-gradient(90deg, #ffffff, #d4af37, #ffffff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 3s linear infinite 0.5s;
        }
        
        .animate-blink { animation: blink 1s step-end infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        
        .card-content-hover { transition: all 0.3s ease; display: inline-block; }
        .card-content-hover:hover { transform: scale(1.05) translateY(-2px); color: #d4af37; text-shadow: 0 0 5px rgba(212, 175, 55, 0.5); }
        
        .icon-hover { transition: all 0.3s ease; display: inline-block; }
        .icon-hover:hover { transform: scale(1.2) rotate(5deg); }
        
        .desc-hover { transition: all 0.3s ease; }
        .desc-hover:hover { transform: translateX(5px); color: #d4af37; }
        
        .step-number-hover { transition: all 0.3s ease; }
        .step-number-hover:hover { transform: scale(1.15) rotate(360deg); background: linear-gradient(135deg, #d4af37, #b8860b); }
        
        .step-title-hover { transition: all 0.3s ease; }
        .step-title-hover:hover { transform: translateX(8px); letter-spacing: 1px; }
        
        .advantage-icon-hover { transition: all 0.3s ease; }
        .advantage-icon-hover:hover { transform: scale(1.2) rotate(10deg); filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6)); }
        
        .service-icon-hover { transition: all 0.3s ease; }
        .service-icon-hover:hover { transform: scale(1.15) translateY(-5px); }
        
        .service-text-hover { transition: all 0.3s ease; }
        .service-text-hover:hover { transform: scale(1.02); font-weight: bold; }
        
        .card-hover-glow:hover { box-shadow: 0 0 20px rgba(212, 175, 55, 0.4), 0 10px 30px rgba(0, 0, 0, 0.1); }
        .card-glow:hover { box-shadow: 0 0 25px rgba(212, 175, 55, 0.3); }
        .advantage-card:hover { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
        .service-card:hover { box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); }
        .cta-button:hover { box-shadow: 0 0 25px rgba(212, 175, 55, 0.6); }
      `}</style>
    </div>
  );
};

export default Beranda;