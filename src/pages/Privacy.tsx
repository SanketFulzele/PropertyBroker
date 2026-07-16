export default function Privacy() {
  const sectionStyle: React.CSSProperties = {
    marginBottom: 40,
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#1a3c5e",
    marginBottom: 14,
    lineHeight: 1.3,
  };

  const textStyle: React.CSSProperties = {
    fontSize: 15,
    color: "#475569",
    lineHeight: 1.8,
    fontFamily: "'DM Sans', sans-serif",
    margin: 0,
  };

  const listStyle: React.CSSProperties = {
    listStyleType: "none",
    paddingLeft: 0,
    margin: "12px 0 0",
  };

  const listItemStyle: React.CSSProperties = {
    ...textStyle,
    marginBottom: 8,
    paddingLeft: 20,
    position: "relative",
  };

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              display: "inline-block",
              background: "#eff6ff",
              color: "#2563eb",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              padding: "6px 14px",
              borderRadius: 100,
              marginBottom: 16,
              fontFamily: "'DM Sans', sans-serif",
              textTransform: "uppercase" as const,
            }}
          >
            Legal
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 44px)",
              fontWeight: 800,
              color: "#1a3c5e",
              margin: "0 0 10px",
              lineHeight: 1.2,
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#94a3b8",
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
            }}
          >
            Last Updated: July 16, 2026
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            padding: "clamp(28px, 4vw, 44px)",
          }}
        >
          <div style={sectionStyle}>
            <h2 style={headingStyle}>1. Introduction</h2>
            <p style={textStyle}>
              Welcome to Property Broker NGP. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
            </p>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>2. Information We Collect</h2>
            <p style={textStyle}>We may collect the following personal information:</p>
            <ul style={listStyle}>
              {["Name", "Email Address", "Phone Number", "Property preferences and requirements"].map((item) => (
                <li key={item} style={listItemStyle}>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 9,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#2563eb",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ ...textStyle, marginTop: 16 }}>This information is collected when you:</p>
            <ul style={listStyle}>
              {["Fill out forms on the website", "Contact us for property-related inquiries", "Subscribe to our services"].map((item) => (
                <li key={item} style={listItemStyle}>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 9,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#2563eb",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>3. Purpose of Data Collection</h2>
            <p style={textStyle}>We collect your information to:</p>
            <ul style={listStyle}>
              {[
                "Respond to your inquiries and provide customer support",
                "Provide property-related services and recommendations",
                "Contact you regarding listings, updates, or services",
                "Improve our website and user experience",
                "Send occasional updates about new properties (with your consent)",
              ].map((item) => (
                <li key={item} style={listItemStyle}>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 9,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#2563eb",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>4. Consent</h2>
            <p style={textStyle}>
              By using our website and submitting your details, you consent to the collection and use of your information as described in this policy. You have the right to withdraw your consent at any time by contacting us.
            </p>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>5. Data Sharing</h2>
            <p style={textStyle}>We do not sell, rent, or trade your personal data to third parties. We may share your data only:</p>
            <ul style={listStyle}>
              {[
                "With trusted service providers who assist in operating our website",
                "When required by law or to protect our legal rights",
                "With your explicit consent",
              ].map((item) => (
                <li key={item} style={listItemStyle}>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 9,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#2563eb",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>6. Data Security</h2>
            <p style={textStyle}>
              We implement reasonable security measures to protect your data from unauthorized access, misuse, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>7. Data Retention</h2>
            <p style={textStyle}>
              We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy or as required by applicable law.
            </p>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>8. Your Rights</h2>
            <p style={textStyle}>You have the right to:</p>
            <ul style={listStyle}>
              {[
                "Access your personal data held by us",
                "Request correction of inaccurate data",
                "Request deletion of your personal data",
                "Withdraw consent for data processing",
                "Lodge a complaint with a relevant authority",
              ].map((item) => (
                <li key={item} style={listItemStyle}>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 9,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#2563eb",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>9. Cookies</h2>
            <p style={textStyle}>
              Our website may use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>10. Third-Party Links</h2>
            <p style={textStyle}>
              Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.
            </p>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>11. Changes to This Policy</h2>
            <p style={textStyle}>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Changes will be posted on this page with an updated revision date.
            </p>
          </div>

          <div style={{ height: 1, background: "#f1f5f9", margin: "0 0 40px" }} />

          <div style={sectionStyle}>
            <h2 style={headingStyle}>12. Contact Us</h2>
            <p style={{ ...textStyle, marginBottom: 20 }}>
              If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please reach out to us:
            </p>
            <div
              style={{
                background: "linear-gradient(135deg, #f0f7ff 0%, #f8fafc 100%)",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: 0.5 }}>
                    Email
                  </div>
                  <a
                    href="mailto:propertybrokernagpur@gmail.com"
                    style={{
                      fontSize: 15,
                      color: "#1a3c5e",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    propertybrokernagpur@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ height: 1, background: "#e2e8f0" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: 0.5 }}>
                    Phone
                  </div>
                  <a
                    href="tel:+919921215145"
                    style={{
                      fontSize: 15,
                      color: "#1a3c5e",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    +91 99212 15145
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
