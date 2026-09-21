import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Tag,
  Calendar,
  User,
  Check,
  Plus,
} from 'lucide-react';
import { BLOG_POSTS, getPostBySlug } from '../data/blogPosts';
import { SeoHead } from './SeoHead';
import { NumberCounter } from './motion/NumberCounter';

interface BlogPostPageProps {
  slug: string;
  onBackToBlog: () => void;
  onBackToHome: () => void;
  onBookCallClick: (service?: string) => void;
  onPostClick: (slug: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  slug,
  onBackToBlog,
  onBackToHome,
  onBookCallClick,
  onPostClick,
}) => {
  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    // Double RAF ensures the new post has painted before we scroll
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    });
    return () => cancelAnimationFrame(rafId);
  }, [slug]);

  if (!post) {
    return (
      <div className="w-full bg-[#F9F9F8] pt-40 pb-32 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E89] block mb-3">
            404 // ESSAY NOT FOUND
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-sans uppercase tracking-tight mb-6">
            This Essay Doesn&apos;t Exist.
          </h1>
          <button
            onClick={onBackToBlog}
            className="inline-flex items-center gap-2 bg-[#0D0D0D] hover:bg-black text-white px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journal</span>
          </button>
        </div>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Braham' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://braham.studio/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://braham.studio' },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: 'https://braham.studio/#blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://braham.studio/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <SeoHead
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        canonical={`https://braham.studio/blog/${post.slug}`}
        ogImage={post.image}
        ogType="article"
        articlePublished={post.dateISO}
        articleAuthor={post.author}
        jsonLd={[articleSchema, faqSchema, breadcrumbSchema]}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-[#F9F9F8] text-[#0D0D0D] font-sans pt-24 sm:pt-28 pb-16"
      >
        {/* HERO */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-6 pb-10 sm:pb-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_70%_60%_at_70%_10%,rgba(92,225,230,0.28)_0%,rgba(130,235,240,0.10)_40%,rgba(249,249,248,0)_75%)] blur-3xl z-0"
          />

          <div className="relative z-10 flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E8E89] mb-8">
            <button onClick={onBackToHome} className="hover:text-black transition-colors cursor-pointer">
              HOME
            </button>
            <span>/</span>
            <button onClick={onBackToBlog} className="hover:text-black transition-colors cursor-pointer">
              JOURNAL
            </button>
            <span>/</span>
            <span className="text-[#0D0D0D]">{post.category.toUpperCase()}</span>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4 text-[11px] font-mono uppercase tracking-widest text-[#8E8E89] mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black text-white font-bold">
              <NumberCounter value={parseInt(post.number, 10)} padZero duration={0.8} />
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-black font-sans tracking-[-0.03em] leading-[0.98] text-[#0D0D0D] mb-6">
            {post.title}
          </h1>

          <p className="relative z-10 text-lg sm:text-2xl text-[#3A3A38] font-sans leading-[1.35] tracking-tight mb-8 max-w-3xl">
            {post.headline}
          </p>

          <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-black/[0.08]">
            <div className="w-11 h-11 rounded-full bg-neutral-200 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-[#8E8E89]" />
            </div>
            <div>
              <div className="text-sm font-semibold font-sans text-[#0D0D0D] tracking-tight">
                {post.author}
              </div>
              <div className="text-[11px] font-mono text-[#737370] tracking-wide mt-0.5">
                {post.authorRole} · Braham Agency
              </div>
            </div>
          </div>
        </section>

        {/* HERO IMAGE */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-14 sm:pb-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-200 border border-black/[0.08]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        {/* QUICK ANSWER */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-14 sm:pb-16">
          <div className="relative rounded-2xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5ce1e6] block mb-3">
              [QUICK ANSWER]
            </span>
            <p className="text-base sm:text-lg text-[#0D0D0D] font-sans leading-relaxed">
              {post.quickAnswer}
            </p>
          </div>
        </section>

        {/* BODY */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-14 sm:pb-16">
          <div className="space-y-6 text-base sm:text-lg font-sans text-[#1F1F1E] leading-[1.75]">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* KEY TAKEAWAYS */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-14 sm:pb-20">
          <div className="rounded-2xl border border-black/[0.08] bg-white p-6 sm:p-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8E89] block mb-5">
              [KEY TAKEAWAYS]
            </span>
            <ul className="space-y-3">
              {post.keyTakeaways.map((tk, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm sm:text-base font-sans text-[#1F1F1E] leading-relaxed"
                >
                  <Check className="w-4 h-4 text-[#5ce1e6] shrink-0 mt-1" />
                  <span>{tk}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-14 sm:pb-20">
          <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-xs font-mono text-[#52524E] mb-8">
            <span className="font-bold text-black">[FAQ]</span>
            <span className="tracking-widest uppercase">FREQUENTLY ASKED</span>
            <span className="hidden sm:inline font-bold text-black">
              {post.faqs.length} QUESTIONS
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[#0D0D0D] uppercase mb-6">
            Questions about this topic.
          </h2>

          <div className="space-y-3">
            {post.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-black/20 bg-white shadow-sm'
                      : 'border-black/[0.08] bg-white/70'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-sans font-medium text-[#0D0D0D] tracking-tight">
                      {faq.q}
                    </span>
                    <span className="shrink-0 w-7 h-7 flex items-center justify-center text-[#0D0D0D]">
                      <Plus
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        strokeWidth={1.75}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-[#555552] font-sans leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-16 sm:pb-20">
            <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-xs font-mono text-[#52524E] mb-8">
              <span className="font-bold text-black">[NEXT]</span>
              <span className="tracking-widest uppercase">KEEP READING</span>
              <button
                onClick={onBackToBlog}
                className="font-bold text-black hover:text-[#5ce1e6] transition-colors cursor-pointer"
              >
                VIEW ALL →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <button
                  key={rp.id}
                  onClick={() => onPostClick(rp.slug)}
                  className="group text-left cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200 border border-black/[0.08] mb-4">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#8E8E89] mb-2">
                    {rp.number} · {rp.category}
                  </div>
                  <div className="text-lg font-bold font-sans tracking-tight text-[#0D0D0D] group-hover:text-black">
                    {rp.title}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* CTA BANNER */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="relative rounded-3xl bg-[#0D0D0D] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_top_right,rgba(92,225,230,0.35)_0%,rgba(130,235,240,0.12)_40%,transparent_70%)] blur-2xl z-0"
            />
            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5ce1e6] block mb-3">
                [READY TO BUILD]
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans uppercase tracking-tight text-white leading-none mb-6">
                PUT THESE IDEAS TO WORK.
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed mb-8 sm:mb-10 max-w-2xl">
                We accept a limited number of commissions each quarter. Share your
                brief and we&apos;ll respond within two business days.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onBookCallClick(`Blog Inquiry: ${post.title}`)}
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
    </>
  );
};