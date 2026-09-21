import React, { useEffect, useState, useRef } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Lightbulb,
  Layers,
  Headphones,
  Rocket,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface ServicesPageProps {
  onBackToHome: () => void;
  onBookCallClick: (service?: string) => void;
}

interface ServiceEntry {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  image: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onBackToHome,
  onBookCallClick,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services: ServiceEntry[] = [
    {
      index: '01',
      title: 'Web Design',
      subtitle: 'EDITORIAL DIGITAL FLAGSHIPS',
      description:
        'Bespoke website architecture for brands that need to define their category. Every layout, grid, and typographic system is engineered from first principles — never templated, never retrofitted.',
      deliverables: [
        'Bespoke Layout Systems',
        'Typographic Architecture',
        'Design Tokens & Components',
        'Responsive Editorial Grids',
      ],
      image:
        'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1400&auto=format&fit=crop&q=80',
    },
    {
      index: '02',
      title: 'UI/UX Design',
      subtitle: 'INTERFACE CRAFT & USER FLOWS',
      description:
        'Interaction design that respects user intent while expressing brand character. We map friction, eliminate ambiguity, and build interface systems that scale from prototype to production.',
      deliverables: [
        'User Flow Mapping',
        'Interactive Prototypes',
        'Component Libraries',
        'Accessibility Audits (WCAG 2.2)',
      ],
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&auto=format&fit=crop&q=80',
    },
    {
      index: '03',
      title: 'E-commerce',
      subtitle: 'HIGH-CONVERTING COMMERCE BUILD',
      description:
        'Storefronts engineered for velocity and taste. We architect checkout flows, merchandising systems, and product pages that turn browsing into buying without sacrificing the brand experience.',
      deliverables: [
        'Commerce Architecture',
        'Checkout Flow Engineering',
        'Product Merchandising Systems',
        'Sub-Second Load Performance',
      ],
      image:
        'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=1400&auto=format&fit=crop&q=80',
    },
    {
      index: '04',
      title: 'Creative Direction',
      subtitle: 'BRAND STRATEGY & ART DIRECTION',
      description:
        'Setting the visual and narrative direction for brands that want to lead. We define positioning, tone, and aesthetic doctrine — then guide every touchpoint toward that vision.',
      deliverables: [
        'Brand Positioning Strategy',
        'Visual Identity Systems',
        'Art Direction Guidelines',
        'Campaign Conceptualisation',
      ],
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&auto=format&fit=crop&q=80',
    },
  ];

