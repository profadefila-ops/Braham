import React, { useEffect, useRef } from 'react';
import { Lightbulb, Layers, Headphones, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface MethodologySectionProps {
  onStageClick?: (stageTitle: string) => void;
}

const PROCESS_STEPS = [
  {
    week: 'PHASE 01',
    activeDots: 1,
    icon: Lightbulb,
    title: 'Discovery & Direction',
    description:
      'We define your project goals, explore creative direction, and establish the strategic visual and technical groundwork.',
  },
  {
    week: 'PHASE 02',
    activeDots: 2,
    icon: Layers,
    title: 'Design & Prototyping',
    description:
      'We create intuitive user flows, bespoke layouts, and interactive prototypes for detailed review and refinement.',
  },
  {
    week: 'PHASE 03',
    activeDots: 3,
    icon: Headphones,
    title: 'Development & Build',
    description:
      'We build clean, responsive front-end code with smooth motion, robust architecture, and cross-device precision.',
  },
  {
    week: 'PHASE 04',
    activeDots: 4,
    icon: Rocket,
    title: 'Review & Deployment',
    description:
      'We conduct thorough quality checks, performance audits, and launch coordination to ensure a seamless release.',
  },
];

export const MethodologySection: React.FC<MethodologySectionProps> = ({ onStageClick }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-heading-block',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.process-step-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-cards-grid',
            start: 'top 85%',
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
      id="methodology-section"
      className="bg-[#F9F9F8] text-[#0D0D0D] pt-12 sm:pt-16 pb-20 sm:pb-28 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Metadata Strip */}
        <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono text-[#52524E] mb-10 sm:mb-14">
          <span className="font-bold text-black">[05]</span>
          <span className="tracking-widest uppercase">// OUR METHODOLOGY</span>
          <span className="font-bold text-black tracking-wider uppercase">HOW WE WORK</span>
        </div>

        {/* Section Headline & Narrative */}
        <div className="process-heading-block grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-sans uppercase tracking-[-0.04em] leading-[0.92] text-[#0A0A0A]">
              OUR
              <br />
              PROCESS
            </h2>
          </div>

          <div className="lg:col-span-6 flex justify-start lg:justify-end">
            <p className="max-w-lg text-base sm:text-lg text-[#1F1F1E] font-normal leading-relaxed">
              We approach every project with structured clarity, combining creative exploration with disciplined execution to deliver memorable, high-performance websites.
            </p>
          </div>
        </div>

        {/* 4-Column Timeline Process Cards */}
        <div className="process-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={idx}
                onClick={() => onStageClick && onStageClick(step.title)}
                className="process-step-card group relative flex flex-col justify-between bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-black/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  {/* Top Bar: Progress Indicator Squares + Week Label */}
                  <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] mb-6">
                    {/* 4-dot / square progression */}
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      {[1, 2, 3, 4].map((dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`w-2 h-2 rounded-[2px] transition-colors duration-300 ${
                            dotIndex <= step.activeDots ? 'bg-black' : 'bg-black/15'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[11px] sm:text-xs font-mono font-medium text-[#52524E] uppercase tracking-wider flex items-center gap-1">
                      <span>PHASE</span>
                      <NumberCounter value={idx + 1} padZero duration={1.2} delay={0.15 * idx} />
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-9 h-9 flex items-center justify-center text-black mb-6 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-[#0A0A0A] mb-3 group-hover:text-black">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm font-sans text-[#52524E] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
