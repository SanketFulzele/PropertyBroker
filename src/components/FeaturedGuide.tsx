import { useNavigate } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "../baseComponents";
import type { GuideArticle } from "../types/types";

interface Props {
  guide: GuideArticle;
}

export default function FeaturedGuide({ guide }: Props) {
  const navigate = useNavigate();

  return (
    <div className="guides-featured" onClick={() => navigate(`/guides/${guide.slug}`)} style={{ cursor: "pointer" }}>
      <img
        src={guide.coverImage}
        alt={guide.title}
        className="guides-featured-image"
      />
      <div className="guides-featured-body">
        <div className="guides-featured-meta">
          <Badge text={guide.category} size={11} padding="5px 12px" />
          <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#94a3b8", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
            <Clock size={13} />
            {guide.readingTime}
          </span>
          <span style={{ color: "#94a3b8", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
            {guide.publishDate}
          </span>
        </div>
        <h2 className="guides-featured-title">{guide.title}</h2>
        <p className="guides-featured-desc">{guide.description}</p>
        <button className="guides-featured-btn" onClick={(e) => { e.stopPropagation(); navigate(`/guides/${guide.slug}`); }}>
          Read Guide <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
