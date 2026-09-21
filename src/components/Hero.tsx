import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ROTATING_TITLES, HERO_SERVICES } from '../data/content';
import { ServiceItem } from '../types';
import { NumberCounter } from './motion/NumberCounter';

interface HeroProps {
  onServiceSelect: (service: ServiceItem) => void;
  onReviewsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onServiceSelect }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const heroRootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  // Rotating title every 3.6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  // GSAP Cinematic Intro Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.hero-headline-word',
        { y: '120%', opacity: 0, rotateZ: 2 },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration: 1.1,
          stagger: 0.12,
          delay: 0.15,
        }
      )
        .fromTo(
          '.hero-meta-item',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          '-=0.7'
        )
        .fromTo(
          '.hero-bottom-item',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
          '-=0.5'
        );
    }, heroRootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRootRef}
      id="hero-section"
      className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* 
        ========================================================================
        AMBIENT GRADIENT LAYERS
        - Top-center cyan wash (main hero ambiance)
        - Top-right cyan burst
        - Bottom-left warm amber (#ffbd59) — subtle accent
        ========================================================================
      */}

      {/* Top-center cyan wash */}
      <div
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[650px] bg-[radial-gradient(ellipse_85%_65%_at_50%_0%,rgba(92,225,230,0.48)_0%,rgba(130,235,240,0.22)_35%,rgba(249,249,248,0)_75%)] transition-opacity duration-1000"
        aria-hidden="true"
      />

      {/* Top-right cyan burst */}
      <div
        className="pointer-events-none absolute -top-10 right-[-120px] sm:right-[-60px] lg:right-0 w-[680px] h-[680px] bg-[radial-gradient(circle,rgba(92,225,230,0.55)_0%,rgba(140,238,243,0.28)_40%,rgba(180,245,250,0.12)_60%,rgba(249,249,248,0)_78%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-24 right-[-40px] sm:right-0 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(92,225,230,0.32)_0%,rgba(249,249,248,0)_70%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Bottom-left warm amber glow (#ffbd59) — subtler, tighter */}
      <div
        className="pointer-events-none absolute -bottom-24 left-[-140px] sm:left-[-80px] lg:left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,189,89,0.32)_0%,rgba(255,200,120,0.18)_35%,rgba(255,215,160,0.06)_58%,rgba(249,249,248,0)_78%)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-4 left-[-10px] w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(255,189,89,0.20)_0%,rgba(249,249,248,0)_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Metadata Row */}
        <div
          ref={metadataRef}
          className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#575754] tracking-tight pb-6 sm:pb-10 border-b border-black/[0.06]"
        >
          <div className="hero-meta-item flex items-center gap-2">
            <span className="text-[#1A1A18] font-semibold tracking-wider">
              BRAHAM
            </span>
            <span className="text-[#9A9A96]">/</span>
            <span className="text-[#7A7A76] uppercase">
              INDEPENDENT CREATIVE AGENCY
            </span>
          </div>

          <div className="hero-meta-item flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#1A1A18] font-medium uppercase tracking-wide">
              WEBSITES &amp; DIGITAL EXPERIENCES
            </span>
            <span className="text-[#9A9A96]">®</span>
          </div>
        </div>

        {/* Main Editorial Hero Typography */}
        <div className="pt-8 sm:pt-12 pb-10 sm:pb-14">
          <div className="overflow-hidden flex items-start justify-between flex-wrap gap-2">
            <h1
              ref={headlineRef}
              className="text-[12vw] sm:text-[9.5vw] lg:text-[7.4vw] leading-[0.9] font-extrabold tracking-[-0.045em] text-[#0A0A0A] font-sans uppercase select-none flex flex-wrap items-baseline gap-x-3 sm:gap-x-5"
            >
              <span className="inline-block overflow-hidden py-1">
                <span className="hero-headline-word inline-block will-change-transform">
                  CREATIVE
                </span>
              </span>
              <span className="inline-block overflow-hidden py-1">
                <span className="hero-headline-word inline-block will-change-transform">
                  AGENCY
                </span>
              </span>
              <sup className="hero-headline-word text-[0.3em] font-normal align-super text-[#666663] ml-1 sm:ml-2">
                ®
              </sup>
            </h1>
          </div>

          {/* Animated Rotating Headline */}
          <div className="h-[9vw] sm:h-[7.5vw] lg:h-[6vw] flex items-center overflow-hidden mt-1 sm:mt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={titleIndex}
                initial={{ opacity: 0, y: 36, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -36, filter: 'blur(6px)' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-[6.8vw] sm:text-[5.4vw] lg:text-[4.4vw] leading-[1.0] font-extrabold tracking-[-0.04em] text-[#111111] uppercase font-sans whitespace-nowrap"
              >
                {ROTATING_TITLES[titleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Hero Split */}
        <div
          ref={bottomRowRef}
          className="pt-6 sm:pt-10 border-t border-black/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          {/* Left Column */}
          <div className="hero-bottom-item lg:col-span-5 flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-sans font-black text-lg tracking-tight shrink-0 shadow-sm transition-transform duration-300 hover:scale-105">
              B
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-black font-sans uppercase">
                  DESIGN-LED STUDIO
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-mono tracking-wider uppercase text-[#666662] font-medium mt-0.5">
                CREATING DISTINCTIVE DIGITAL EXPERIENCES
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="hero-bottom-item lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {HERO_SERVICES.map((srv, idx) => {
                const isSelected = activeServiceIndex === idx;
                return (
                  <button
                    key={srv.number}
                    id={`hero-service-${idx}`}
                    onMouseEnter={() => setActiveServiceIndex(idx)}
                    onClick={() => {
                      setActiveServiceIndex(idx);
                      onServiceSelect(srv);
                    }}
                    className={`group text-left p-2.5 sm:p-3 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-sm translate-x-0.5'
                        : 'bg-white/60 hover:bg-white text-[#2B2B28] border-black/[0.06] hover:border-black/20 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono transition-colors ${
                          isSelected
                            ? 'text-[#8CE196]'
                            : 'text-[#888884] group-hover:text-black'
                        }`}
                      >
                        <NumberCounter
                          value={idx + 1}
                          padZero
                          duration={1}
                          delay={0.1 * idx}
                          suffix="/"
                        />
                      </span>
                      <span className="text-xs sm:text-sm font-semibold tracking-tight">
                        {srv.title}
                      </span>
                    </div>

                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isSelected
                          ? 'text-white translate-x-1'
                          : 'text-[#9A9A96] group-hover:text-black group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Service Micro-Detail Tag */}
            <div className="mt-3 flex items-center justify-between px-2 text-[11px] font-mono text-[#73736F]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  ACTIVE FOCUS: {HERO_SERVICES[activeServiceIndex].title}
                </span>
              </span>
              <span className="hidden sm:inline">
                CLICK TO EXPLORE DELIVERABLES ↗
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};