import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LearningResource } from '../types';
import {
  BookOpen,
  Video,
  FileText,
  Code2,
  ExternalLink,
  Sparkles,
  Filter,
  CheckCircle,
} from 'lucide-react';

export const ResourcesView: React.FC = () => {
  const { roadmap, profile } = useApp();
  const [selectedType, setSelectedType] = useState<string>('All');

  // Flatten all curated resources across all phases and milestones
  const allResources: { resource: LearningResource; milestoneTitle: string; skill: string }[] = [];

  roadmap.phases.forEach((p) => {
    p.milestones.forEach((m) => {
      m.resources?.forEach((r) => {
        allResources.push({
          resource: r,
          milestoneTitle: m.title,
          skill: m.skill,
        });
      });
    });
  });

  const filtered =
    selectedType === 'All'
      ? allResources
      : allResources.filter((item) => item.resource.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return Video;
      case 'Documentation':
      case 'Article':
        return FileText;
      case 'Practice':
      case 'Project':
        return Code2;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Curated Syllabus
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Signal Over Noise</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Recommended Learning Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Hand-selected by AI specifically to address your gaps without content overload.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {['All', 'Practice', 'Video', 'Article', 'Documentation'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedType === type
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(({ resource, milestoneTitle, skill }, idx) => {
          const Icon = getTypeIcon(resource.type);

          return (
            <div
              key={resource.id || idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {resource.type}
                    </span>
                    <span className="text-xs font-semibold text-cyan-400">{skill}</span>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    ~{resource.estimatedMinutes} mins
                  </span>
                </div>

                <h3 className="font-bold text-white text-base mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {resource.title}
                </h3>

                <p className="text-xs text-slate-400 mb-4 line-clamp-1">
                  Target milestone: <span className="text-slate-300">{milestoneTitle}</span>
                </p>

                {/* Reason why AI selected it */}
                <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/60 text-xs text-slate-300 mb-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px]">
                    <Sparkles className="h-3 w-3" />
                    <span>Why SkillPilot Selected This:</span>
                  </div>
                  <p className="leading-relaxed text-slate-400 italic">
                    "{resource.selectionReason}"
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <span className="text-xs font-mono text-slate-400">{resource.platform}</span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
