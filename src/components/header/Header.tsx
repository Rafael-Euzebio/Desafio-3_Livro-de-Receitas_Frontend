import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="w-full flex justify-center py-4 bg-green-900 text-white sticky top-0 z-50 shadow-md">
        <div className="container flex justify-between items-center px-4 md:px-8">
          {/* Logo - Responsivo */}
          <div className="font-bold text-lg md:text-xl">
            <Link to="/" onClick={closeMenu}>
              Receitas.com
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/receitas" className="hover:text-green-200 transition">
              Receitas
            </Link>
          </nav>

          {/* Hamburger Menu Button - Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bg-green-900 text-white transition-all duration-300 z-40 ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 p-6">
          <Link
            to="/receitas"
            onClick={closeMenu}
            className="py-2 px-4 hover:bg-green-800 rounded-lg transition"
          >
            Receitas
          </Link>
        </div>
      </div>

      {/* Overlay para fechar menu ao clicar fora */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
}

export default Header;
