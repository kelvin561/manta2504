import { useState } from 'react';
import {
  LEARNING_MILESTONES,
  PROFILE_INFO,
  TEACHING_MILESTONES,
} from '../data/curriculum';
import { ResilientImage } from './ResilientImage';

type TimelineMode = 'learning' | 'teaching';

export function AboutSection() {
  const [timelineMode, setTimelineMode] = useState<TimelineMode>('learning');

  const activeMilestones =
    timelineMode === 'learning' ? LEARNING_MILESTONES : TEACHING_MILESTONES;

  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Portrait + Clean Key-Value Bio Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-[3/4] max-h-[460px] w-full rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F3F4F6]">
              <ResilientImage
                src={PROFILE_INFO.portraitImage}
                alt={PROFILE_INFO.portraitImageAlt}
                fallbackTitle={PROFILE_INFO.brandName}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <dl className="divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB] text-sm">
              <div className="py-3 flex items-baseline justify-between gap-4">
                <dt className="text-[#6B7280] shrink-0">Core Stack</dt>
                <dd className="font-medium text-[#111827] text-right">
                  HTML · CSS · JavaScript · Python
                </dd>
              </div>
              <div className="py-3 flex items-baseline justify-between gap-4">
                <dt className="text-[#6B7280] shrink-0">Teaching Style</dt>
                <dd className="font-medium text-[#111827] text-right">
                  Live examples, plain language &amp; drills
                </dd>
              </div>
              <div className="py-3 flex items-baseline justify-between gap-4">
                <dt className="text-[#6B7280] shrink-0">Direct Email</dt>
                <dd className="font-[family-name:var(--font-mono)] text-xs text-[#2563EB] text-right">
                  <a href={`mailto:${PROFILE_INFO.email}`} className="hover:underline">
                    {PROFILE_INFO.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Narrative & Interactive Learning/Teaching Timeline */}
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#2563EB] mb-3">About Me</p>
            <h2
              className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Why I learn and teach programming side by side.
            </h2>

            <div className="space-y-4 text-[15.5px] text-[#4B5563] leading-[1.7] max-w-2xl mb-10">
              <p>
                Writing code used to feel intimidating until I started breaking every concept down
                into small, visible steps. Today, I practice software engineering every day while
                passing those exact mental models on to new learners.
              </p>
              <p>
                Whether I&apos;m structuring accessible markup in HTML, refining responsive CSS
                layouts, building interactive state in JavaScript, or solving algorithmic puzzles in
                Python, teaching keeps my fundamentals honest. If I can explain a concept clearly to
                a beginner, I truly understand it.
              </p>
            </div>

            {/* Dual Philosophy Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-10 mb-10 border-b border-[#E5E7EB]">
              <div className="p-5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB]">
                <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[#111827] mb-2">
                  01. Learning by Building
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  I test every new concept by writing small working utilities—inspecting edge cases,
                  reading docs carefully, and documenting what tripped me up.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-[#FAFAFB] border border-[#E5E7EB]">
                <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[#111827] mb-2">
                  02. Teaching for Clarity
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  My lessons skip jargon. Beginners learn why code works line by line through live
                  experiments they can modify and break safely.
                </p>
              </div>
            </div>

            {/* Interactive Timeline Switcher */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#111827]">
                  Journey &amp; Teaching Log
                </h3>

                <div
                  className="inline-flex items-center p-1 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB]"
                  role="tablist"
                  aria-label="Timeline track"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={timelineMode === 'learning'}
                    onClick={() => setTimelineMode('learning')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                      timelineMode === 'learning'
                        ? 'bg-white text-[#111827] shadow-xs'
                        : 'text-[#6B7280] hover:text-[#111827]'
                    }`}
                  >
                    Learning Path
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={timelineMode === 'teaching'}
                    onClick={() => setTimelineMode('teaching')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                      timelineMode === 'teaching'
                        ? 'bg-white text-[#111827] shadow-xs'
                        : 'text-[#6B7280] hover:text-[#111827]'
                    }`}
                  >
                    Teaching Milestones
                  </button>
                </div>
              </div>

              <div className="divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB]">
                {activeMilestones.map((item) => (
                  <div
                    key={`${timelineMode}-${item.period}-${item.title}`}
                    className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-3 flex items-center gap-2 text-xs text-[#6B7280]">
                      <span className="font-[family-name:var(--font-mono)] tabular-nums font-medium text-[#111827]">
                        {item.period}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.language}</span>
                    </div>
                    <div className="sm:col-span-9">
                      <h4 className="text-sm font-semibold text-[#111827] mb-1">{item.title}</h4>
                      <p className="text-sm text-[#4B5563] leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
