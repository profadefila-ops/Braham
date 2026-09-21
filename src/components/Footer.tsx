import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onBookCallClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookCallClick, onNavigate }) => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Top contact info and nav columns reveal
      gsap.fromTo(
        '.footer-top-grid',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Monumental logo marquee wrapper smooth reveal
      gsap.fromTo(
        '.footer-monumental-wrapper',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-monumental-wrapper',
            start: 'top 92%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative bg-[#0D0D0D] text-white pt-20 sm:pt-28 pb-10 sm:pb-12 overflow-hidden select-none"
    >
      {/* 
        SIGNATURE FOOTER RADIANT GRADIENT AURA
        Luminous #5ce1e6 ambient glow rising up from the bottom behind BRAHAM STUDIO
      */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] sm:h-[580px] bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(92,225,230,0.28)_0%,rgba(92,225,230,0.12)_35%,rgba(13,13,13,0)_75%)] blur-3xl z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-[radial-gradient(circle_at_bottom,rgba(92,225,230,0.20)_0%,rgba(92,225,230,0.06)_40%,transparent_70%)] blur-2xl z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 
          TOP ROW:
          Left: LETS TALK / HELLO@BRAHAM.STUDIO
          Right: 3 Columns of Links (Work/Services/Approach/About, Privacy/Terms, X/Instagram/Linkedin)
        */}
        <div className="footer-top-grid grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 sm:pb-24 border-b border-white/[0.1]">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="mb-7">
              <button
                onClick={() => onNavigate('hero')}
                className="inline-block group cursor-pointer text-left focus:outline-none transition-opacity hover:opacity-85"
                aria-label="BRAHAM Home"
              >
               <img
  src="https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/Braham%20Logo.png"
  alt="BRAHAM - A Findar Company"
  className="h-8 sm:h-9 w-auto max-h-9 object-contain"
  referrerPolicy="no-referrer"
/>
              </button>
            </div>

            <span className="text-xs sm:text-[13px] font-mono uppercase tracking-widest text-white/50 mb-3">
              LET'S TALK
            </span>

            <span className="text-xs sm:text-sm font-mono text-white/70 mb-4 tracking-wider uppercase">
              (+91-447-7-454)
            </span>

            <a
              href="mailto:hello@braham.studio"
              onClick={(e) => {
                e.preventDefault();
                onBookCallClick();
              }}
              className="text-2xl sm:text-3xl lg:text-2xl font-bold font-sans tracking-tight text-white hover:text-white/80 transition-colors inline-block hover:translate-x-1 duration-300"
            >
              support@braham.com
            </a>
          </div>

          {/* Right Columns: 3 Navigation Link Columns */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-6 sm:gap-10">
            {/* Column 1: Navigation */}
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <button
                onClick={() => onNavigate('hero')}
                className="text-left text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="text-left text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                Work
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-left text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => onNavigate('methodology-section')}
                className="text-left text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                Approach
              </button>
            </div>

            {/* Column 2: Legal / Info */}
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <button
                onClick={() => onNavigate('about')}
                className="text-left text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={onBookCallClick}
                className="text-left text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
              <span className="text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors cursor-pointer">
                Privacy
              </span>
              <span className="text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors cursor-pointer">
                Terms
              </span>
            </div>

            {/* Column 3: Socials */}
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors"
              >
                X (Twitter)
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm sm:text-base font-sans text-white/85 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* 
          MONUMENTAL CONTINUOUS MARQUEE HEADING
          BRAHAM AGENCY®
          — Speed reduced via inline animationDuration override (60s per loop)
        */}
        <div className="footer-monumental-wrapper py-10 sm:py-16 md:py-20 flex items-center overflow-hidden w-full relative">
          <div
            className="animate-marquee-constant whitespace-nowrap flex items-center"
            style={{ animationDuration: '60s' }}
          >
            {/* Track 1 */}
            <div className="flex items-center shrink-0">
              {[...Array(3)].map((_, i) => (
                <span
                  key={`footer-m1-${i}`}
                  className="flex items-center text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[12rem] font-black font-sans uppercase tracking-[-0.04em] text-white leading-none pr-8 sm:pr-14 md:pr-20 drop-shadow-2xl"
                >
                  BRAHAM AGENCY
                  <span className="text-2xl sm:text-4xl lg:text-6xl align-top font-normal ml-2 sm:ml-4 text-white/50">
                    ®
                  </span>
                  <span className="text-3xl sm:text-5xl lg:text-7xl font-mono text-[#5ce1e6] ml-8 sm:ml-14 md:ml-20 font-normal">
                    ✳
                  </span>
                </span>
              ))}
            </div>

            {/* Track 2 (exact duplicate for seamless infinite loop) */}
            <div className="flex items-center shrink-0" aria-hidden="true">
              {[...Array(3)].map((_, i) => (
                <span
                  key={`footer-m2-${i}`}
                  className="flex items-center text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[12rem] font-black font-sans uppercase tracking-[-0.04em] text-white leading-none pr-8 sm:pr-14 md:pr-20 drop-shadow-2xl"
                >
                  BRAHAM AGENCY
                  <span className="text-2xl sm:text-4xl lg:text-6xl align-top font-normal ml-2 sm:ml-4 text-white/50">
                    ®
                  </span>
                  <span className="text-3xl sm:text-5xl lg:text-7xl font-mono text-[#5ce1e6] ml-8 sm:ml-14 md:ml-20 font-normal">
                    ✳
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 
          BOTTOM CREDITS BAR
        */}
        <div className="pt-6 sm:pt-8 border-t border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div className="flex items-center gap-3 tracking-wider uppercase">
        <img
  src="https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/Braham%20Logo.png"
  alt="BRAHAM Logo"
  className="h-4 w-auto object-contain opacity-90"
  referrerPolicy="no-referrer"
/>
            <span className="text-white/30">|</span>
            <span className="text-white font-bold">DIGITAL AGENCY</span>
          </div>

          <div className="tracking-wider uppercase flex items-center gap-1">
            <span>&copy;</span>
            <NumberCounter value={2026} duration={1.2} />
            <span>BRAHAM&reg;. ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};