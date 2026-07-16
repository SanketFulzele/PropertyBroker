
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import FilterPage from "./pages/FilterPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import MetaPixel from "./components/MetaPixel";

export default function App() {
  return (
    <Router>
      <MetaPixel />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/property/:slug" element={<PropertyDetailsPage />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </Router>
  );
}