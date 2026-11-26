import { ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/curriculum';
import { ResilientImage } from './ResilientImage';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-16 lg:py-24 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#2563EB] mb-3">
              Projects &amp; Teaching Kits
            </p>
            <h2
              className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]"
              style={{ textWrap: 'balance' }}
            >
              Workbooks, mini-apps, and notes built to learn and share.
            </h2>
          </div>
          <p className="text-sm text-[#6B7280] max-w-sm">
            Click any project to inspect the concepts taught, key takeaways, and starter code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project)}
              className="group text-left rounded-2xl bg-[#FAFAFB] border border-[#E5E7EB] hover:border-[#9CA3AF] overflow-hidden transition-colors duration-150 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F3F4F6] border-b border-[#E5E7EB]">
                <ResilientImage
                  src={project.image}
                  alt={project.imageAlt}
                  fallbackTitle={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#6B7280] mb-2">{project.meta}</p>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#111827] mb-2 group-hover:text-[#2563EB] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">{project.summary}</p>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-[#111827]">
                  <span>Inspect Lesson &amp; Code</span>
                  <ArrowUpRight className="w-4 h-4 text-[#2563EB]" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
