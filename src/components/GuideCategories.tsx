import { useNavigate } from "react-router-dom";
import { Home, TrendingUp, PieChart, Landmark, Scale, UserCheck } from "lucide-react";
import type { GuideCategory } from "../types/types";

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  Home,
  TrendingUp,
  PieChart,
  Landmark,
  Scale,
  UserCheck,
};

interface Props {
  categories: GuideCategory[];
}

export default function GuideCategories({ categories }: Props) {
  const navigate = useNavigate();

  return (
    <div className="guides-categories-grid">
      {categories.map((cat) => {
        const Icon = ICON_MAP[cat.icon] || Home;
        return (
          <div
            key={cat.id}
            className="guides-category-card"
            onClick={() => navigate(`/guides?category=${cat.slug}`)}
          >
            <div className="guides-category-icon">
              <Icon size={28} color="#2563eb" />
            </div>
            <h3 className="guides-category-title">{cat.title}</h3>
            <p className="guides-category-desc">{cat.description}</p>
            <span className="guides-category-count">{cat.articleCount} Articles</span>
          </div>
        );
      })}
    </div>
  );
}
