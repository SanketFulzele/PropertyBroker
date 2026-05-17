import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerData = [
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Careers", path: "/careers" },
        { label: "Press", path: "/press" },
        { label: "Blog", path: "/blog" },
      ],
    },
    {
      title: "Properties",
      links: [
        { label: "Buy", path: "/buy" },
        { label: "Rent", path: "/rent" },
        { label: "Commercial", path: "/commercial" },
        { label: "New Projects", path: "/projects" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", path: "/help" },
        { label: "Contact Us", path: "/contact" },
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Terms", path: "/terms" },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Logo Section */}
          <div className="footer-logo-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">N</div>
              <span className="footer-logo-text">PropertyBroker</span>
            </div>

            <p className="footer-description">
              India's most trusted real estate platform. Find, buy, rent and sell properties with confidence.
            </p>
          </div>

          {/* Dynamic Links */}
          {footerData.map((col) => (
            <div key={col.title} className="footer-column">
              <h4 className="footer-column-title">{col.title}</h4>

              {col.links.map((link) => (
                <div key={link.label} className="footer-link-item">
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} PropertyBroker. All rights reserved.
          </p>

          <p className="footer-made">
            🇮🇳 Made for India
          </p>
        </div>
      </div>
    </footer>
  );
}