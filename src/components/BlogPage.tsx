import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Search } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NumberCounter } from './motion/NumberCounter';
import { BLOG_POSTS as ALL_POSTS } from '../data/blogPosts';

gsap.registerPlugin(ScrollTrigger);

interface BlogPostCard {
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

interface BlogPageProps {
  onBackToHome: () => void;
  onBookCallClick: (service?: string) => void;
  onPostClick: (slug: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onBackToHome,
  onPostClick,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [query, setQuery] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  const BLOG_POSTS: BlogPostCard[] = useMemo(
    () =>
      ALL_POSTS.map((p) => ({
        id: p.id,
        slug: p.slug,
        number: p.number,
        title: p.title,
        category: p.category,
        image: p.image,
        readTime: p.readTime,
        date: p.date,
        headline: p.headline,
      })),
    []
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    BLOG_POSTS.forEach((p) => set.add(p.category));
    return ['All', ...Array.from(set)];
  }, [BLOG_POSTS]);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' || p.category === activeCategory;
      const matchesQuery =
        query.trim() === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.headline.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [BLOG_POSTS, activeCategory, query]);

  // H1 char-by-char reveal
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    let rafId: number;
    let killCtx: (() => void) | null = null;

    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          gsap.from('.blog-hero-char', {
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

  // Scroll reveal for heading + cards
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId: number;
    let killCtx: (() => void) | null = null;

    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          gsap.from('.journal-heading-block', {
            opacity: 0,
            y: 35,
            duration: 0.85,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          });

          gsap.from('.journal-post-card', {
            opacity: 0,
            y: 50,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '.journal-cards-grid',
              start: 'top 95%',
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
  }, [filteredPosts.length]);

  const heroTopChars = 'LATEST'.split('');
  const heroBottomChars = 'INSIGHTS'.split('');

  return (
    <motion.div
      ref={pageRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-[#F9F9F8] text-[#0D0D0D] font-sans pt-24 sm:pt-28 pb-16"
    >
      <section
        ref={sectionRef}
        className="relative bg-[#F9F9F8] text-[#0D0D0D] pt-6 pb-20 sm:pb-32 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute top-0 right-0 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-[radial-gradient(circle_at_top_right,rgba(92,225,230,0.38)_0%,rgba(130,235,240,0.18)_40%,rgba(249,249,248,0)_70%)] blur-2xl z-0"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between gap-4 mb-10 sm:mb-14">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#4A4A48] hover:text-black transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-black" />
              <span>RETURN TO HOME</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-black/[0.08] text-[11px] font-mono tracking-widest text-[#4A4A48] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#5ce1e6]" />
              <span>{BLOG_POSTS.length} ESSAYS PUBLISHED</span>
            </div>
          </div>

          <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono text-[#52524E] mb-10 sm:mb-14">
            <span className="font-bold text-black"></span>
            <span className="tracking-widest uppercase">// JOURNAL</span>
            <span className="font-bold text-black tracking-wider uppercase">
              STAY INFORMED
            </span>
          </div>

          <div className="journal-heading-block grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-7">
              <h1
                ref={heroRef}
                className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-black font-sans uppercase tracking-[-0.045em] leading-[0.92] text-[#0D0D0D] overflow-hidden"
              >
                {heroTopChars.map((char, i) => (
                  <span
                    key={`top-${i}`}
                    className="blog-hero-char inline-block"
                    style={{ willChange: 'transform' }}
                  >
                    {char}
                  </span>
                ))}
                <br />
                {heroBottomChars.map((char, i) => (
                  <span
                    key={`bot-${i}`}
                    className="blog-hero-char inline-block"
                    style={{ willChange: 'transform' }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div>

            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <p className="max-w-md text-base sm:text-lg text-[#1F1F1E] font-normal leading-relaxed">
                Explore industry news and creative strategies to keep your website
                ahead of the curve.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/[0.08] mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const count =
                  cat === 'All'
                    ? BLOG_POSTS.length
                    : BLOG_POSTS.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                        : 'bg-white/70 text-[#4A4A48] border-black/[0.12] hover:border-black/40 hover:text-black'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] ${
                        isActive ? 'text-white/60' : 'text-[#8E8E89]'
                      }`}
                    >
                      {String(count).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E89]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search essays..."
                className="w-full pl-9 pr-3 py-2 rounded-full bg-white/70 border border-black/[0.12] focus:border-black/60 focus:ring-0 outline-none text-sm font-sans text-[#0D0D0D] placeholder:text-[#B5B5B0] transition-colors"
              />
            </div>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 border border-dashed border-black/[0.12] rounded-3xl">
              <p className="text-sm font-mono uppercase tracking-widest text-[#8E8E89] mb-2">
                NO MATCHING ESSAYS
              </p>
              <p className="text-sm text-[#555552] font-sans">
                Try a different category or clear your search.
              </p>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="journal-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
              {filteredPosts.map((post, idx) => {
                const offsetClass =
                  idx === 0
                    ? 'mt-0 md:mt-24 lg:mt-32'
                    : idx === 1
                    ? 'mt-0 md:mt-12 lg:mt-16'
                    : 'mt-0';

                return (
                  <div
                    key={post.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onPostClick(post.slug)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onPostClick(post.slug);
                      }
                    }}
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
          )}
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#0D0D0D] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_top_right,rgba(92,225,230,0.35)_0%,rgba(130,235,240,0.12)_40%,transparent_70%)] blur-2xl z-0"
          />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5ce1e6] block mb-3">
              [09] // READY TO BUILD
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans uppercase tracking-tight text-white leading-none mb-6">
              LET&apos;S CRAFT YOUR NEXT FLAGSHIP.
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              We accept a limited number of commissions each quarter. Share your
              brief and we&apos;ll respond within two business days.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 bg-[#5ce1e6] hover:bg-[#48d2d7] text-black font-semibold px-6 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:shadow-cyan-500/25 active:scale-95"
              >
                <span>Back to Home</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};