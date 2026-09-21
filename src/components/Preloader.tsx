import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
  brandName?: string;
  tagline?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  brandName = 'BRAHAM',
  tagline = 'We Craft Digital Experiences',
}) => {
  // Animation phases:
  // 1. 'enter': Heading letters come in sequentially one after the other, followed by tagline letters
  // 2. 'settled': Both heading and tagline are fully legible
  // 3. 'exit-tagline': Tagline letters disappear one by one from left-to-right (revealing "...ces" at the end)
  // 4. 'exit-all': Heading and container fade out into the site
  const [phase, setPhase] = useState<'enter' | 'settled' | 'exit-tagline' | 'exit-all'>('enter');
  const [isVisible, setIsVisible] = useState(true);

  const headingLetters = brandName.split('');
  const taglineLetters = tagline.split('');

  useEffect(() => {
    // Phase 1: Enter starts immediately at t=0
    // Phase 2: Settled at 1.75s (all letters entered)
    const settledTimer = setTimeout(() => {
      setPhase('settled');
    }, 1750);

    // Phase 3: Tagline exits sequentially from left to right at 2.15s (frame 00:06)
    const exitTaglineTimer = setTimeout(() => {
      setPhase('exit-tagline');
    }, 2150);

    // Phase 4: Heading & background dissolve at 2.65s
    const exitAllTimer = setTimeout(() => {
      setPhase('exit-all');
    }, 2650);

    // Phase 5: Complete & unmount at 3.0s
    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, 3050);

    return () => {
      clearTimeout(settledTimer);
      clearTimeout(exitTaglineTimer);
      clearTimeout(exitAllTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="sylven-preloader"
          aria-label="Loading Sylven Studio"
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === 'exit-all' ? 0 : 1,
            transition: {
              duration: 0.45,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F9F9F8] overflow-hidden select-none"
        >
          {/* 
            ====================================================================
            AMBIENT GRADIENT GLOWS: #6be3e8 (Cyan) & #fec369 (Warm Amber Gold)
            ====================================================================
          */}
          {/* Aura 1: Radiant Cyan Tone (#6be3e8) */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: phase === 'exit-all' ? 0 : 0.75,
              scale: phase === 'settled' ? 1.05 : 1,
            }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
            }}
            className="pointer-events-none absolute -top-24 -left-20 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] rounded-full blur-[110px] sm:blur-[140px]"
            style={{
              background:
                'radial-gradient(circle, rgba(107, 227, 232, 0.75) 0%, rgba(107, 227, 232, 0.4) 40%, rgba(107, 227, 232, 0.15) 70%, transparent 85%)',
            }}
          />

          {/* Aura 2: Soft Sunlit Blend (#6be3e8 + #fec369) */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: phase === 'exit-all' ? 0 : 0.45,
              scale: phase === 'settled' ? 1.04 : 1,
            }}
            transition={{
              duration: 1.4,
              ease: 'easeOut',
            }}
            className="pointer-events-none absolute -top-28 right-0 w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] rounded-full blur-[100px] sm:blur-[130px]"
            style={{
              background:
                'radial-gradient(circle, rgba(254, 195, 105, 0.7) 0%, rgba(107, 227, 232, 0.3) 45%, transparent 75%)',
            }}
          />

          {/* Aura 3: Warm Golden Amber Tone (#fec369) */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: phase === 'exit-all' ? 0 : 0.7,
              scale: phase === 'settled' ? 1.06 : 1,
            }}
            transition={{
              duration: 1.3,
              ease: 'easeOut',
            }}
            className="pointer-events-none absolute -bottom-24 -right-16 w-[540px] h-[540px] sm:w-[720px] sm:h-[720px] rounded-full blur-[120px] sm:blur-[150px]"
            style={{
              background:
                'radial-gradient(circle, rgba(254, 195, 105, 0.75) 0%, rgba(254, 195, 105, 0.4) 40%, rgba(254, 195, 105, 0.15) 65%, transparent 85%)',
            }}
          />

          {/* Subtle Organic Film Grain Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-multiply"
            style={{
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* 
            ====================================================================
            BRAND IDENTITY: CHARACTER-BY-CHARACTER LOAD-IN
            (No slide-up: letters reveal in place, one after the other)
            ====================================================================
          */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
            {/* Heading: S - Y - L - V - E - N - ® */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-[-0.035em] text-[#0D0D0D] font-sans flex items-baseline justify-center leading-none"
            >
              {headingLetters.map((char, index) => {
                const isExit = phase === 'exit-all';
                return (
                  <motion.span
                    key={`head-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isExit ? 0 : 1,
                    }}
                    transition={{
                      duration: isExit ? 0.3 : 0.12,
                      delay: isExit ? 0 : 0.22 + index * 0.085, // One after the other!
                      ease: 'easeOut',
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                );
              })}

              {/* Trademark Symbol ® appearing immediately after the last letter */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: phase === 'exit-all' ? 0 : 1,
                }}
                transition={{
                  duration: phase === 'exit-all' ? 0.3 : 0.12,
                  delay: phase === 'exit-all' ? 0 : 0.22 + headingLetters.length * 0.085,
                  ease: 'easeOut',
                }}
                className="text-[0.42em] font-bold align-top ml-1 sm:ml-1.5 relative top-[-0.32em] text-[#0D0D0D] inline-block"
                aria-label="Registered Trademark"
              >
                ®
              </motion.span>
            </h1>

            {/* Subtitle: "We Craft Digital Experiences" */}
            <div className="mt-3 sm:mt-4 h-6 sm:h-7 flex items-center justify-center">
              <p
                className="text-sm sm:text-base md:text-[15.5px] text-[#202020] font-normal tracking-[-0.01em] font-sans antialiased flex flex-wrap justify-center items-center"
              >
                {taglineLetters.map((char, index) => {
                  const isSpace = char === ' ';
                  const isExiting = phase === 'exit-tagline' || phase === 'exit-all';

                  return (
                    <motion.span
                      key={`tagline-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isExiting ? 0 : 1,
                      }}
                      transition={{
                        duration: isExiting ? 0.14 : 0.1,
                        // Entrance: starts after heading, letter by letter (t=0.92s + index*24ms)
                        // Exit: disappears sequentially from left-to-right (frame 00:06 leaves "...ces" at the end!)
                        delay: isExiting
                          ? index * 0.016
                          : 0.92 + index * 0.024,
                        ease: 'easeOut',
                      }}
                      className="inline-block"
                    >
                      {isSpace ? '\u00A0' : char}
                    </motion.span>
                  );
                })}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
