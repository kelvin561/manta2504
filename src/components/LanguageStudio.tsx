import { useEffect, useState } from 'react';
import { BookOpen, Play, RotateCcw } from 'lucide-react';
import {
  LANGUAGES_CURRICULUM,
  LanguageCurriculum,
  LanguageKey,
} from '../data/curriculum';
import { runPythonSnippet } from '../utils/pythonRunner';

interface LanguageStudioProps {
  onOpenStudyNotes: (curriculum: LanguageCurriculum) => void;
}

const LANGUAGE_ORDER: LanguageKey[] = ['html', 'css', 'javascript', 'python'];

function buildCssPreviewHtml(css: string, presetId: string): string {
  const markup =
    presetId === 'css-flex'
      ? `<div class="toolbar">
          <div class="brand">K. Kiptoo Studio</div>
          <div class="actions">
            <button class="btn" type="button">Lessons</button>
          </div>
        </div>`
      : `<div class="lesson-grid">
          <div class="lesson-card highlight">
            <h3>Box Model</h3>
            <p>Padding creates space inside the border.</p>
          </div>
          <div class="lesson-card">
            <h3>CSS Grid</h3>
            <p>Two equal columns with a clean 12px gap.</p>
          </div>
          <div class="lesson-card">
            <h3>Typography</h3>
            <p>Consistent spacing improves reading comfort.</p>
          </div>
          <div class="lesson-card">
            <h3>Contrast</h3>
            <p>Dark ink on light paper keeps text sharp.</p>
          </div>
        </div>`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { margin: 0; padding: 16px; background: #f9fafb; font-family: system-ui, sans-serif; }
      ${css}
    </style>
  </head>
  <body>${markup}</body>
</html>`;
}

function buildHtmlPreviewDoc(html: string): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { margin: 0; padding: 16px; background: #f9fafb; font-family: system-ui, sans-serif; }
    </style>
  </head>
  <body>${html}</body>
</html>`;
}

export function LanguageStudio({ onOpenStudyNotes }: LanguageStudioProps) {
  const [activeLang, setActiveLang] = useState<LanguageKey>('html');
  const curriculum = LANGUAGES_CURRICULUM[activeLang];

  const [presetIndex, setPresetIndex] = useState(0);
  const activePreset = curriculum.presets[presetIndex] ?? curriculum.presets[0];

  const [code, setCode] = useState(activePreset.code);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [execError, setExecError] = useState<string | null>(null);
  const [execDurationMs, setExecDurationMs] = useState<number | null>(null);

  const selectLanguage = (lang: LanguageKey) => {
    setActiveLang(lang);
    setPresetIndex(0);
    const firstPreset = LANGUAGES_CURRICULUM[lang].presets[0];
    setCode(firstPreset.code);
    setConsoleLines([]);
    setExecError(null);
    setExecDurationMs(null);
  };

  const selectPreset = (idx: number) => {
    setPresetIndex(idx);
    const nextPreset = curriculum.presets[idx];
    setCode(nextPreset.code);
    setConsoleLines([]);
    setExecError(null);
    setExecDurationMs(null);
  };

  const handleReset = () => {
    setCode(activePreset.code);
    setConsoleLines([]);
    setExecError(null);
    setExecDurationMs(null);
  };

  const handleRunCode = () => {
    const started = performance.now();

    if (activeLang === 'javascript') {
      const captured: string[] = [];
      const mockConsole = {
        log: (...args: unknown[]) => {
          captured.push(
            args
              .map((arg) =>
                typeof arg === 'object' && arg !== null
                  ? JSON.stringify(arg)
                  : String(arg)
              )
              .join(' ')
          );
        },
      };

      try {
        const fn = new Function('console', code);
        fn(mockConsole);
        setConsoleLines(
          captured.length > 0 ? captured : ['(Code ran with no console output)']
        );
        setExecError(null);
      } catch (err) {
        setConsoleLines(captured);
        setExecError(err instanceof Error ? err.message : 'JavaScript runtime error');
      }
      setExecDurationMs(Math.max(1, Math.round(performance.now() - started)));
      return;
    }

    if (activeLang === 'python') {
      const result = runPythonSnippet(code);
      setConsoleLines(
        result.output.length > 0 || result.error
          ? result.output
          : ['(Script finished with no print output)']
      );
      setExecError(result.error);
      setExecDurationMs(Math.max(1, Math.round(performance.now() - started)));
    }
  };

  // Auto-run JS & Python on preset switch so output is immediately populated
  useEffect(() => {
    if (activeLang === 'javascript' || activeLang === 'python') {
      handleRunCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLang, presetIndex]);

  return (
    <section id="languages" className="py-16 lg:py-24 bg-[#FAFAFB] border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-[#2563EB] mb-3">
            Languages I Learn &amp; Teach
          </p>
          <h2
            className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] mb-4"
            style={{ textWrap: 'balance' }}
          >
            Four foundational languages, practiced and taught hands-on.
          </h2>
          <p className="text-[15.5px] text-[#4B5563] leading-relaxed">
            Select any language below to inspect what I am currently studying, what I teach
            beginners, and experiment directly in the live code studio.
          </p>
        </div>

        {/* 4-Card Language Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {LANGUAGE_ORDER.map((langKey, idx) => {
            const item = LANGUAGES_CURRICULUM[langKey];
            const isSelected = activeLang === langKey;

            return (
              <button
                key={langKey}
                type="button"
                onClick={() => selectLanguage(langKey)}
                className={`text-left p-6 rounded-xl border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  isSelected
                    ? 'bg-white border-[#2563EB] shadow-sm'
                    : 'bg-white border-[#E5E7EB] hover:border-[#9CA3AF]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs font-medium text-[#6B7280] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-medium text-[#4B5563]">
                    {item.roleLabel}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#111827] mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{item.tagline}</p>
              </button>
            );
          })}
        </div>

        {/* Interactive Teaching & Learning Studio */}
        <div
          id="studio"
          className="rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden"
        >
          {/* Studio Header Bar */}
          <div className="px-6 py-4 border-b border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4 bg-[#FAFAFB]">
            <div className="flex items-center gap-3">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[#111827]">
                Interactive Lesson Studio
              </h3>
              <span className="text-xs text-[#6B7280]" aria-hidden="true">
                ·
              </span>
              <span className="text-xs font-medium text-[#4B5563]">
                {curriculum.name} Track
              </span>
            </div>

            <div
              className="inline-flex items-center p-1 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB]"
              role="tablist"
              aria-label="Select programming language"
            >
              {LANGUAGE_ORDER.map((langKey) => (
                <button
                  key={langKey}
                  type="button"
                  role="tab"
                  aria-selected={activeLang === langKey}
                  onClick={() => selectLanguage(langKey)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    activeLang === langKey
                      ? 'bg-white text-[#111827] shadow-xs'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  {LANGUAGES_CURRICULUM[langKey].name}
                </button>
              ))}
            </div>
          </div>

          {/* Studio Body: Left Curriculum + Right Live Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Learning & Teaching Details */}
            <div className="lg:col-span-5 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-[#E5E7EB] flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-medium text-[#2563EB] mb-1">
                    {curriculum.roleLabel}
                  </p>
                  <h4 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#111827]">
                    {curriculum.name}
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB]">
                    <p className="text-xs font-semibold text-[#111827] mb-1.5">
                      What I&apos;m Learning Now
                    </p>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                      {curriculum.learningNow}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB]">
                    <p className="text-xs font-semibold text-[#111827] mb-1.5">
                      What I Teach Beginners
                    </p>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                      {curriculum.teachingToOthers}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#111827] mb-3">
                    Core Topics Covered
                  </p>
                  <ul className="space-y-2 text-sm text-[#4B5563]">
                    {curriculum.topics.map((topic, index) => (
                      <li key={topic} className="flex items-start gap-2.5">
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[#9CA3AF] mt-0.5 tabular-nums">
                          0{index + 1}.
                        </span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onOpenStudyNotes(curriculum)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#111827] bg-white border border-[#D1D5DB] hover:border-[#111827] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  <BookOpen className="w-4 h-4 text-[#2563EB]" />
                  <span>Read {curriculum.name} Study Notes</span>
                </button>
              </div>
            </div>

            {/* Right Column: Live Editable Code & Output */}
            <div className="lg:col-span-7 flex flex-col bg-[#14161B] text-[#F9FAFB]">
              {/* Sandbox Toolbar */}
              <div className="px-5 py-3.5 border-b border-[#262932] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {curriculum.presets.map((preset, idx) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => selectPreset(idx)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                        presetIndex === idx
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-[#1E2129] text-[#9CA3AF] hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D1D5DB] hover:text-white bg-[#1E2129] hover:bg-[#2A2E39] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>

                  {(activeLang === 'javascript' || activeLang === 'python') && (
                    <button
                      type="button"
                      onClick={handleRunCode}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Run {curriculum.name}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Lesson Caption */}
              <div className="px-5 py-2.5 border-b border-[#262932] bg-[#191C23] flex items-center justify-between gap-4 text-xs text-[#9CA3AF]">
                <span>{activePreset.description}</span>
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#6B7280] shrink-0">
                  Editable
                </span>
              </div>

              {/* Code Textarea */}
              <div className="p-4 border-b border-[#262932]">
                <label htmlFor="live-code-editor" className="sr-only">
                  {curriculum.name} code editor
                </label>
                <textarea
                  id="live-code-editor"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  rows={10}
                  className="code-editor w-full bg-[#0F1115] text-[#E5E7EB] text-[13px] leading-[1.6] p-4 rounded-lg border border-[#262932] focus:border-[#2563EB] focus:outline-none resize-y"
                />
              </div>

              {/* Output / Preview Pane */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-medium text-[#9CA3AF]">
                    {activeLang === 'html' || activeLang === 'css'
                      ? 'Live Browser Preview'
                      : 'Program Output'}
                  </span>
                  {execDurationMs !== null &&
                    (activeLang === 'javascript' || activeLang === 'python') && (
                      <span className="font-[family-name:var(--font-mono)] text-[11px] text-[#9CA3AF] tabular-nums">
                        Executed in {execDurationMs}ms
                      </span>
                    )}
                </div>

                {activeLang === 'html' && (
                  <iframe
                    title="Live HTML Output"
                    sandbox=""
                    srcDoc={buildHtmlPreviewDoc(code)}
                    className="w-full min-h-[220px] rounded-lg bg-[#F9FAFB] border border-[#262932]"
                  />
                )}

                {activeLang === 'css' && (
                  <iframe
                    title="Live CSS Output"
                    sandbox=""
                    srcDoc={buildCssPreviewHtml(code, activePreset.id)}
                    className="w-full min-h-[220px] rounded-lg bg-[#F9FAFB] border border-[#262932]"
                  />
                )}

                {(activeLang === 'javascript' || activeLang === 'python') && (
                  <div className="rounded-lg bg-[#0F1115] border border-[#262932] p-4 min-h-[150px] font-[family-name:var(--font-mono)] text-[13px] leading-relaxed">
                    {consoleLines.map((line, i) => (
                      <div key={`${i}-${line}`} className="text-[#E5E7EB] py-0.5">
                        <span className="text-[#6B7280] select-none mr-2">&gt;</span>
                        {line}
                      </div>
                    ))}
                    {execError && (
                      <div className="mt-2 text-[#F87171] text-xs">
                        Error: {execError}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
