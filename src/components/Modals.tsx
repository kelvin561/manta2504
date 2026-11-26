import { useEffect } from 'react';
import { X } from 'lucide-react';
import { LanguageCurriculum, ProjectItem } from '../data/curriculum';
import { ResilientImage } from './ResilientImage';

interface StudyNotesModalProps {
  curriculum: LanguageCurriculum | null;
  onClose: () => void;
}

export function StudyNotesModal({ curriculum, onClose }: StudyNotesModalProps) {
  useEffect(() => {
    if (!curriculum) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [curriculum, onClose]);

  if (!curriculum) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="study-notes-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white border border-[#E5E7EB] shadow-xl p-6 lg:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
          <div>
            <p className="text-xs font-medium text-[#2563EB] mb-1">
              {curriculum.name} · Teaching Notes
            </p>
            <h3
              id="study-notes-title"
              className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111827]"
            >
              {curriculum.studyNotes.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close study notes"
            className="w-9 h-9 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-6 space-y-6">
          <p className="text-sm text-[#4B5563] leading-relaxed">
            {curriculum.studyNotes.summary}
          </p>

          <div className="space-y-4">
            {curriculum.studyNotes.keyConcepts.map((concept) => (
              <div
                key={concept.heading}
                className="p-4 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB]"
              >
                <h4 className="font-[family-name:var(--font-display)] text-sm font-bold text-[#111827] mb-1.5">
                  {concept.heading}
                </h4>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {concept.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]">
            <p className="text-xs font-semibold text-[#1D4ED8] mb-1">Hands-On Practice</p>
            <p className="text-sm text-[#1E3A8A] leading-relaxed">
              {curriculum.studyNotes.practicePrompt}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5E7EB] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-[#111827] hover:bg-[#1F2937] rounded-lg transition-colors"
          >
            Back to Studio
          </button>
        </div>
      </div>
    </div>
  );
}

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-[#E5E7EB] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-[16/9] max-h-[300px] w-full overflow-hidden bg-[#F3F4F6] border-b border-[#E5E7EB] relative">
          <ResilientImage
            src={project.image}
            alt={project.imageAlt}
            fallbackTitle={project.title}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white/95 border border-[#E5E7EB] flex items-center justify-center text-[#111827] hover:bg-white shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 lg:p-8 space-y-6">
          <div>
            <p className="text-xs font-medium text-[#2563EB] mb-1.5">{project.meta}</p>
            <h3
              id="project-modal-title"
              className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold text-[#111827] mb-3"
            >
              {project.title}
            </h3>
            <p className="text-sm lg:text-base text-[#4B5563] leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB]">
              <h4 className="text-xs font-semibold text-[#111827] mb-2.5">
                Concepts Taught
              </h4>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                {project.conceptsTaught.map((concept, idx) => (
                  <li key={concept} className="flex items-start gap-2">
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[#9CA3AF] mt-0.5 tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB]">
              <h4 className="text-xs font-semibold text-[#111827] mb-2.5">
                What Building &amp; Teaching This Taught Me
              </h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">{project.whatILearned}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#111827] mb-2">
              {project.sampleCodeTitle}
            </p>
            <pre className="p-4 rounded-xl bg-[#14161B] text-[#E5E7EB] text-xs leading-relaxed overflow-x-auto">
              <code>{project.sampleCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
