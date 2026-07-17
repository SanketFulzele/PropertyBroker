import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "../types/types";

interface Props {
  faqs: FAQ[];
}

export default function GuidesFAQ({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="guides-faq-list">
      {faqs.map((faq, i) => (
        <div key={i} className="guides-faq-item">
          <button className="guides-faq-question" onClick={() => toggle(i)}>
            <span className="guides-faq-question-text">{faq.question}</span>
            <ChevronDown
              size={18}
              className={`guides-faq-chevron ${openIndex === i ? "guides-faq-chevron-open" : ""}`}
            />
          </button>
          {openIndex === i && (
            <div className="guides-faq-answer">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
