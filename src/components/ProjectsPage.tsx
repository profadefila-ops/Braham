import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NumberCounter } from './motion/NumberCounter';
import { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsPageProps {
  onBackToHome: () => void;
  onBookCallClick: (service?: string) => void;
  onProjectClick?: (project: Project) => void;
}

interface ProjectsPageProject {
  id: string;
  index: string;
  name: string;
  category: string;
  year: string;
  image: string;
  description: string;
  services: string[];
  href: string;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onBackToHome,
  onBookCallClick,
}) => {
  const heroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // H1 char-by-char reveal
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let rafId: number;
    let killCtx: (() => void) | null = null;

    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          gsap.from('.projects-hero-char', {
            yPercent: 120,
            opacity: 0,
            duration: 1,
            stagger: 0.03,
            ease: 'power4.out',
            delay: 0.2,
            immediateRender: false,
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

  const projects: ProjectsPageProject[] = [
    {
      id: 'premium-group',
      index: '01',
      name: 'Premium Group',
      category: 'Web Design & Development',
      year: '2026',
      image:
        'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/674.webp',
      description:
        'An editorial web platform engineered with disciplined typography, custom interactive layouts, and responsive motion.',
      services: ['Web Design', 'Front-End Development', 'Typography System'],
      href: 'https://premiumgroupng.com/',
    },
    {
      id: 'medsurgelective',
      index: '02',
      name: 'Medsurgelective',
      category: 'E-Commerce',
      year: '2026',
      image:
        'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/65.webp',
      description:
        'A refined digital storefront designed to make exploration intuitive, product discovery effortless, and elevate brand character.',
      services: ['Storefront Design', 'Product Discovery', 'Checkout Flow'],
      href: 'https://www.medsurgelective.co.uk/',
    },
    {
      id: 'daytime-homecare',
      index: '03',
      name: 'Daytime Homecare',
      category: 'UI/UX Design',
      year: '2025',
      image:
        'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/90.webp',
      description:
        'A thoughtful digital interface structured around clarity, effortless navigation, and visual restraint.',
      services: ['Interface Design', 'User Flows', 'Design Systems'],
      href: 'https://daytimehomecare.com/',
    },
    {
      id: 'thryveacademy',
      index: '04',
      name: 'Thryveacademy.co',
      category: 'Creative Direction & Motion',
      year: '2025',
      image:
        'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/66.webp',
      description:
        'A digital brand flagship combining visual art direction, typography systems, and purposeful micro-interactions.',
      services: ['Creative Direction', 'Motion Strategy', 'Brand System'],
      href: 'https://thryveacademy.co/',
    },
    {
      id: 'daytime-healthcare',
      index: '05',
      name: 'Daytimehealthcare',
      category: 'Healthcare Platform',
      year: '2026',
      image:
        'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/67.webp',
      description:
        'A warm, human-centred healthcare platform built to simplify patient discovery and elevate clinical trust.',
      services: ['Interface Design', 'Patient Flows', 'Accessibility'],
      href: 'https://daytimehealthcare.com/',
    },
    {
      id: 'genesis-outsourcing',
      index: '06',
      name: 'Genesis Outsourcing',
      category: 'Corporate Web Design',
      year: '2026',
      image:
        'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/65%20(1).webp',
      description:
        'A sharp, professional web presence for a global outsourcing firm — engineered for clarity, credibility, and client conversion.',
      services: ['Corporate Design', 'Lead Generation', 'Front-End Build'],
      href: 'https://www.genesisoutsourcing.co/',
    },
  ];

  const heroChars = 'SELECTED PROJECTS'.split('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-[#F9F9F8] text-[#0D0D0D] font-sans pt-24 sm:pt-28 pb-16"
    >
      {/* HERO */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-12 sm:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[550px] bg-[radial-gradient(ellipse_85%_60%_at_50%_0%,rgba(92,225,230,0.30)_0%,rgba(130,235,240,0.12)_40%,rgba(249,249,248,0)_75%)] blur-2xl z-0"
        />

        <div className="relative z-10 flex items-center justify-between gap-4 mb-10 sm:mb-14">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#4A4A48] hover:text-black transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-black" />
            <span>RETURN TO HOME</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-black/[0.08] text-[11px] font-mono tracking-widest text-[#4A4A48] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#5ce1e6]" />
            <span>ARCHIVE // 2025 — 2026</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E89] mb-6">
            // CASE STUDIES
          </span>

          <h1
            ref={heroRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black font-sans tracking-[-0.04em] text-[#0D0D0D] leading-[0.92] uppercase mb-8 max-w-5xl overflow-hidden"
          >
            {heroChars.map((char, i) => {
              if (char === ' ') {
                return <br key={`br-${i}`} />;
              }
              return (
                <span
                  key={`hero-${i}`}
                  className="projects-hero-char inline-block"
                  style={{ willChange: 'transform' }}
                >
                  {char}
                </span>
              );
            })}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#555552] font-sans leading-relaxed max-w-2xl">
            Real work for real clients who needed more than pretty pictures.
            <br className="hidden sm:block" />
            Explore how we&apos;ve helped brands launch, scale, and transform through strategic design.
          </p>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 sm:gap-y-14">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <ProjectsFAQ />

      {/* CTA BANNER */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="relative rounded-3xl bg-[#0D0D0D] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_top_right,rgba(92,225,230,0.35)_0%,rgba(130,235,240,0.12)_40%,transparent_70%)] blur-2xl z-0"
          />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5ce1e6] block mb-3">
              [NEXT PROJECT] // DIRECT INQUIRY
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans uppercase tracking-tight text-white leading-none mb-6">
              WANT TO BE OUR NEXT FLAGSHIP?
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              We accept a limited number of commissions each quarter. Share your brief and we&apos;ll respond within two business days.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onBookCallClick('Projects Page Commission Inquiry')}
                className="inline-flex items-center gap-2 bg-[#5ce1e6] hover:bg-[#48d2d7] text-black font-semibold px-6 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:shadow-cyan-500/25 active:scale-95"
              >
                <span>Initiate a Commission</span>
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
    </motion.div>
  );
};

/* PROJECT CARD */
interface ProjectCardProps {
  project: ProjectsPageProject;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.75,
        delay: (index % 2) * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group cursor-pointer block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
        className="relative"
      >
        <div className="relative aspect-4/3 sm:aspect-16/11 overflow-hidden rounded-2xl bg-neutral-200">
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Glitch slice overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-95 transition-opacity duration-500 group-hover:opacity-100"
          >
            <img
              src={project.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 22%, 0 22%)',
                transform: hovered
                  ? 'translateX(-12px) scale(1.06)'
                  : 'translateX(-4px) scale(1)',
                transition: 'transform 700ms cubic-bezier(0.16,1,0.3,1)',
              }}
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <img
              src={project.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                clipPath: 'polygon(0 42%, 100% 42%, 100% 58%, 0 58%)',
                transform: hovered
                  ? 'translateX(14px) scale(1.06)'
                  : 'translateX(6px) scale(1)',
                transition: 'transform 700ms cubic-bezier(0.16,1,0.3,1)',
              }}
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <img
              src={project.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                clipPath: 'polygon(0 78%, 100% 78%, 100% 100%, 0 100%)',
                transform: hovered
                  ? 'translateX(-8px) scale(1.06)'
                  : 'translateX(-3px) scale(1)',
                transition: 'transform 700ms cubic-bezier(0.16,1,0.3,1)',
              }}
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-widest">
              {project.category} — {project.year}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-between gap-4 mt-4 pt-1">
        <h3 className="text-base sm:text-lg font-semibold font-sans text-[#0D0D0D] tracking-tight">
          {project.name}
        </h3>
        <span className="text-xs font-mono text-[#8E8E89] tracking-widest">
          ({project.index})
        </span>
      </div>
    </motion.a>
  );
};

