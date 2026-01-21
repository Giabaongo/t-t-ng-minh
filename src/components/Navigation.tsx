import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Map, Gamepad2 } from "lucide-react";
import qrGame from "@/assets/QR-game.jpeg";

const sections = [
  { id: "section-2", label: "Quan niệm" },
  { id: "goals", label: "Mục tiêu" },
  { id: "characteristics", label: "Đặc trưng" },
  { id: "forces", label: "Động lực" },
  { id: "pathway", label: "Con đường" },
  { id: "state", label: "Nhà nước" },
  { id: "significance", label: "Ý nghĩa" },
  { id: "gallery", label: "Thư viện" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-serif font-bold text-lg text-primary"
          >
            TTHCM
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            {sections.slice(0, 5).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {section.label}
              </button>
            ))}
            <Link
              to="/mindmap"
              className="flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-light transition-colors"
            >
              <Map className="w-4 h-4" />
              Mind Map
            </Link>
            <button
              onClick={() => setShowQRModal(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-green-500 hover:text-green-400 transition-colors"
            >
              <Gamepad2 className="w-4 h-4" />
              Mini Game
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-4 px-6 space-y-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {section.label}
              </button>
            ))}
            <Link
              to="/mindmap"
              className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Map className="w-4 h-4" />
              Mind Map
            </Link>
            <button
              onClick={() => { setShowQRModal(true); setIsMenuOpen(false); }}
              className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors py-2 font-medium"
            >
              <Gamepad2 className="w-4 h-4" />
              Mini Game
            </button>
          </div>
        )}
      </nav>

      {/* QR Code Modal */}
      {showQRModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="bg-slate-900 rounded-2xl p-8 max-w-sm mx-4 border border-gold/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-gold font-bold text-xl mb-4">
                <Gamepad2 className="w-6 h-6" />
                Mini Game
              </div>
              <p className="text-white/70 mb-6">Quét mã QR hoặc nhấn nút bên dưới để chơi game!</p>

              <img
                src={qrGame}
                alt="QR Code Mini Game"
                className="w-48 h-48 mx-auto rounded-xl shadow-lg mb-6 bg-white p-2"
              />

              <div className="space-y-3">
                <a
                  href="https://whack-a-mole-xi-blush.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-500 hover:bg-green-400 text-white font-medium transition-colors"
                >
                  <Gamepad2 className="w-5 h-5" />
                  Chơi ngay
                </a>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="w-full px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 font-medium transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

