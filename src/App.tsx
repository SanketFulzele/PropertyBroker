
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<Privacy />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </Router>
  );
}