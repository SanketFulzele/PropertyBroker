import { useNavigate } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "../baseComponents";
import type { GuideArticle } from "../types/types";

interface Props {
  guides: GuideArticle[];
}

export default function GuidesGrid({ guides }: Props) {
  const navigate = useNavigate();

  return (
    <div className="guides-grid">
      {guides.map((guide) => (
        <div
          key={guide.id}
          className="guides-card"
          onClick={() => navigate(`/guides/${guide.slug}`)}
        >
          <div className="guides-card-image-wrapper">
            <img
              src={guide.coverImage}
              alt={guide.title}
              className="guides-card-image"
            />
            <div className="guides-card-badge">
              <Badge text={guide.category} size={10} padding="4px 10px" />
            </div>
            <div className="guides-card-reading-time">
              <Clock size={11} style={{ marginRight: 4, verticalAlign: "middle" }} />
              {guide.readingTime}
            </div>
          </div>
          <div className="guides-card-body">
            <div className="guides-card-date">{guide.publishDate}</div>
            <h3 className="guides-card-title">{guide.title}</h3>
            <p className="guides-card-excerpt">{guide.excerpt}</p>
            <span className="guides-card-link">
              Read More <ArrowRight size={14} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
