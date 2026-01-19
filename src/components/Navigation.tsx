import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "section-2", label: "Quan niệm" },
  { id: "goals", label: "Mục tiêu" },
  { id: "characteristics", label: "Đặc trưng" },
  { id: "forces", label: "Động lực" },
  { id: "pathway", label: "Con đường" },
  { id: "state", label: "Nhà nước" },
  { id: "significance", label: "Ý nghĩa" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
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
        </div>
      )}
    </nav>
  );
};

export default Navigation;
