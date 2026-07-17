import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Share2, ExternalLink, MessageCircle, BookOpen } from "lucide-react";
import { Badge } from "../baseComponents";
import { GUIDE_ARTICLES } from "../data/guidesData";
import "../styles/guides.css";

export default function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const guide = GUIDE_ARTICLES.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <div style={{ padding: "200px 24px", textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <h2 style={{ fontSize: 24, color: "#1a3c5e", marginBottom: 12 }}>Guide Not Found</h2>
        <p style={{ color: "#64748b", marginBottom: 24 }}>The guide you are looking for does not exist.</p>
        <button
          onClick={() => navigate("/guides")}
          style={{ padding: "12px 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
        >
          Back to Guides
        </button>
      </div>
    );
  }

  const relatedGuides = GUIDE_ARTICLES.filter(
    (g) => g.slug !== guide.slug && g.categorySlug === guide.categorySlug
  ).slice(0, 3);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(guide.title);
    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(links[platform], "_blank", "width=600,height=400");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div>
      <a className="guides-detail-back" onClick={() => navigate("/guides")} style={{ cursor: "pointer" }}>
        <ArrowLeft size={16} />
        Back to Guides
      </a>

      {/* Hero */}
      <section className="guides-detail-hero">
        <img src={guide.coverImage} alt={guide.title} className="guides-detail-hero-image" />
        <div className="guides-detail-hero-overlay" />
        <div className="guides-detail-hero-content">
          <div className="guides-detail-hero-meta">
            <Badge text={guide.category} size={11} padding="5px 12px" />
            <span style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
              <Clock size={13} />
              {guide.readingTime}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
              {guide.publishDate}
            </span>
          </div>
          <h1 className="guides-detail-hero-title">{guide.title}</h1>
        </div>
      </section>

      {/* Body */}
      <div className="guides-detail-body">
        {/* Table of Contents */}
        <div className="guides-detail-toc">
          <h3 className="guides-detail-toc-title">Table of Contents</h3>
          <ul className="guides-detail-toc-list">
            {guide.content.map((section, i) => (
              <li key={i} className="guides-detail-toc-item">
                <a href={`#section-${i}`} className="guides-detail-toc-link">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Sections */}
        {guide.content.map((section, i) => (
          <div key={i} id={`section-${i}`} className="guides-detail-section">
            <h2 className="guides-detail-section-title">{section.title}</h2>
            <div className="guides-detail-section-content">{section.content}</div>

            {section.image && (
              <img src={section.image} alt={section.title} className="guides-detail-section-image" />
            )}

            {section.quote && (
              <div className="guides-detail-quote">
                <p>&ldquo;{section.quote}&rdquo;</p>
              </div>
            )}

            {section.tip && (
              <div className="guides-detail-tip">
                <div className="guides-detail-tip-label">Pro Tip</div>
                <p>{section.tip}</p>
              </div>
            )}

            {section.info && (
              <div className="guides-detail-info">
                <div className="guides-detail-info-label">Good to Know</div>
                <p>{section.info}</p>
              </div>
            )}
          </div>
        ))}

        {/* Share */}
        <div className="guides-detail-share">
          <span className="guides-detail-share-label">Share this guide:</span>
          <button className="guides-detail-share-btn" onClick={() => handleShare("facebook")} title="Share on Facebook">
            <ExternalLink size={16} />
          </button>
          <button className="guides-detail-share-btn" onClick={() => handleShare("twitter")} title="Share on Twitter">
            <MessageCircle size={16} />
          </button>
          <button className="guides-detail-share-btn" onClick={() => handleShare("linkedin")} title="Share on LinkedIn">
            <BookOpen size={16} />
          </button>
          <button className="guides-detail-share-btn" onClick={handleCopyLink} title="Copy link">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="guides-detail-related">
          <div className="guides-container">
            <h2 className="guides-detail-related-title">Related Guides</h2>
            <div className="guides-grid">
              {relatedGuides.map((rg) => (
                <div
                  key={rg.id}
                  className="guides-card"
                  onClick={() => navigate(`/guides/${rg.slug}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="guides-card-image-wrapper">
                    <img src={rg.coverImage} alt={rg.title} className="guides-card-image" />
                    <div className="guides-card-reading-time">
                      <Clock size={11} style={{ marginRight: 4, verticalAlign: "middle" }} />
                      {rg.readingTime}
                    </div>
                  </div>
                  <div className="guides-card-body">
                    <div className="guides-card-date">{rg.publishDate}</div>
                    <h3 className="guides-card-title">{rg.title}</h3>
                    <p className="guides-card-excerpt">{rg.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
