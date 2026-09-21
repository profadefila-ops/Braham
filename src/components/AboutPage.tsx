import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  onBackToHome: () => void;
  onExploreProjects: () => void;
  onBookCallClick: (service?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onExploreProjects,
  onBookCallClick,
}) => {
  const heroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // H1 char-by-char reveal animation
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-hero-char', {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out',
        delay: 0.2,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const studioMetrics = [
    { value: 13, suffix: '+', label: 'YEARS IN PRACTICE', detail: 'Independent continuous studio operation since 2013.' },
    { value: 180, suffix: '+', label: 'BESPOKE COMMISSIONS', detail: 'Flagship web systems, e-commerce, and brand platforms.' },
    { value: 42, suffix: '', label: 'GLOBAL DESIGN AWARDS', detail: 'Awwwards, D&AD, FWA, Red Dot, and Cannes Lions.' },
    { value: 99, suffix: '.8%', label: 'CLIENT RETENTION', detail: 'Long-term collaborative partnerships with market leaders.' },
  ];

  const pillars = [
    {
      number: '01',
      title: 'Architectural Rigor',
      tag: 'SPATIAL FOUNDATIONS',
      description:
        'We view the digital canvas not as flat printed paper, but as an interactive spatial environment. Every grid, typographic baseline, and responsive transition is calculated with mathematical precision and structural permanence.',
      features: ['Mathematical Typographic Scaling', 'Fluid Grid Responsive Architecture', 'Zero-Layout-Shift Engineering'],
    },
    {
      number: '02',
      title: 'The Elimination of Noise',
      tag: 'EDITORIAL RESTRAINT',
      description:
        'We reject ephemeral software trends and visual clichés in favor of timeless Swiss aesthetic clarity, intentional negative space, and disciplined contrast. If an element does not serve brand clarity or user agency, it is discarded.',
      features: ['Timeless Monochromatic Hierarchy', 'High-Contrast Typographic Pairing', 'Functional Interaction States'],
    },
    {
      number: '03',
      title: 'Boutique Intimacy & Velocity',
      tag: 'DIRECT PARTNER ACCESS',
      description:
        'We do not employ account managers, intermediaries, or bureaucratic layers. Clients collaborate directly with principal directors and lead engineers from discovery through launch, ensuring rapid execution without dilution.',
      features: ['Direct Studio Partner Ingress', 'Rapid Bi-Weekly Deployment Cycles', 'Strict Cap on Concurrent Projects'],
    },
    {
      number: '04',
      title: 'Computational Craft',
      tag: 'ENGINEERING MASTERY',
      description:
        'Art direction is only as compelling as its execution. We write production-grade, highly performant front-end code with sub-second page loads, accessible semantic foundations, and silky 60fps kinetic physics.',
      features: ['Sub-Second Load Latency (0.4s avg)', 'Full A11y Accessible Semantic Tree', 'Custom Physics & GSAP Sequences'],
    },
  ];

  const heroChars = 'ABOUT BRAHAM'.split('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-[#F9F9F8] text-[#0D0D0D] font-sans pt-24 sm:pt-28 pb-16"
    >
      {/* HERO */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-20 sm:pb-28 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[650px] bg-[radial-gradient(ellipse_85%_65%_at_50%_0%,rgba(92,225,230,0.42)_0%,rgba(130,235,240,0.20)_35%,rgba(249,249,248,0)_75%)] blur-2xl z-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(92,225,230,0.30)_0%,rgba(249,249,248,0)_70%)] blur-3xl z-0"
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-black/[0.08] pb-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#4A4A48] hover:text-black transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-black" />
              <span>RETURN TO HOME</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-black/[0.08] text-[11px] font-mono tracking-widest text-[#4A4A48] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#5ce1e6]" />
              <span>BRAHAM ATELIER // EST. 2013</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono text-[#8E8E89] uppercase tracking-widest">[01] // ABOUT BRAHAM</span>
            <span className="h-[1px] w-8 bg-black/20" />
            <span className="text-xs font-mono text-[#8E8E89] uppercase tracking-widest">DIGITAL ARCHITECTURE</span>
          </div>

          <h1
            ref={heroRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black font-sans tracking-[-0.045em] text-[#0D0D0D] leading-[0.92] uppercase mb-8 sm:mb-10 overflow-hidden"
          >
            {heroChars.map((char, i) => (
              <span
                key={`hero-${i}`}
                className="about-hero-char inline-block"
                style={{ willChange: 'transform' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pt-4 border-t border-black/[0.08]">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-lg sm:text-2xl text-[#1A1A18] font-sans font-normal leading-relaxed tracking-tight">
                BRAHAM is an independent digital architecture atelier and creative technology firm. We operate at the convergence of haute couture art direction, spatial interface engineering, and bespoke computational craft.
              </p>
              <p className="text-sm sm:text-base text-[#555552] font-sans leading-relaxed">
                For over a decade, we have rejected the disposable conventions of mass web production. In their place, we build digital flagships: permanent, bespoke online spaces engineered with architectural rigor, custom typographic systems, and frictionless interaction models that dignify the brands they represent.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white/80 p-6 sm:p-8 rounded-2xl border border-black/[0.08] shadow-xs backdrop-blur-xs">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E89] block mb-2">
                  DIRECTORATE COMMISSIONS
                </span>
                <p className="text-xs sm:text-sm text-[#4A4A48] leading-relaxed mb-4">
                  Each year, our partners selectively accept a maximum of 12 full-scope commissions to maintain uncompromised partner attention, surgical focus, and peerless execution.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-[#1E6B17] font-semibold bg-[#E5F7E0] border border-[#BDE8B3] px-3 py-1.5 rounded-lg w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>ACCEPTING COMMISSIONS FOR Q3/Q4</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/[0.06]">
                <button
                  onClick={() => onBookCallClick('Commission Inquiry - About')}
                  className="inline-flex items-center gap-2 bg-[#0D0D0D] hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md active:scale-95"
                >
                  <span>Initiate a Commission</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
                </button>
                <button
                  onClick={onExploreProjects}
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-black/5 text-[#0D0D0D] border border-black/15 px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>View Selected Works</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDIO METRICS */}
      <section className="border-y border-black/[0.08] bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {studioMetrics.map((item, idx) => (
              <div key={idx} className="flex flex-col border-l border-black/[0.1] pl-5 sm:pl-7">
                <div className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans tracking-tight text-[#0D0D0D] leading-none mb-2">
                  <NumberCounter value={item.value} suffix={item.suffix} delay={0.1 * idx} />
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-black font-bold mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-[#737370] font-sans leading-relaxed">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E89] block mb-2">
              [02] // STUDIO DOCTRINE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-[#0D0D0D] uppercase">
              THE PILLARS OF OUR CRAFT.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#666663] max-w-md font-sans">
            Our operating philosophy is simple: we do not cut corners, we do not follow trends, and we treat every project as an enduring architectural monument.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="group bg-white rounded-2xl p-7 sm:p-10 border border-black/[0.08] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              style={{ backgroundColor: undefined }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#151517';
                (e.currentTarget as HTMLDivElement).style.borderColor = '#151517';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '';
                (e.currentTarget as HTMLDivElement).style.borderColor = '';
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#0D0D0D] text-white group-hover:bg-white group-hover:text-[#151517] transition-colors">
                    {pillar.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E89] group-hover:text-[#5ce1e6] transition-colors">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#0D0D0D] group-hover:text-white tracking-tight uppercase mb-3 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-[#555552] group-hover:text-white/70 leading-relaxed mb-6 transition-colors">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-5 border-t border-black/[0.06] group-hover:border-white/10 space-y-2 transition-colors">
                {pillar.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center gap-2 text-xs font-mono text-[#333330] group-hover:text-white/80 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-[#5ce1e6] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ========================================================================
        STUDIO FILM — landscape video, rounded corners
        ========================================================================
      */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-28">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] bg-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
          <video
            className="w-full h-auto aspect-[16/9] object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source
              src="https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/i89.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Subtle bottom vignette for legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Corner label */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6] animate-pulse" />
            STUDIO FILM // 2026
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div className="relative rounded-3xl bg-[#0D0D0D] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_top_right,rgba(92,225,230,0.35)_0%,rgba(130,235,240,0.12)_40%,transparent_70%)] blur-2xl z-0"
          />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5ce1e6] block mb-3">
              [INITIATE PARTNERSHIP] // DIRECT ACCESS
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans uppercase tracking-tight text-white leading-none mb-6">
              WANT TO BE OUR NEXT FLAGSHIP
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              We welcome exploratory conversations with leadership teams, founders, and enterprises seeking to redefine their category.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onBookCallClick('Commission Inquiry from About Us')}
                className="inline-flex items-center gap-2 bg-[#5ce1e6] hover:bg-[#48d2d7] text-black font-semibold px-6 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:shadow-cyan-500/25 active:scale-95"
              >
                <span>Initiate a Commission</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Explore Homepage</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};