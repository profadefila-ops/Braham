import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface ClientExperienceSectionProps {
  onQuoteClick?: () => void;
}

export const ClientExperienceSection: React.FC<ClientExperienceSectionProps> = ({
  onQuoteClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.standards-heading-block',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.bento-col',
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.standards-bento-grid',
            start: 'top 84%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="client-experience-section"
      className="bg-[#F9F9F8] text-[#0D0D0D] pt-12 sm:pt-16 pb-20 sm:pb-28 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Metadata Strip */}
        <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono text-[#52524E] mb-10 sm:mb-14">
          <span className="font-bold text-black">[06]</span>
          <span className="tracking-widest uppercase">// STUDIO STANDARDS</span>
          <span className="font-bold text-black tracking-wider uppercase">DIGITAL CRAFT</span>
        </div>

        {/* Section Headline & Narrative */}
        <div className="standards-heading-block grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-sans uppercase tracking-[-0.04em] leading-[0.92] text-[#0A0A0A]">
              STUDIO
              <br />
              STANDARDS
            </h2>
          </div>

          <div className="lg:col-span-6 flex justify-start lg:justify-end">
            <p className="max-w-lg text-base sm:text-lg text-[#1F1F1E] font-normal leading-relaxed">
              How Braham approaches every collaboration: uncompromising craft, intentional design, and digital experiences that build{' '}
              <span className="font-medium text-black underline decoration-lime-500 decoration-2 underline-offset-4">
                lasting brand value
              </span>
              .
            </p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="standards-bento-grid grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Column 1: Striking Editorial Portrait Photo */}
          <div className="bento-col lg:col-span-4 rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-200 min-h-[380px] lg:min-h-full border border-black/[0.08] relative group shadow-sm">
            <img
              src="https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/u783.webp"
              alt="Editorial Portrait"
              className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Column 2: REAL IMPACT + 2x2 Craft Standards Grid */}
          <div className="bento-col lg:col-span-4 flex flex-col justify-between bg-white border border-black/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-sans uppercase text-[#0A0A0A] tracking-tight leading-tight mb-3">
                PURPOSEFUL DESIGN. INTENTIONAL CODE. ZERO SHORTCUTS.
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#52524E] leading-relaxed mb-8">
                Bespoke design systems, responsive performance, and thoughtful interactions — every website is engineered with care, purpose, and visual distinction.
              </p>
            </div>

            {/* 2x2 Studio Standards Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-black/[0.08]">
              {/* Standard 1 */}
              <div className="pb-2">
                <div className="text-3xl sm:text-4xl font-black font-sans text-[#0A0A0A] tracking-tight mb-1">
                  <NumberCounter value={1} padZero duration={1.2} delay={0.1} />
                </div>
                <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#666]">
                  BESPOKE DESIGN
                </div>
              </div>

              {/* Standard 2 */}
              <div className="pb-2">
                <div className="text-3xl sm:text-4xl font-black font-sans text-[#0A0A0A] tracking-tight mb-1">
                  <NumberCounter value={2} padZero duration={1.2} delay={0.2} />
                </div>
                <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#666]">
                  FLUID MOTION
                </div>
              </div>

              {/* Standard 3 */}
              <div className="pt-2 border-t border-black/[0.06]">
                <div className="text-3xl sm:text-4xl font-black font-sans text-[#0A0A0A] tracking-tight mb-1">
                  <NumberCounter value={3} padZero duration={1.2} delay={0.3} />
                </div>
                <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#666]">
                  HIGH PERFORMANCE
                </div>
              </div>

              {/* Standard 4 */}
              <div className="pt-2 border-t border-black/[0.06]">
                <div className="text-3xl sm:text-4xl font-black font-sans text-[#0A0A0A] tracking-tight mb-1">
                  <NumberCounter value={4} padZero duration={1.2} delay={0.4} />
                </div>
                <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#666]">
                  DIRECT ACCESS
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Top Standards Bar + Studio Perspective Card */}
          <div className="bento-col lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Top 2 Standards Pill Cards with Counting Animation */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-black/[0.08] rounded-2xl p-5 shadow-sm transition-all duration-300 hover:border-black/20">
                <div className="text-2xl sm:text-3xl font-black font-sans text-[#0A0A0A] tracking-tight mb-1">
                  <NumberCounter value={100} suffix="%" duration={1.8} delay={0.1} />
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#666]">
                  BESPOKE CRAFT
                </div>
              </div>

              <div className="bg-white border border-black/[0.08] rounded-2xl p-5 shadow-sm transition-all duration-300 hover:border-black/20">
                <div className="text-2xl sm:text-3xl font-black font-sans text-[#0A0A0A] tracking-tight mb-1">
                  <NumberCounter value={24} suffix="/7" duration={1.6} delay={0.25} />
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#666]">
                  DIRECT ACCESS
                </div>
              </div>
            </div>

            {/* Main Studio Perspective Card */}
            <div
              onClick={onQuoteClick}
              className="flex-grow flex flex-col justify-between bg-white border border-black/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm cursor-pointer hover:border-black/25 hover:shadow-md transition-all duration-300"
            >
              <div>
                <Quote className="w-8 h-8 text-black/20 mb-4 stroke-[1.5]" />
                <p className="text-sm sm:text-base font-sans text-[#1F1F1E] font-normal leading-relaxed mb-6">
                  A great website does not just look refined; it works effortlessly. At <strong className="text-black font-semibold">BRAHAM</strong>, we combine visual identity, editorial typography, and high-performance front-end engineering to create digital products that elevate your brand and stand apart.
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-black/[0.06]">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-black text-white flex items-center justify-center font-bold text-sm shrink-0">
                  B/
                </div>
                <div>
                  <h4 className="text-sm font-bold font-sans text-[#0A0A0A] tracking-tight uppercase">
                    STUDIO PHILOSOPHY
                  </h4>
                  <p className="text-xs font-mono text-[#666] tracking-wide uppercase">
                    BRAHAM DIGITAL PRACTICE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
