import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../types';
import { PROJECTS } from '../data/content';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface WorksSectionProps {
  onProjectClick: (project: Project) => void;
}

export const WorksSection: React.FC<WorksSectionProps> = ({ onProjectClick }) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.works-heading-block',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.works-heading-block',
            start: 'top 85%',
            once: true,
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('.project-card-item');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const renderProjectCard = (project: Project, offsetClass: string) => {
    const isHovered = hoveredProjectId === project.id;

    return (
      <a
        key={project.id}
        id={`project-card-${project.id}`}
        href={project.externalUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHoveredProjectId(project.id)}
        onMouseLeave={() => setHoveredProjectId(null)}
        className={`project-card-item group cursor-pointer flex flex-col ${offsetClass}`}
      >
        {/* Image Container with Viewfinder Brackets */}
        <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-[#EAEAE6] aspect-[6/6] border border-black/[0.04] shadow-xs group-hover:shadow-xl transition-shadow duration-500">
          {/* Main Project Image with smooth scale */}
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 will-change-transform"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Viewfinder L-shaped Framing Brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/95 pointer-events-none transition-transform duration-500 group-hover:scale-110 shadow-[0_0_8px_rgba(0,0,0,0.15)]" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/95 pointer-events-none transition-transform duration-500 group-hover:scale-110 shadow-[0_0_8px_rgba(0,0,0,0.15)]" />

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black/15 backdrop-blur-[1px] transition-opacity duration-300 pointer-events-none flex items-center justify-center ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="px-4 py-2 rounded-full bg-white/95 text-black text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-lg transform transition-transform duration-300 group-hover:scale-105">
              <span>EXPLORE CASE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Title and Number Row Below Image */}
        <div className="mt-4 sm:mt-5 flex items-baseline justify-between px-1">
          <h3 className="text-xl sm:text-2xl font-sans font-medium text-[#0A0A0A] tracking-tight group-hover:text-black group-hover:translate-x-1 transition-all duration-200">
            {project.title}
          </h3>
          <span className="text-sm sm:text-base font-mono text-[#141414] tracking-tight">
            <NumberCounter
              value={parseInt(project.number.replace(/\D/g, '') || '1', 10)}
              prefix="("
              suffix=")"
              padZero
              duration={1.2}
            />
          </span>
        </div>
      </a>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="projects-section"
      className="pt-16 sm:pt-24 pb-12 bg-[#F9F9F8] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Metadata Header */}
        <div className="pb-8 sm:pb-12 border-b border-black/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono text-[#52524E]">
          <span className="font-bold text-black">[02]</span>
          <span className="tracking-widest uppercase">// SELECTED WORK</span>
          <span className="font-bold text-black tracking-wider uppercase">
            PROJECTS
          </span>
        </div>

        {/* Projects Big Heading & Narrative Intro */}
        <div className="works-heading-block pt-10 sm:pt-14 pb-12 sm:pb-18 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <h2 className="text-6xl sm:text-7xl lg:text-[5.75rem] font-black font-sans uppercase tracking-[-0.04em] leading-[0.88] text-[#0A0A0A] select-none">
              SELECTED
              <br />
              WORKS
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-base font-sans text-[#383835] font-normal leading-[1.5] max-w-xl">
              From concept to code, we transform ambitious ideas into refined,
              interactive digital realities. Every project reflects precision,
              design character, and elevated aesthetics.
            </p>
          </div>
        </div>

        {/* Masonry-Style Grid with Alternating Offset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-12 md:gap-y-0 md:mb-20 lg:mb-24">
          {PROJECTS.map((project, idx) => {
            const offsetClass =
              idx % 2 === 0 ? 'md:mt-12 lg:mt-16' : 'md:mt-0';

            return renderProjectCard(project, offsetClass);
          })}
        </div>
      </div>
    </section>
  );
};