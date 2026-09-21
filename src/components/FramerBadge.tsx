import React from 'react';

export const FramerBadge: React.FC = () => {
  return (
    <aside
      id="framer-floating-badge"
      aria-label="Framer Platform Badge"
      className="fixed bottom-4 right-4 z-40"
    >
      <div
        className="flex items-center gap-2 bg-white/95 hover:bg-white text-black px-3.5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-black/[0.08] transition-transform duration-200 hover:scale-105 active:scale-95 text-xs font-medium tracking-tight cursor-pointer backdrop-blur-md"
        title="Braham Creative Agency"
      >
        <svg
          className="w-3.5 h-3.5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
        <span className="font-sans font-medium text-[11px]">Made in Framer</span>
      </div>
    </aside>
  );
};