  // ============================================================
  // GSAP SETUP — uses requestAnimationFrame + ScrollTrigger.refresh()
  // Bulletproof against blank-page-on-first-navigation.
  // ============================================================
  useEffect(() => {
    window.scrollTo(0, 0);

    const el = pageRef.current;
    if (!el) return;

    let rafId: number;
    let killCtx: (() => void) | null = null;

    // Wait for TWO animation frames so layout is definitely settled
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          // ---------- HEADER STRIP ----------
          gsap.from('.svc-header-line', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: { trigger: '.svc-header', start: 'top 95%' },
          });

          gsap.from('.svc-header-text', {
            opacity: 0,
            y: 12,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            immediateRender: false,
          });

          // ---------- HERO HEADLINE (char by char) ----------
          gsap.from('.svc-hero-char', {
            yPercent: 120,
            opacity: 0,
            duration: 1,
            stagger: 0.035,
            ease: 'power4.out',
            delay: 0.1,
            immediateRender: false,
          });

          gsap.from('.svc-hero-eyebrow', {
            opacity: 0,
            x: -20,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.5,
            immediateRender: false,
          });

          gsap.from('.svc-hero-intro', {
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.7,
            immediateRender: false,
          });

          // ---------- SERVICE ROWS ----------
          const rows = gsap.utils.toArray<HTMLElement>('.svc-row');
          rows.forEach((row) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                once: true,
              },
            });

            tl.from(
              row.querySelector('.svc-row-index'),
              {
                opacity: 0,
                x: -16,
                duration: 0.6,
                ease: 'power3.out',
                immediateRender: false,
              }
            )
              .from(
                row.querySelector('.svc-row-title'),
                {
                  yPercent: 110,
                  duration: 0.9,
                  ease: 'power4.out',
                  immediateRender: false,
                },
                '-=0.45'
              )
              .from(
                row.querySelector('.svc-row-subtitle'),
                {
                  opacity: 0,
                  y: 10,
                  duration: 0.55,
                  ease: 'power3.out',
                  immediateRender: false,
                },
                '-=0.55'
              )
              .from(
                row.querySelector('.svc-row-desc'),
                {
                  opacity: 0,
                  y: 18,
                  duration: 0.7,
                  ease: 'power3.out',
                  immediateRender: false,
                },
                '-=0.4'
              )
              .from(
                row.querySelectorAll('.svc-row-deliverable'),
                {
                  opacity: 0,
                  x: -12,
                  duration: 0.5,
                  stagger: 0.08,
                  ease: 'power3.out',
                  immediateRender: false,
                },
                '-=0.5'
              )
              .from(
                row.querySelector('.svc-row-image-clip'),
                {
                  clipPath: 'inset(0 100% 0 0)',
                  duration: 1.1,
                  ease: 'power4.inOut',
                  immediateRender: false,
                },
                '-=1'
              )
              .from(
                row.querySelector('.svc-row-image'),
                {
                  scale: 1.15,
                  duration: 1.4,
                  ease: 'power3.out',
                  immediateRender: false,
                },
                '<'
              );
          });

          // ---------- CTA BANNER ----------
          gsap.from('.svc-cta-char', {
            yPercent: 100,
            opacity: 0,
            duration: 0.9,
            stagger: 0.02,
            ease: 'power4.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '.svc-cta',
              start: 'top 82%',
              once: true,
            },
          });

          gsap.from('.svc-cta-glow', {
            scale: 0.85,
            opacity: 0.4,
            duration: 2,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: '.svc-cta',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });

          gsap.from('.svc-cta-actions', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '.svc-cta-actions',
              start: 'top 95%',
              once: true,
            },
          });

          // ---------- PROCESS SECTION (inside this component) ----------
          gsap.from('.process-heading-block', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '.process-heading-block',
              start: 'top 88%',
              once: true,
            },
          });

          gsap.from('.process-step-card', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '.process-cards-grid',
              start: 'top 90%',
              once: true,
            },
          });
        }, el);

        ctxRef.current = ctx;
        killCtx = () => ctx.revert();

        // Force all triggers to recalculate now that layout is definitely final
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (killCtx) killCtx();
      ctxRef.current = null;
    };
  }, []);

  const heroChars = 'SERVICES.'.split('');
  const ctaHeadline = 'NOT SURE WHICH SERVICE FITS?'.split(' ');

  return (
    <div
      ref={pageRef}
      className="w-full bg-[#F9F9F8] text-[#0D0D0D] font-sans pt-24 sm:pt-28 pb-16"
    >
      {/* HEADER STRIP */}
      <section className="svc-header px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-10 sm:pb-14">
        <div className="relative flex items-center justify-between gap-4 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#8E8E89] pb-4">
          <span className="svc-header-text">[01]</span>
          <span className="svc-header-text hidden sm:inline">/ SERVICES</span>
          <span className="svc-header-text">WHAT WE DO</span>
          <span
            aria-hidden="true"
            className="svc-header-line absolute bottom-0 left-0 right-0 h-[1px] bg-black/[0.15]"
          />
        </div>
      </section>

      {/* HERO */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[550px] bg-[radial-gradient(ellipse_85%_60%_at_50%_0%,rgba(92,225,230,0.30)_0%,rgba(130,235,240,0.12)_40%,rgba(249,249,248,0)_75%)] blur-2xl z-0"
        />

        <div className="relative z-10 flex items-center justify-between gap-4 mb-12 sm:mb-16">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#4A4A48] hover:text-black transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-black" />
            <span>RETURN TO HOME</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-black/[0.08] text-[11px] font-mono tracking-widest text-[#4A4A48] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#5ce1e6]" />
            <span>4 CORE PRACTICES</span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="svc-hero-eyebrow text-xs font-mono uppercase tracking-widest text-[#8E8E89] block mb-6">
              // OUR SERVICES
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black font-sans tracking-[-0.045em] text-[#0D0D0D] leading-[0.92] uppercase overflow-hidden">
              {heroChars.map((char, i) => (
                <span
                  key={`hero-${i}`}
                  className="svc-hero-char inline-block"
                  style={{ willChange: 'transform' }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          <div className="lg:col-span-5">
            <p className="svc-hero-intro text-base sm:text-lg text-[#555552] font-sans leading-relaxed max-w-lg">
              Four disciplines. One integrated practice. Each commission combines
              strategic clarity with technical craft to produce digital work that
              endures.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-24">
        <div className="border-t border-black/[0.10]">
          {services.map((service, idx) => (
            <ServiceRow
              key={service.index}
              service={service}
              isHovered={hoveredIndex === idx}
              anyHovered={hoveredIndex !== null}
              onEnter={() => setHoveredIndex(idx)}
              onLeave={() => setHoveredIndex(null)}
              onSelect={() =>
                onBookCallClick(`Service Inquiry: ${service.title}`)
              }
            />
          ))}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section
        id="methodology-section"
        className="bg-[#F9F9F8] text-[#0D0D0D] pt-12 sm:pt-16 pb-20 sm:pb-28 select-none overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono text-[#52524E] mb-10 sm:mb-14">
            <span className="font-bold text-black">[02]</span>
            <span className="tracking-widest uppercase">
              // OUR METHODOLOGY
            </span>
            <span className="font-bold text-black tracking-wider uppercase">
              HOW WE WORK
            </span>
          </div>

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
                We approach every project with structured clarity, combining
                creative exploration with disciplined execution to deliver
                memorable, high-performance websites.
              </p>
            </div>
          </div>

          <div className="process-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div
                  key={idx}
                  onClick={() => onBookCallClick(`Service Methodology: ${step.title}`)}
                  className="process-step-card group relative flex flex-col justify-between bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-black/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] mb-6">
                      <div
                        className="flex items-center gap-1.5"
                        aria-hidden="true"
                      >
                        {[1, 2, 3, 4].map((dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`w-2 h-2 rounded-[2px] transition-colors duration-300 ${
                              dotIndex <= step.activeDots
                                ? 'bg-black'
                                : 'bg-black/15'
                            }`}
                          />
                        ))}
                      </div>

                      <span className="text-[11px] sm:text-xs font-mono font-medium text-[#52524E] uppercase tracking-wider flex items-center gap-1">
                        <span>PHASE</span>
                        <NumberCounter
                          value={idx + 1}
                          padZero
                          duration={1.2}
                          delay={0.15 * idx}
                        />
                      </span>
                    </div>

                    <div className="w-9 h-9 flex items-center justify-center text-black mb-6 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-[#0A0A0A] mb-3 group-hover:text-black">
                      {step.title}
                    </h3>

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

      {/* CTA BANNER */}
      <section className="svc-cta relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="relative rounded-3xl bg-[#0D0D0D] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
          <div
            aria-hidden="true"
            className="svc-cta-glow pointer-events-none absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_top_right,rgba(92,225,230,0.35)_0%,rgba(130,235,240,0.12)_40%,transparent_70%)] blur-2xl z-0"
          />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5ce1e6] block mb-3">
              [START A COMMISSION] // DIRECT INQUIRY
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans uppercase tracking-tight text-white leading-none mb-6">
              {ctaHeadline.map((word, wIdx) => (
                <span
                  key={`cta-word-${wIdx}`}
                  className="inline-block overflow-hidden mr-3 last:mr-0 align-bottom"
                >
                  {word.split('').map((char, cIdx) => (
                    <span
                      key={`cta-char-${wIdx}-${cIdx}`}
                      className="svc-cta-char inline-block"
                      style={{ willChange: 'transform' }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              Book a 30-minute strategy call. We&apos;ll diagnose your project,
              recommend the right discipline, and outline the engagement
              structure.
            </p>

            <div className="svc-cta-actions flex flex-wrap items-center gap-4">
              <button
                onClick={() => onBookCallClick('Services Page — Strategy Call')}
                className="inline-flex items-center gap-2 bg-[#5ce1e6] hover:bg-[#48d2d7] text-black font-semibold px-6 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:shadow-cyan-500/25 active:scale-95"
              >
                <span>Book a Strategy Call</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* 
  ==========================================================================
  SERVICE ROW
  ==========================================================================
*/
interface ServiceRowProps {
  service: ServiceEntry;
  isHovered: boolean;
  anyHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onSelect: () => void;
}

const ServiceRow: React.FC<ServiceRowProps> = ({
  service,
  isHovered,
  anyHovered,
  onEnter,
  onLeave,
  onSelect,
}) => {
  const dimmed = anyHovered && !isHovered;
  const rowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const row = rowRef.current;
    const img = imageRef.current;
    if (!row || !img) return;

    const rect = row.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(img, {
      x: x * -18,
      y: y * -12,
      duration: 0.7,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      });
    }
    onLeave();
  };

  return (
    <div
      ref={rowRef}
      onMouseEnter={onEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className={`svc-row group relative border-b border-black/[0.10] py-8 sm:py-12 cursor-pointer transition-opacity duration-500 ${
        dimmed ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <div className="lg:col-span-1">
          <span className="svc-row-index text-xs sm:text-sm font-mono text-[#8E8E89] tracking-widest inline-block">
            {service.index} /
          </span>
        </div>

        <div className="lg:col-span-4">
          <div className="overflow-hidden">
            <h3 className="svc-row-title text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-[-0.03em] text-[#0D0D0D] leading-[0.95] uppercase mb-3 will-change-transform">
              {service.title}
            </h3>
          </div>
          <span className="svc-row-subtitle text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#5ce1e6] bg-[#0D0D0D] px-2 py-1 rounded inline-block">
            {service.subtitle}
          </span>
        </div>

        <div className="lg:col-span-4">
          <p className="svc-row-desc text-sm sm:text-base text-[#555552] leading-relaxed font-sans mb-5 max-w-md">
            {service.description}
          </p>
          <ul className="space-y-2">
            {service.deliverables.map((d, dIdx) => (
              <li
                key={dIdx}
                className="svc-row-deliverable flex items-start gap-2 text-xs font-mono text-[#4A4A48]"
              >
                <Check className="w-3.5 h-3.5 text-[#5ce1e6] shrink-0 mt-0.5" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="svc-row-image-clip relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200">
            <img
              ref={imageRef}
              src={service.image}
              alt={service.title}
              className="svc-row-image w-full h-full object-cover"
              style={{
                filter: isHovered ? 'grayscale(0)' : 'grayscale(0.6)',
                transition: 'filter 700ms ease',
                willChange: 'transform',
              }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            <div
              className={`absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transition-all duration-500 ${
                isHovered
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              <ArrowUpRight className="w-4 h-4 text-black" />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-[#0D0D0D] transition-all duration-700 ease-out ${
          isHovered ? 'w-full' : 'w-0'
        }`}
      />
    </div>
  );
};

/* 
  ==========================================================================
  PROCESS STEPS DATA
  ==========================================================================
*/
interface ProcessStep {
  week: string;
  activeDots: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
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