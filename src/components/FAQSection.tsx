import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NumberCounter } from './motion/NumberCounter';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What services does Braham offer?',
    answer:
      'We specialize in bespoke web design and development, creative direction, brand identity systems, and high-performance digital experiences. Every project is crafted from the ground up.',
  },
  {
    question: 'Can you handle both design and development?',
    answer:
      'Yes. We provide complete end-to-end execution: creative direction, layout and interface design, typography systems, bespoke animation, and clean, responsive front-end engineering.',
  },
  {
    question: 'How do we begin working together?',
    answer:
      'Every engagement begins with a direct discussion about your brand goals, scope, and timeline expectations. Use our contact form to share your project brief, and we will follow up directly.',
  },
  {
    question: 'Do you work with clients internationally?',
    answer:
      'Yes. Braham collaborates with ambitious brands, founders, and studios across different time zones, maintaining structured communication and regular progress milestones throughout each phase.',
  },
  {
    question: 'Are your designs built from custom systems or templates?',
    answer:
      'All of our websites and digital experiences are designed custom for each client. We do not use pre-built generic templates or cookie-cutter solutions.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-left-col',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
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
        '.faq-accordion-item',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-accordions-container',
            start: 'top 85%',
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
      id="faq-section"
      className="bg-[#F9F9F8] text-[#0D0D0D] pt-12 sm:pt-16 pb-20 sm:pb-28 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Metadata Strip */}
        <div className="pb-3 border-b border-black/[0.08] flex items-center justify-between text-xs sm:text-sm font-mono text-[#52524E] mb-12 sm:mb-16">
          <span className="font-bold text-black">[07]</span>
          <span className="tracking-widest uppercase">// FAQ</span>
          <span className="font-bold text-black tracking-wider uppercase">GOT QUESTIONS?</span>
        </div>

        {/* 2-Column Grid: Photo & Narrative (Left) + 5 Accordions (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Model Photo + Narrative */}
          <div className="faq-left-col lg:col-span-5 flex flex-col">
            <div className="w-full aspect-[4/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-200 border border-black/[0.08] mb-6 shadow-sm group">
              <img
                src="https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/and.webp"
                alt="Braham FAQ Studio Vision"
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-104 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xl sm:text-2xl font-sans text-[#1F1F1E] font-medium leading-snug tracking-tight">
              Every detail intentional. Every decision strategic. Websites crafted to endure.
            </p>
          </div>

          {/* Right Column: 5 Expandable Accordion Items */}
          <div className="faq-accordions-container lg:col-span-7 flex flex-col gap-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => toggleIndex(idx)}
                  className="faq-accordion-item bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-black/25 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs sm:text-sm font-mono text-[#888884] font-medium">
                        <NumberCounter value={idx + 1} padZero duration={1} delay={0.1 * idx} suffix="." />
                      </span>
                      <h3 className="text-base sm:text-lg font-medium font-sans text-[#0A0A0A] tracking-tight">
                        {item.question}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-black"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm sm:text-base font-sans text-[#52524E] leading-relaxed border-t border-black/[0.06] mt-4">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
