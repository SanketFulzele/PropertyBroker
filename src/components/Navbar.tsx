import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import "../styles/navbar.css";
import { Logo } from "../baseComponents";
import { makePhoneCall } from "../utils/contact";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => {
      setMobileMenuOpen(false);
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
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <Logo size="md" />
        </div>

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

        <div className="navbar-right">
          <button
            className="navbar-phone"
            onClick={() => makePhoneCall({ source: "navbar" })}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <Phone size={18} />
            <span>99-2121-5145</span>
          </button>

          <button
            className="navbar-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
