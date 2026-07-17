import { useState } from "react";
import { Search } from "lucide-react";

interface Props {
  onSearch: (query: string) => void;
}

export default function GuidesHeroSection({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="guides-hero">
      <div className="guides-hero-bg" />
      <div className="guides-hero-pattern" />
      <div className="guides-hero-content">
        <div className="guides-hero-badge">Knowledge Center</div>
        <h1 className="guides-hero-title">
          Property Guides & <span>Knowledge Center</span>
        </h1>
        <p className="guides-hero-subtitle">
          Everything you need to know about buying, selling, investing, financing, and legally owning property in Nagpur.
        </p>
        <form className="guides-search" onSubmit={handleSubmit}>
          <span className="guides-search-icon">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search guides..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <button type="submit" className="guides-search-btn">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
