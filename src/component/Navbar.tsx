import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">

        <div className="flex items-center gap-3">
          <div className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            <img src="/BookFlixlogo.png" alt="BookFlix Logo" className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">BookFlix</h1>
            <p className="text-xs text-gray-400">Your Personal Library</p>
          </div>
        </div>

        {/* NAV DESKTOP */}
        <div className="hidden md:flex gap-8 text-gray-300">
          <button onClick={() => scrollToSection("home")} className="hover:text-red-500 transition">Home</button>
          <button onClick={() => scrollToSection("library")} className="hover:text-red-500 transition">Library</button>
          <button onClick={() => scrollToSection("favorites")} className="hover:text-red-500 transition">Favorites</button>
        </div>

        {/* BOUTON MENU MOBILE */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* MENU MOBILE DÉROULANT */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-gray-300 bg-black/95">
          <button onClick={() => scrollToSection("home")} className="text-left hover:text-red-500 transition">Home</button>
          <button onClick={() => scrollToSection("library")} className="text-left hover:text-red-500 transition">Library</button>
          <button onClick={() => scrollToSection("favorites")} className="text-left hover:text-red-500 transition">Favorites</button>
        </div>
      )}
    </header>
  );
}