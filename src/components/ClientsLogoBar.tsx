import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLIENT_LOGOS } from '../data/content';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface ClientsLogoBarProps {
  onClientClick: (clientId: string) => void;
}

export const ClientsLogoBar: React.FC<ClientsLogoBarProps> = ({ onClientClick }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId: number;
    let killCtx: (() => void) | null = null;

    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          gsap.from('.client-brand-card', {
            opacity: 0,
            y: 30,
            scale: 0.96,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
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
      id="clients-bar-section"
      className="border-b border-black/[0.08] bg-[#F9F9F8] py-8 sm:py-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/[0.06] text-xs font-mono text-[#6E6E6A]">
          <span>SECTORS &amp; BRAND PRACTICES</span>
          <span>BRAHAM DIGITAL STUDIO</span>
        </div>

        {/* Brand Focus Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
          {CLIENT_LOGOS.map((client, idx) => (
            <button
              key={client.id}
              id={`client-logo-${client.id}`}
              onClick={() => onClientClick(client.id)}
              className="client-brand-card group flex flex-col items-center justify-center p-5 sm:p-6 rounded-xl border border-black/[0.08] hover:border-black/50 bg-white hover:bg-neutral-950 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-[10px] font-mono text-[#8E8E89] group-hover:text-[#5ce1e6] transition-colors">
                  <NumberCounter
                    value={parseInt(client.code.replace(/\D/g, '') || '1', 10)}
                    prefix="["
                    suffix="]"
                    padZero
                    duration={1}
                    delay={0.1 * idx}
                  />
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#8E8E89] group-hover:text-white/70 transition-colors">
                  {client.tagline}
                </span>
              </div>

              {/* Colored client logo — image */}
              {/* Colored logo — flips to pure white silhouette on hover */}
<div className="h-16 sm:h-20 w-full flex items-center justify-center">
  <img
    src={client.logoUrl}
    alt={client.name}
    className="max-h-14 sm:max-h-16 w-auto max-w-[160px] object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
    referrerPolicy="no-referrer"
    loading="lazy"
  />
</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};