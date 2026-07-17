
import { lazy, Suspense } from "react";
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

const GuidesPage = lazy(() => import("./pages/GuidesPage"));
const GuideDetailPage = lazy(() => import("./pages/GuideDetailPage"));

function LazyFallback() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", fontFamily: "'DM Sans', sans-serif", color: "#64748b" }}>
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MetaPixel />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/property-list" element={<FilterPage />} />
        <Route path="/property/:slug" element={<PropertyDetailsPage />} />
        <Route
          path="/guides"
          element={
            <Suspense fallback={<LazyFallback />}>
              <GuidesPage />
            </Suspense>
          }
        />
        <Route
          path="/guides/:slug"
          element={
            <Suspense fallback={<LazyFallback />}>
              <GuideDetailPage />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </Router>
  );
}