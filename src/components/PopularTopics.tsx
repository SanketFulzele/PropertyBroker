interface Props {
  topics: string[];
  activeTopic?: string;
  onTopicClick: (topic: string) => void;
}

export default function PopularTopics({ topics, activeTopic, onTopicClick }: Props) {
  return (
    <div className="guides-topics">
      {topics.map((topic) => (
        <button
          key={topic}
          className="guides-topic-chip"
          style={activeTopic === topic ? { background: "#eff6ff", color: "#2563eb", borderColor: "#bfdbfe" } : {}}
          onClick={() => onTopicClick(topic)}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}
