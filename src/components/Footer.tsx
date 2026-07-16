import { Link } from "react-router-dom";
import { Logo } from "../baseComponents";
import "../styles/footer.css";

const DEVELOPED_ROUTES = ["/", "/filter", "/privacy-policy"];

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

  const isRouteDeveloped = (path: string) => {
    if (DEVELOPED_ROUTES.includes(path)) return true;
    if (path.startsWith("/property/")) return true;
    return false;
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <Logo size="md" />
            </div>

            <p className="footer-description">
              Nagpur's most trusted real estate platform. Find, buy, rent and sell properties with confidence.
            </p>
          </div>

          {footerData.map((col) => (
            <div key={col.title} className="footer-column">
              <h4 className="footer-column-title">{col.title}</h4>

              {col.links.map((link) => (
                <div key={link.label} className="footer-link-item">
                  {isRouteDeveloped(link.path) ? (
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  ) : (
                    <span className="footer-link" style={{ pointerEvents: "none" }}>
                      {link.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} PropertyBroker. All rights reserved.
          </p>

          <p className="footer-made">
            Made for Nagpur
          </p>
        </div>
      </div>
    </footer>
  );
}