/* PROJECTS FAQ */
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What services does Braham offer?',
    answer:
      'We specialize in bespoke web design and development, creative direction, brand identity systems, and high-performance digital experiences. Every project is crafted from the ground up.',
  },
  {
    question: 'Can you handle both design and development?',
    answer:
      'Yes. We provide complete end-to-end execution: creative direction, layout and interface design, typography systems, bespoke animation, and clean, responsive front-end engineering.',
  },
  {
    question: 'How do we begin working together?',
    answer:
      'Every engagement begins with a direct discussion about your brand goals, scope, and timeline expectations. Use our contact form to share your project brief, and we will follow up directly.',
  },
  {
    question: 'Do you work with clients internationally?',
    answer:
      'Yes. Braham collaborates with ambitious brands, founders, and studios across different time zones, maintaining structured communication and regular progress milestones throughout each phase.',
  },
  {
    question: 'Are your designs built from custom systems or templates?',
    answer:
      'All of our websites and digital experiences are designed custom for each client. We do not use pre-built generic templates or cookie-cutter solutions.',
  },
];

const ProjectsFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId: number;
    let killCtx: (() => void) | null = null;

    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          gsap.from('.faq-left-col', {
            opacity: 0,
            x: -30,
            duration: 0.85,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              once: true,
            },
          });

          gsap.from('.faq-accordion-item', {
            opacity: 0,
            y: 35,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '.faq-accordions-container',
              start: 'top 85%',
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
      id="faq-section"
      className="bg-[#F9F9F8] text-[#0D0D0D] pt-12 sm:pt-16 pb-20 sm:pb-28 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono text-[#52524E] mb-12 sm:mb-16">
          <span className="font-bold text-black"></span>
          <span className="tracking-widest uppercase">// FAQ</span>
          <span className="font-bold text-black tracking-wider uppercase">
            GOT QUESTIONS?
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="faq-left-col lg:col-span-5 flex flex-col">
            <div className="w-full aspect-[4/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-200 mb-6 shadow-sm group">
              <img
                src="https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/and.webp"
                alt="Braham FAQ Studio Vision"
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-104 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xl sm:text-2xl font-sans text-[#1F1F1E] font-medium leading-snug tracking-tight">
              Every detail intentional. Every decision strategic. Websites crafted to endure.
            </p>
          </div>

          <div className="faq-accordions-container lg:col-span-7 flex flex-col gap-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => toggleIndex(idx)}
                  className="faq-accordion-item bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-black/25 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs sm:text-sm font-mono text-[#888884] font-medium">
                        <NumberCounter
                          value={idx + 1}
                          padZero
                          duration={1}
                          delay={0.1 * idx}
                          suffix="."
                        />
                      </span>
                      <h3 className="text-base sm:text-lg font-medium font-sans text-[#0A0A0A] tracking-tight">
                        {item.question}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-black"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm sm:text-base font-sans text-[#52524E] leading-relaxed border-t border-black/[0.06] mt-4">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};