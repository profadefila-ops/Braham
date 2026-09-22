import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { SERVICES_STACK } from '../data/content';
import { NumberCounter } from './motion/NumberCounter';

interface ServicesIntroProps {
  onServiceSelect?: (serviceName: string) => void;
}

export const ServicesIntro: React.FC<ServicesIntroProps> = ({ onServiceSelect }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Responsive 280vh scroll track: fast, snappy stacking with zero drag or sluggishness
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Balanced Framer spring physics: rapid response (<20ms) with silky smooth cushioning
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.1,
    restDelta: 0.0001,
  });

  const scrollToCard = (index: number) => {
    if (!sectionRef.current) return;
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
    const targetProgress = index === 0 ? 0.02 : 0.06 + (index - 1) * 0.18 + 0.09;
    const targetY = sectionRef.current.offsetTop + totalScrollable * targetProgress;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="services-scroll-container"
      className="relative h-[280vh] bg-[#F9F9F8]"
    >
      {/* 
        STICKY PINNED VIEWPORT:
        - Locks firmly at top-0 h-screen.
        - Background, heading, and statue remain completely stationary.
        - Cards stack in rapid, smooth succession with soft cushioned landings.
        - Card 04 is positioned in the upper half of the screen, ensuring complete top-to-bottom visibility.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-start pt-4 sm:pt-6 z-10 select-none">
        {/* Radiant Ambient Aura in #5ce1e6 */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-[radial-gradient(circle_at_top_right,rgba(92,225,230,0.45)_0%,rgba(130,235,240,0.22)_40%,rgba(249,249,248,0)_72%)] blur-2xl z-0"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-12 left-10 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(92,225,230,0.2)_0%,rgba(249,249,248,0)_65%)] blur-3xl z-0"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col">
          {/* Top Section Metadata Strip (Exact Video 00:00 - 00:02) */}
          <div className="pb-2 sm:pb-3 border-b border-black/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono text-[#52524E] shrink-0">
            <span className="font-bold text-black"></span>
            <span className="tracking-widest uppercase">// CORE CAPABILITIES</span>
            <span className="font-bold text-black tracking-wider uppercase">SERVICES</span>
          </div>

          {/* Section Heading + Classical Sculpture with Braham Signature (Fixed, compact header) */}
          <div className="pt-2 sm:pt-3 pb-2 sm:pb-3 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center shrink-0">
            {/* Monumental Headline */}
            <div className="lg:col-span-9">
              <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-black font-sans uppercase tracking-[-0.04em] leading-[0.92] text-[#0A0A0A]">
                WE TURN VISION
                <br />
                INTO REALITY
              </h2>
            </div>

            {/* Classical Sculpture Sculpture */}
           <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center">
  <div className="relative w-18 sm:w-24 lg:w-28 aspect-[3/4] flex items-center justify-center">
    <img
      src="https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/4-removebg-preview.png"
      alt="Sculpture Bust"
      className="w-full h-full object-contain select-none pointer-events-none drop-shadow-md"
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  </div>
</div>
          </div>

          {/* 
            SMOOTH STACKING CARDS DECK AREA (Framer Motion Interface)
            - Positioned in upper viewport so Card 04 ends ~400px from top, leaving 350px+ of open clearance below
            - Smooth, fast entry one after the other with cushioned deceleration
          */}
          <div className="relative w-full min-h-[290px] sm:min-h-[320px] pt-1">
            <div className="relative w-full h-[250px] sm:h-[270px]">
              {SERVICES_STACK.map((service, index) => {
                return (
                  <SmoothStackedCard
                    key={service.id}
                    service={service}
                    index={index}
                    smoothProgress={smoothProgress}
                    onSelect={() => onServiceSelect && onServiceSelect(service.title)}
                  />
                );
              })}
            </div>
          </div>

          {/* Bottom Card Progression & Scroll Indicator Strip */}
          <div className="mt-5 pt-3 pb-2 border-t border-black/[0.08] flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#666662]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
              <span className="uppercase tracking-wider flex items-center gap-1">
                <NumberCounter value={SERVICES_STACK.length} duration={1.2} />
                <span>CAPABILITIES STACKED</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              {SERVICES_STACK.map((_, idx) => (
                <IndicatorDot
                  key={idx}
                  index={idx}
                  smoothProgress={smoothProgress}
                  onClick={() => scrollToCard(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 
        GENEROUS TRANSITION SPACER:
        Guarantees clear, open whitespace between the bottom of Card 04 and the next section ([04] PRICING).
        The black pricing section will NEVER touch, clip, or overflow into Card 04.
      */}
      <div className="h-[40vh] sm:h-[50vh] w-full bg-[#F9F9F8] flex items-end justify-center pb-8" aria-hidden="true">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-black/[0.06]" />
        </div>
      </div>
    </section>
  );
};

interface SmoothStackedCardProps {
  service: typeof SERVICES_STACK[0];
  index: number;
  smoothProgress: any;
  onSelect: () => void;
}

const SmoothStackedCard: React.FC<SmoothStackedCardProps> = ({
  service,
  index,
  smoothProgress,
  onSelect,
}) => {
  // Cascading offset: each card stops slightly lower so previous cards' headers stay clearly visible
  // Desktop: 0px, 32px, 64px, 96px
  const desktopOffset = index * 32;

  // FAST, RESPONSIVE STACKING TIMING:
  // Card 0: resting at 0
  // Card 1: glides in smoothly between 0.06 and 0.24
  // Card 2: glides in smoothly between 0.24 and 0.42
  // Card 3: glides in smoothly between 0.42 and 0.60
  // 0.60 to 0.85: all 4 cards remain fully stacked with Card 04 100% visible from top to bottom
  const st = index === 0 ? 0 : 0.06 + (index - 1) * 0.18;
  const et = index === 0 ? 0.04 : st + 0.18;

  // Smooth Y translation with custom cubic cushion curve for soft-landing deceleration
  const y = useTransform(smoothProgress, (p: number) => {
    if (index === 0) return 0;
    if (p <= st) return 360;
    if (p >= et) return desktopOffset;
    const t = (p - st) / (et - st);
    // Smooth ease-out quintic curve: fast natural start, silky-smooth cushioned landing
    const eased = 1 - Math.pow(1 - t, 3.2);
    return 360 - eased * (360 - desktopOffset);
  });

  // Soft opacity fade so cards emerge cleanly into view without visual pop
  const opacity = useTransform(smoothProgress, (p: number) => {
    if (index === 0) return 1;
    if (p <= st) return 0;
    if (p >= et) return 1;
    const t = (p - st) / (et - st);
    return Math.min(1, t * 3.5);
  });

  // Subtle depth scale transition
  const scale = useTransform(smoothProgress, (p: number) => {
    if (index === 0) {
      if (p <= 0.06) return 1;
      return Math.max(0.985, 1 - (p - 0.06) * 0.025);
    }
    if (p <= st) return 0.975;
    if (p >= et) return 1;
    const t = (p - st) / (et - st);
    return 0.975 + t * 0.025;
  });

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        zIndex: 10 + index * 10,
      }}
      onClick={onSelect}
      className="absolute inset-x-0 top-0 cursor-pointer w-full rounded-2xl sm:rounded-3xl bg-white border border-black/[0.1] p-5 sm:p-6 md:p-7 shadow-[0_-4px_20px_rgba(0,0,0,0.03),0_16px_40px_rgba(0,0,0,0.08)] hover:border-black/25 transition-colors select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
        {/* Left Column: Square Photo Thumbnail + Number + Service Title (Exact Video Match) */}
        <div className="lg:col-span-5 flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Square Photo Thumbnail */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-black/5 shadow-inner">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Number & Title */}
          <div className="flex items-baseline gap-3">
           <span className="text-2xl sm:text-3xl font-medium font-sans text-black">
  <NumberCounter value={index + 1} padZero duration={1.2} delay={0.1 * index} />
</span>
            <h3 className="text-xl sm:text-2xl lg:text-[1.35rem] font-medium font-sans text-[#0A0A0A] tracking-tight whitespace-nowrap">
  {service.title}
</h3>
          </div>
        </div>

        {/* Right Column: Statement Headline + Tags (Exact Video 00:02 - 00:05) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="text-base sm:text-lg lg:text-xl font-sans text-[#111] font-normal leading-snug tracking-tight mb-3">
            {service.headline}
          </p>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 rounded-lg border border-black/15 bg-white text-xs sm:text-[12px] font-mono text-[#2B2B28] hover:border-black hover:bg-neutral-50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const IndicatorDot: React.FC<{
  index: number;
  smoothProgress: any;
  onClick: () => void;
}> = ({ index, smoothProgress, onClick }) => {
  const st = index === 0 ? 0 : 0.06 + (index - 1) * 0.18;
  const et = index === 0 ? 0.04 : st + 0.18;

  const width = useTransform(smoothProgress, (p: number) => {
    if (index === 0) {
      return p <= 0.18 ? '24px' : '10px';
    }
    return p >= st - 0.03 && p < et + 0.06 ? '24px' : '10px';
  });

  const opacity = useTransform(smoothProgress, (p: number) => {
    if (index === 0) {
      return p <= 0.18 ? 1 : 0.35;
    }
    return p >= st - 0.03 && p < et + 0.06 ? 1 : 0.35;
  });

  return (
    <motion.button
      style={{ width, opacity }}
      onClick={onClick}
      className="h-2 rounded-full bg-black cursor-pointer"
      aria-label={`Jump to service card ${index + 1}`}
    />
  );
};
