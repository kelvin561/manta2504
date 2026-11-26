import { ArrowRight } from 'lucide-react';
import { HERO_METRICS, PROFILE_INFO } from '../data/curriculum';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  return (
    <section id="top" className="pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E5E7EB] bg-[#FAFAFB]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left column: Typographic hierarchy */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#2563EB] tracking-normal mb-4">
                {PROFILE_INFO.roleKicker}
              </p>

              <h1
                className="font-[family-name:var(--font-display)] font-bold tracking-tight text-[#111827] leading-[1.08] mb-6"
                style={{
                  fontSize: 'clamp(2.35rem, 4.1vw, 3.65rem)',
                  textWrap: 'balance',
                }}
              >
                Learning in public, teaching code from first principles.
              </h1>

              <p className="text-base lg:text-[17px] text-[#4B5563] leading-[1.65] max-w-xl mb-8">
                I&apos;m {PROFILE_INFO.brandName}—a developer and hands-on educator deepening my craft in
                HTML, CSS, JavaScript, and Python while helping beginners write their first clean,
                confident programs.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#studio"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                <span>Explore Live Lessons</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                className="text-sm font-medium text-[#111827] hover:text-[#2563EB] transition-colors duration-150 underline underline-offset-4 decoration-[#D1D5DB] hover:decoration-[#2563EB] whitespace-nowrap shrink-0"
              >
                Read My Story
              </a>
            </div>
          </div>

          {/* Right column: Balanced editorial workspace image */}
          <div className="lg:col-span-6">
            <div className="h-full min-h-[300px] lg:min-h-[420px] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white">
              <ResilientImage
                src={PROFILE_INFO.heroImage}
                alt={PROFILE_INFO.heroImageAlt}
                fallbackTitle="Coding & Teaching Workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column summary strip directly below hero split */}
        <div className="mt-14 pt-10 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <p className="font-[family-name:var(--font-mono)] text-2xl font-semibold text-[#111827] tabular-nums">
                {metric.value}
              </p>
              <p className="text-sm font-semibold text-[#111827]">{metric.label}</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
