import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import "../styles/navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => {
      setMobileMenuOpen(false); // Close mobile menu on resize
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""} ${isHome ? "home" : ""}`}
      style={{
        background: isHome 
          ? (scrolled ? "rgba(255,255,255,0.95)" : "transparent")
          : "rgba(255,255,255,0.98)",
      }}
    >
      <div className="navbar-content">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <div className="navbar-logo-icon">N</div>
          <span className="navbar-logo-text">PropertyBroker</span>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          {["Buy", "Rent", "Projects", "Developers"].map((item) => (
            <button
              key={item}
              className="navbar-menu-item"
              onClick={() => scrollTo(item.toLowerCase())}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Phone */}
          <a href="tel:8381001406" className="navbar-phone">
            <Phone size={18} />
            <span>8381-00-1406</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`navbar-mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        {["Buy", "Rent", "Projects", "Developers"].map((item) => (
          <button
            key={item}
            className="navbar-mobile-menu-item"
            onClick={() => {
              scrollTo(item.toLowerCase());
              setMobileMenuOpen(false);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}