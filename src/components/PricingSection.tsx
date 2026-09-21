import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRICING_PLANS, RETAINER_PLANS } from '../data/content';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
  onContactClick: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlan,
  onContactClick,
}) => {
  const [engagementType, setEngagementType] = useState<'project' | 'retainer'>('project');
  const sectionRef = useRef<HTMLElement>(null);

  const toggleEngagementType = () => {
    setEngagementType((prev) => (prev === 'project' ? 'retainer' : 'project'));
  };

  const activePlans = engagementType === 'project' ? PRICING_PLANS : RETAINER_PLANS;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Header headline reveal
      gsap.fromTo(
        '.pricing-header-title',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Pricing cards staggered reveal
      gsap.fromTo(
        '.pricing-card-col',
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pricing-cards-grid',
            start: 'top 82%',
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
      id="pricing-section"
      className="relative bg-[#0D0D0D] text-white pt-24 sm:pt-32 pb-0 overflow-hidden select-none"
    >
      {/* 
        AMBIENT RADIANT GRADIENT GLOW
        Top ambient subtle aura + signature bottom luminous #5ce1e6 gradient
      */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[380px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(92,225,230,0.12)_0%,rgba(0,0,0,0)_75%)] blur-2xl z-0"
        aria-hidden="true"
      />

      {/* Radiant #5ce1e6 Gradient at the Bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-[radial-gradient(ellipse_75%_55%_at_50%_100%,rgba(92,225,230,0.22)_0%,rgba(92,225,230,0.08)_40%,rgba(13,13,13,0)_75%)] blur-3xl z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Index Marker: [04] */}
        <div className="flex justify-center mb-3">
          <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white/50 uppercase">
            [04]
          </span>
        </div>

        {/* Section Headline: ENGAGEMENT */}
        <h2 className="pricing-header-title text-5xl sm:text-7xl lg:text-[6.5rem] font-black font-sans uppercase tracking-[-0.04em] text-center text-white leading-none mb-6 sm:mb-8">
          ENGAGEMENT
        </h2>

        {/* Engagement Type Switch: PROJECT-BASED [ ⚪ ] RETAINER */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-20">
          <button
            onClick={() => setEngagementType('project')}
            className={`text-xs sm:text-[13px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              engagementType === 'project' ? 'text-[#5ce1e6] font-bold' : 'text-white/40 hover:text-white/70'
            }`}
          >
            PROJECT-BASED
          </button>

          {/* Pill Toggle Switch */}
          <button
            onClick={toggleEngagementType}
            role="switch"
            aria-checked={engagementType === 'retainer'}
            aria-label="Toggle engagement format between project-based and retainer"
            className="w-12 h-6 rounded-full bg-[#1F1F1E] border border-white/20 p-0.5 flex items-center cursor-pointer transition-colors relative"
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-4.5 h-4.5 rounded-full bg-[#5ce1e6] shadow-sm"
              style={{
                marginLeft: engagementType === 'retainer' ? '24px' : '2px',
              }}
            />
          </button>

          <button
            onClick={() => setEngagementType('retainer')}
            className={`text-xs sm:text-[13px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              engagementType === 'retainer' ? 'text-[#5ce1e6] font-bold' : 'text-white/40 hover:text-white/70'
            }`}
          >
            RETAINER
          </button>
        </div>

        {/* 
          3-COLUMN PRICING / ENGAGEMENT TIERS
        */}
        <div className="pricing-cards-grid grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pb-16 sm:pb-20">
          {activePlans.map((plan, idx) => {
            return (
              <div
                key={`${engagementType}-${plan.id}`}
                id={`pricing-tier-${plan.id}`}
                onClick={() => onSelectPlan(plan.name)}
                className="pricing-card-col group flex flex-col justify-start cursor-pointer p-4 -m-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.03]"
              >
                {/* Micro Metadata Strip: Tier & Timeline */}
                <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                  <span className="flex items-center gap-1">
                    <span>TIER</span>
                    <NumberCounter value={idx + 1} padZero duration={1} delay={0.15 * idx} />
                  </span>
                  <span className="text-[#5ce1e6] font-semibold">
                    {engagementType === 'project' ? (
                      <>
                        {idx === 0 && (
                          <span className="flex items-center gap-0.5">
                            <NumberCounter value={2} duration={1.2} delay={0.1} />
                            <span>–</span>
                            <NumberCounter value={4} duration={1.4} delay={0.2} />
                            <span>WEEKS</span>
                          </span>
                        )}
                        {idx === 1 && (
                          <span className="flex items-center gap-0.5">
                            <NumberCounter value={4} duration={1.2} delay={0.2} />
                            <span>–</span>
                            <NumberCounter value={6} duration={1.4} delay={0.3} />
                            <span>WEEKS</span>
                          </span>
                        )}
                        {idx === 2 && (
                          <span className="flex items-center gap-1">
                            <NumberCounter value={100} suffix="%" duration={1.6} delay={0.3} />
                            <span>CAPACITY</span>
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        {idx === 0 && <span>DEDICATED SPRINTS</span>}
                        {idx === 1 && <span>PRIORITY QUEUE</span>}
                        {idx === 2 && (
                          <span className="flex items-center gap-1">
                            <NumberCounter value={100} suffix="%" duration={1.6} delay={0.3} />
                            <span>DEDICATED</span>
                          </span>
                        )}
                      </>
                    )}
                  </span>
                </div>

                {/* Header: Title + POPULAR pill if applicable */}
                <div className="flex items-center justify-between mb-3 min-h-[38px]">
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight group-hover:text-white/90 group-hover:translate-x-1 transition-all">
                    {plan.name}
                  </h3>

                  {plan.isPopular && (
                    <span className="px-2.5 py-1 rounded bg-[#5ce1e6] text-black text-[11px] font-mono font-extrabold uppercase tracking-widest shadow-sm">
                      POPULAR
                    </span>
                  )}
                </div>

                {/* Subtitle / Description (All uppercase) */}
                <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white/50 leading-relaxed min-h-[42px] mb-6">
                  {plan.subtitle}
                </p>

                {/* Horizontal Divider Line Across Tiers */}
                <div className="border-b border-white/[0.12] mb-6" />

                {/* Format Display */}
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                    {plan.format}
                  </span>
                  <span className="text-xs sm:text-sm font-mono uppercase text-white/50 tracking-wider">
                    SCOPE
                  </span>
                </div>

                {/* Features List with Clean White Checkmarks */}
                <ul className="space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#5ce1e6] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span className="text-xs sm:text-[13px] font-mono uppercase tracking-wide text-white/90 leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* 
          HORIZONTAL DIVIDER LINE & BOTTOM STUDIO COMMITMENT ROW
          Left: HAVE A UNIQUE SCOPE? LET'S TALK.
          Right: Studio Engagement Statement
        */}
        <div className="border-t border-white/[0.12] pt-12 sm:pt-16 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          {/* Left Column: HAVE A UNIQUE SCOPE? LET'S TALK. */}
          <div className="lg:col-span-4">
            <button
              onClick={onContactClick}
              className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white/90 hover:text-[#5ce1e6] uppercase transition-colors cursor-pointer text-left group flex items-center gap-2"
            >
              <span>HAVE A UNIQUE SCOPE? LET'S TALK.</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          {/* Right Column: Studio Engagement Statement */}
          <div className="lg:col-span-8">
            <p className="text-base sm:text-lg lg:text-xl font-sans text-white/95 font-normal leading-relaxed tracking-tight mb-8">
              At <strong className="text-white font-bold">BRAHAM</strong>, every digital engagement
              begins with understanding your creative ambition and functional needs. We structure each collaboration
              to match your project scope, ensuring dedicated focus, direct collaboration, and exceptional design craft from kickoff to delivery.
            </p>

            {/* Studio Director Block */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full p-0.5 border-2 border-[#5ce1e6] bg-neutral-900 flex items-center justify-center shrink-0">
                <span className="font-sans font-black text-white text-sm">B/</span>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold font-sans text-white tracking-tight uppercase">
                  DIRECT COLLABORATION
                </h4>
                <p className="text-xs font-mono text-white/50 tracking-wider uppercase">
                  BRAHAM DIGITAL STUDIO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth dark-to-light gradient blend into Section [05] */}
      <div className="h-12 w-full bg-gradient-to-b from-[#0D0D0D] to-[#F9F9F8]" aria-hidden="true" />
    </section>
  );
};
