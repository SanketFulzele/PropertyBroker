import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/hooks";
import { GUIDE_CATEGORIES, GUIDE_ARTICLES, POPULAR_TOPICS, DOWNLOADABLE_RESOURCES, GUIDES_FAQS } from "../data/guidesData";
import GuidesHeroSection from "../components/GuidesHeroSection";
import FeaturedGuide from "../components/FeaturedGuide";
import GuideCategories from "../components/GuideCategories";
import GuidesGrid from "../components/GuidesGrid";
import PopularTopics from "../components/PopularTopics";
import DownloadableResources from "../components/DownloadableResources";
import GuidesNewsletter from "../components/GuidesNewsletter";
import GuidesFAQ from "../components/GuidesFAQ";
import GuidesCTA from "../components/GuidesCTA";
import "../styles/guides.css";

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {children}
    </div>
  );
}

export default function GuidesPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | undefined>(categoryParam || undefined);

  const featuredGuide = GUIDE_ARTICLES.find((g) => g.featured);

  const filteredGuides = useMemo(() => {
    let guides = GUIDE_ARTICLES.filter((g) => !g.featured);

    if (activeTopic) {
      const topicLower = activeTopic.toLowerCase();
      guides = guides.filter(
        (g) =>
          g.tags.some((t) => t.toLowerCase().includes(topicLower)) ||
          g.categorySlug.includes(topicLower) ||
          g.category.toLowerCase().includes(topicLower)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      guides = guides.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q)) ||
          g.category.toLowerCase().includes(q)
      );
    }

    return guides;
  }, [activeTopic, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTopic(undefined);
  };

  const handleTopicClick = (topic: string) => {
    if (activeTopic === topic) {
      setActiveTopic(undefined);
    } else {
      setActiveTopic(topic);
      setSearchQuery("");
    }
  };

  return (
    <div>
      <GuidesHeroSection onSearch={handleSearch} />

      {/* Featured Guide */}
      {featuredGuide && (
        <section className="guides-section-light">
          <div className="guides-container">
            <AnimatedSection>
              <div className="guides-section-header">
                <h2 className="guides-section-title">Featured Guide</h2>
                <p className="guides-section-subtitle">
                  Our most popular and comprehensive guide to help you get started.
                </p>
              </div>
              <FeaturedGuide guide={featuredGuide} />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Guide Categories */}
      <section className="guides-section">
        <div className="guides-container">
          <AnimatedSection>
            <div className="guides-section-header">
              <h2 className="guides-section-title">Explore by Category</h2>
              <p className="guides-section-subtitle">
                Find guides tailored to your specific needs and interests.
              </p>
            </div>
            <GuideCategories categories={GUIDE_CATEGORIES} />
          </AnimatedSection>
        </div>
      </section>

      {/* Latest Guides */}
      <section className="guides-section-light">
        <div className="guides-container">
          <AnimatedSection>
            <div className="guides-section-header">
              <h2 className="guides-section-title">
                {activeTopic ? `${activeTopic} Guides` : searchQuery ? "Search Results" : "Latest Guides"}
              </h2>
              <p className="guides-section-subtitle">
                {filteredGuides.length} guide{filteredGuides.length !== 1 ? "s" : ""} available
              </p>
            </div>
            <GuidesGrid guides={filteredGuides} />
          </AnimatedSection>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="guides-section">
        <div className="guides-container">
          <AnimatedSection>
            <div className="guides-section-header">
              <h2 className="guides-section-title">Popular Topics</h2>
              <p className="guides-section-subtitle">
                Quickly find guides on the topics that matter most to you.
              </p>
            </div>
            <PopularTopics
              topics={POPULAR_TOPICS}
              activeTopic={activeTopic}
              onTopicClick={handleTopicClick}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="guides-section-light">
        <div className="guides-container">
          <AnimatedSection>
            <div className="guides-section-header">
              <h2 className="guides-section-title">Free Downloadable Resources</h2>
              <p className="guides-section-subtitle">
                Checklists and templates to make your property journey smoother.
              </p>
            </div>
            <DownloadableResources resources={DOWNLOADABLE_RESOURCES} />
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter */}
      <section className="guides-section">
        <div className="guides-container-narrow">
          <AnimatedSection>
            <GuidesNewsletter />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="guides-section-light">
        <div className="guides-container-narrow">
          <AnimatedSection>
            <div className="guides-section-header">
              <h2 className="guides-section-title">Frequently Asked Questions</h2>
              <p className="guides-section-subtitle">
                Quick answers to the most common property questions.
              </p>
            </div>
            <GuidesFAQ faqs={GUIDES_FAQS} />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="guides-section">
        <div className="guides-container-narrow">
          <AnimatedSection>
            <GuidesCTA />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
