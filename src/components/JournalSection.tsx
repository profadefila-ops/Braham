import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface JournalPost {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  headline: string;
}

interface JournalSectionProps {
  onPostClick: (slug: string) => void;
}

const JOURNAL_POSTS: JournalPost[] = [
  {
    id: 'post-1',
    slug: 'introducing-braham-bold-new-identity',
    number: '001',
    title: 'Introducing Braham: A Bold New Identity for a Bold Future',
    category: 'Business',
    image:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/neww1.webp',
    readTime: '5 MIN READ',
    date: 'SEPTEMBER 2026',
    headline:
      'At Findar, our mission has always been clear  to empower businesses and individuals',
  },
  {
    id: 'post-2',
    slug: 'hired-almost-too-late-confessions-web-team',
    number: '002',
    title: 'We Were Hired Almost Too Late: Confessions from the Web Team',
    category: 'Business',
    image:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/Blog-1_-Website.webp',
    readTime: '6 MIN READ',
    date: 'SEPTEMBER 2026',
    headline:
      'Every agency has war stories. Ours usually start with a call that begins like this:',
  },
  {
    id: 'post-3',
    slug: 'what-your-logo-would-say-if-it-could-talk',
    number: '003',
    title: 'What Your Logo Would Say If It Could Talk',
    category: 'Consultation',
    image:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/Blog-3_-Logo.webp',
    readTime: '5 MIN READ',
    date: 'SEPTEMBER 2026',
    headline:
      'Logos have feelings. Okay, maybe not literally, but if they could talk, some would be crying',
  },
];

export const JournalSection: React.FC<JournalSectionProps> = ({
  onPostClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journal-heading-block',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.journal-post-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.journal-cards-grid',
            start: 'top 84%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journal-section"
      className="relative bg-[#F9F9F8] text-[#0D0D0D] pt-14 sm:pt-20 pb-20 sm:pb-32 overflow-hidden select-none"
    >
      {/* Radiant Ambient Aura at Top Right in #5ce1e6 */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-[radial-gradient(circle_at_top_right,rgba(92,225,230,0.38)_0%,rgba(130,235,240,0.18)_40%,rgba(249,249,248,0)_70%)] blur-2xl z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Metadata Strip */}
        <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono text-[#52524E] mb-10 sm:mb-14">
          <span className="font-bold text-black"></span>
          <span className="tracking-widest uppercase">// JOURNAL</span>
          <span className="font-bold text-black tracking-wider uppercase">
            STAY INFORMED
          </span>
        </div>

        {/* Section Headline & Narrative */}
        <div className="journal-heading-block grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-sans uppercase tracking-[-0.04em] leading-[0.92] text-[#0A0A0A]">
              LATEST
              <br />
              INSIGHTS
            </h2>
          </div>

          <div className="lg:col-span-6 flex justify-start lg:justify-end">
            <p className="max-w-md text-base sm:text-lg text-[#1F1F1E] font-normal leading-relaxed">
              Explore industry news and creative strategies to keep your website
              ahead of the curve.
            </p>
          </div>
        </div>

        {/* 
          STAGGERED 3-COLUMN EDITORIAL CARDS
          - Card 1 (Left)   → mt-24 lg:mt-32
          - Card 2 (Middle) → mt-12 lg:mt-16
          - Card 3 (Right)  → mt-0
          Each card navigates to /blog/<slug> on click.
        */}
        <div className="journal-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {JOURNAL_POSTS.map((post, idx) => {
            const offsetClass =
              idx === 0
                ? 'mt-0 md:mt-24 lg:mt-32'
                : idx === 1
                ? 'mt-0 md:mt-12 lg:mt-16'
                : 'mt-0';

            return (
              <div
                key={post.id}
                onClick={() => onPostClick(post.slug)}
                className={`journal-post-card group flex flex-col cursor-pointer ${offsetClass} transition-transform duration-500 hover:-translate-y-2`}
              >
                <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-200 border border-black/[0.08] mb-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-shadow">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-md">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>

                {/* Bottom Metadata Bar */}
                <div className="flex items-center justify-between pt-2 pb-1 border-t border-black/[0.08] text-xs sm:text-sm font-mono text-[#1F1F1E]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold text-black shrink-0">
                      <NumberCounter
                        value={idx + 1}
                        padZero
                        duration={1.2}
                        delay={0.15 * (idx + 1)}
                      />
                    </span>
                    <span className="font-sans font-bold text-[#0A0A0A] tracking-tight truncate group-hover:text-black">
                      {post.title}
                    </span>
                  </div>
                  <span className="text-[#666] font-mono uppercase tracking-wider text-[10px] shrink-0 ml-2">
                    {post.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};