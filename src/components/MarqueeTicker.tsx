import React from 'react';
import { MARQUEE_ITEMS } from '../data/content';

export const MarqueeTicker: React.FC = () => {
  return (
    <div
      id="service-ticker-section"
      className="bg-[#0A0A0A] text-white border-y border-black py-1.5 overflow-hidden select-none"
    >
      {/* Infinite Horizontal Marquee with Solid Black Strap */}
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee-track whitespace-nowrap flex items-center gap-6 sm:gap-10 text-[10px] sm:text-[11px] font-normal tracking-widest font-mono text-white/90 leading-none">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 sm:gap-10">
              <span className="hover:text-white transition-colors cursor-default tracking-widest uppercase">
                {item}
              </span>
              <span className="text-white/40 font-normal select-none text-[9px] sm:text-[10px]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};