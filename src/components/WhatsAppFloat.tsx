import { useState } from "react";

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  const phoneNumber = "918381001406";

const message = encodeURIComponent(
  "Hello, I am interested in exploring your property listings. Kindly share more details.\n\nRegards,\n\nhttps://property-broker-ngp.vercel.app/"
);

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999,
        textDecoration: "none",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "all 0.3s ease",
          position: "relative",
        }}
      >
        {/* WhatsApp SVG ICON (Exact) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
        >
          <path d="M16 .4C7.3.4.4 7.3.4 16c0 2.8.7 5.5 2.1 7.9L.4 31.6l7.9-2.1c2.3 1.3 5 2.1 7.7 2.1 8.7 0 15.6-6.9 15.6-15.6S24.7.4 16 .4zm0 28.6c-2.4 0-4.7-.7-6.6-2l-.5-.3-4.7 1.3 1.3-4.6-.3-.5C3.9 20.7 3.2 18.4 3.2 16 3.2 9.1 9.1 3.2 16 3.2S28.8 9.1 28.8 16 22.9 29 16 29zm7.2-9.6c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.3-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.2 0-.5 0-.7 0-.2-.9-2.2-1.3-3-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.2 0 1.9 1.4 3.8 1.6 4 .2.3 2.8 4.3 6.9 6 .9.4 1.6.6 2.2.8.9.3 1.7.3 2.3.2.7-.1 2.4-1 2.7-2 .3-1 .3-1.9.2-2-.1-.1-.4-.2-.8-.4z" />
        </svg>

      </div>
    </a>
  );
}