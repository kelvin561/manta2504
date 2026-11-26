import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { HeroSection } from './components/HeroSection';
import { LanguageStudio } from './components/LanguageStudio';
import { ProjectDetailModal, StudyNotesModal } from './components/Modals';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { LanguageCurriculum, PROFILE_INFO, ProjectItem } from './data/curriculum';

export default function App() {
  const [activeStudyNotes, setActiveStudyNotes] = useState<LanguageCurriculum | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFB] text-[#111827]">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <LanguageStudio onOpenStudyNotes={setActiveStudyNotes} />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <ContactSection />
      </main>

      <footer className="border-t border-[#E5E7EB] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-[#111827]">© 2026 {PROFILE_INFO.brandName}</span>
            <span aria-hidden="true">·</span>
            <span>Learning &amp; Teaching HTML, CSS, JavaScript &amp; Python</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-[#111827] transition-colors">
              About
            </a>
            <a href="#studio" className="hover:text-[#111827] transition-colors">
              Lessons
            </a>
            <a href="#projects" className="hover:text-[#111827] transition-colors">
              Projects
            </a>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="hover:text-[#111827] transition-colors"
            >
              {PROFILE_INFO.email}
            </a>
          </div>
        </div>
      </footer>

      <StudyNotesModal
        curriculum={activeStudyNotes}
        onClose={() => setActiveStudyNotes(null)}
      />
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
