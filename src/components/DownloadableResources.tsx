import { ClipboardList, FileCheck, FileText, ClipboardCheck, Download } from "lucide-react";
import type { DownloadableResource } from "../types/types";

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  ClipboardList,
  FileCheck,
  FileText,
  ClipboardCheck,
};

interface Props {
  resources: DownloadableResource[];
}

export default function DownloadableResources({ resources }: Props) {
  const handleDownload = (title: string) => {
    alert(`Coming Soon: ${title}`);
  };

  return (
    <div className="guides-resources-grid">
      {resources.map((res) => {
        const Icon = ICON_MAP[res.icon] || FileText;
        return (
          <div key={res.id} className="guides-resource-card">
            <div className="guides-resource-icon">
              <Icon size={24} color="#2563eb" />
            </div>
            <h4 className="guides-resource-title">{res.title}</h4>
            <p className="guides-resource-desc">{res.description}</p>
            <button className="guides-resource-btn" onClick={() => handleDownload(res.title)}>
              <Download size={14} />
              Download PDF
            </button>
          </div>
        );
      })}
    </div>
  );
}
