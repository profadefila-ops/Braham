import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface ImpactStatementProps {
  onExploreWorksClick?: () => void;
}

export const ImpactStatement: React.FC<ImpactStatementProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId: number;
    let killCtx: (() => void) | null = null;

    // Double RAF ensures layout is fully settled before ScrollTrigger measures.
    // Combined with immediateRender: false, elements are never left hidden
    // even if a trigger fails to fire.
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          // Monogram & left content reveal
          gsap.from('.impact-monogram', {
            opacity: 0,
            scale: 0.85,
            x: -20,
            duration: 1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true,
            },
          });

          // Statement reveal
          gsap.from('.impact-headline', {
            opacity: 0,
            y: 35,
            duration: 0.9,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          });

          // Metrics row reveal
          gsap.from('.impact-metrics-item', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '.impact-metrics-row',
              start: 'top 95%',
              once: true,
            },
          });
        }, el);

        killCtx = () => ctx.revert();
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (killCtx) killCtx();
    };
  }, []);

  return (
 <section
  ref={sectionRef}
  id="impact-section"
  className="pt-16 sm:pt-24 pb-10 sm:pb-14 bg-white border-b border-black/[0.08] overflow-hidden"
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split: Agency Position & Giant Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-14 sm:pb-20 border-b border-black/[0.08]">
          {/* Left: Studio Monogram / Mark Indicator */}
          <div className="impact-monogram lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-[18vw] sm:text-[12vw] lg:text-[6.5rem] font-black tracking-[-0.06em] text-[#0A0A0A] leading-none font-sans select-none">
                B/
              </div>
              <div className="text-sm font-mono font-bold tracking-tight mt-3 text-[#4A4A46] uppercase">
                STUDIO PHILOSOPHY
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.08] flex items-center justify-between text-[11px] font-mono uppercase text-[#73736F]">
              <span>BRAHAM AGENCY</span>
              <span>EST. INDEPENDENT</span>
            </div>
          </div>

          {/* Right: Giant Narrative Statement */}
          <div className="lg:col-span-8">
            <h2 className="impact-headline text-2xl sm:text-4xl lg:text-[3.25rem] font-extrabold tracking-[-0.035em] leading-[1.08] text-[#0D0D0D] font-sans uppercase">
              CRAFTING DISTINCTIVE WEBSITES AND DIGITAL EXPERIENCES DESIGNED
              WITH CLARITY, CHARACTER AND PURPOSE.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[#555552] leading-relaxed max-w-2xl font-normal">
              Braham combines creative direction, design and development to
              create digital experiences that are visually memorable, intuitive
              to navigate and built to elevate ambitious brands.
            </p>
          </div>
        </div>

        {/* 3-Column Key Numerical Metrics Strip */}
        <div className="impact-metrics-row grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 py-12 sm:py-16">
          {/* Metric 1 */}
          <div className="impact-metrics-item flex flex-col">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans text-black tracking-tight flex items-baseline">
              <NumberCounter
                value={9.8}
                decimals={1}
                duration={1.8}
                delay={0.1}
              />
              <span className="text-xl sm:text-2xl font-mono text-[#888884] font-medium ml-1.5">
                /10
              </span>
            </div>
            <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-black font-bold mt-2.5">
              AVERAGE CLIENT RATING
            </div>
            <p className="text-xs sm:text-sm text-[#666662] mt-1.5 leading-relaxed">
              Based on verified founder evaluations across technical execution
              and design craft.
            </p>
          </div>

          {/* Metric 2 */}
          <div className="impact-metrics-item flex flex-col border-t sm:border-t-0 sm:border-l border-black/[0.08] pt-6 sm:pt-0 sm:pl-8 lg:pl-10">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans text-black tracking-tight">
              <NumberCounter value={13} suffix="+" duration={1.8} delay={0.25} />
            </div>
            <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-black font-bold mt-2.5">
              YEARS OF DIGITAL PRACTICE
            </div>
            <p className="text-xs sm:text-sm text-[#666662] mt-1.5 leading-relaxed">
              A disciplined trajectory delivering high-performance platforms
              for global brands.
            </p>
          </div>

          {/* Metric 3 */}
          <div className="impact-metrics-item flex flex-col border-t sm:border-t-0 sm:border-l border-black/[0.08] pt-6 sm:pt-0 sm:pl-8 lg:pl-10">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans text-black tracking-tight">
              <NumberCounter value={100} suffix="%" duration={1.8} delay={0.4} />
            </div>
            <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-black font-bold mt-2.5">
              BESPOKE CODE &amp; ARCHITECTURE
            </div>
            <p className="text-xs sm:text-sm text-[#666662] mt-1.5 leading-relaxed">
              Zero generic templates. Engineered from scratch with fluid motion
              and responsiveness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};