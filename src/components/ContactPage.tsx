import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
  Copy,
  Check as CheckIcon,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

interface ContactPageProps {
  onBackToHome: () => void;
  onBookCallClick: (service?: string) => void;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToHome,
  onBookCallClick,
}) => {
  const heroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [focused, setFocused] = useState<keyof FormState | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // H1 char-by-char reveal animation
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-char', {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out',
        delay: 0.2,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5ce1e6', '#38bdf8', '#000000', '#ffffff'],
      });
    } catch {
      /* ignore */
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hey@sylven.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const teamImages = [
    {
      src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&auto=format&fit=crop&q=80',
      tag: 'PRODUCT',
      caption: 'Product Team / 2026',
    },
    {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&auto=format&fit=crop&q=80',
      tag: 'SUPPORT',
      caption: 'Call Center Team / 2026',
    },
  ];

  const heroChars = 'CONTACT US.'.split('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-[#F9F9F8] text-[#0D0D0D] font-sans pt-24 sm:pt-28 pb-16"
    >
      {/* 
        ========================================================================
        HEADER ROW — [01] / /CONTACT / GET IN TOUCH + HAIRLINE RULE
        ========================================================================
      */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-10 sm:pb-14">
        <div className="flex items-center justify-between gap-4 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#8E8E89] pb-4 border-b border-black/[0.10]">
          <span>[01]</span>
          <span className="hidden sm:inline">/ CONTACT</span>
          <span>GET IN TOUCH</span>
        </div>
      </section>

      {/* 
        ========================================================================
        HERO — MONUMENTAL "CONTACT US." + DUAL AMBIENT GLOW
        ========================================================================
      */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-24">
        {/* Ambient Lime/Cyan Glow — top-right (matches reference) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 w-full max-w-[1200px] h-[600px] bg-[radial-gradient(ellipse_70%_60%_at_75%_10%,rgba(180,240,120,0.35)_0%,rgba(92,225,230,0.18)_35%,rgba(249,249,248,0)_75%)] blur-3xl z-0"
        />
        {/* Cyan Glow — bottom-left accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(92,225,230,0.22)_0%,rgba(249,249,248,0)_70%)] blur-3xl z-0"
        />

        {/* Back to home breadcrumb */}
        <div className="relative z-10 flex items-center justify-between gap-4 mb-12 sm:mb-16">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#4A4A48] hover:text-black transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-black" />
            <span>RETURN TO HOME</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-black/[0.08] text-[11px] font-mono tracking-widest text-[#4A4A48] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#5ce1e6]" />
            <span>RESPONSE &lt; 48H</span>
          </div>
        </div>

        {/* Monumental headline + intro split */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E89] block mb-6">
              // START A CONVERSATION
            </span>
            <h1
              ref={heroRef}
              className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-black font-sans tracking-[-0.045em] text-[#0D0D0D] leading-[0.92] uppercase overflow-hidden"
            >
              {heroChars.map((char, i) => {
                if (char === ' ') {
                  return <br key={`br-${i}`} />;
                }
                return (
                  <span
                    key={`hero-${i}`}
                    className="contact-hero-char inline-block"
                    style={{ willChange: 'transform' }}
                  >
                    {char}
                  </span>
                );
              })}
            </h1>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-[#555552] font-sans leading-relaxed max-w-md">
              Have a project in mind? Reach out and we&apos;ll discuss the best way to move forward.
              Every inquiry is read by a studio partner.
            </p>
          </div>
        </div>

        {/* 
          ======================================================================
          MAIN GRID — Left editorial info · Right elevated form
          ======================================================================
        */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — founder chip + address + contact mini-grid */}
          <div className="lg:col-span-5 space-y-8">
            {/* Founder card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/80 backdrop-blur-xs border border-black/[0.08] rounded-2xl p-6 shadow-xs"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8E89] block mb-4">
                YOUR FIRST POINT OF CONTACT
              </span>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-200 border border-black/[0.06] shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
                    alt="Sarah Jenkins"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-base font-semibold font-sans text-[#0D0D0D] tracking-tight">
                    Sarah Jenkins
                  </div>
                  <div className="text-[11px] font-mono text-[#737370] tracking-wide mt-0.5">
                    Founder &amp; CEO @ SYLVEN
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-black/[0.06] flex items-center gap-2 text-xs font-mono text-[#4A4A48]">
                <Clock className="w-3.5 h-3.5 text-[#5ce1e6]" />
                <span>Typically replies within 48 hours</span>
              </div>
            </motion.div>

            {/* Address + Contact mini-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-[#5ce1e6]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8E89]">
                    ADDRESS
                  </span>
                </div>
                <p className="text-sm text-[#4A4A48] font-sans leading-relaxed">
                  49th St, Australia Melbourne, 90011
                </p>
              </div>

              <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-[#5ce1e6]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8E89]">
                    CONTACT
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="group inline-flex items-center gap-2 text-sm text-[#0D0D0D] font-sans hover:text-black transition-colors cursor-pointer"
                >
                  <span className="underline underline-offset-4 decoration-black/30 group-hover:decoration-black transition-colors">
                    hey@sylven.com
                  </span>
                  {emailCopied ? (
                    <CheckIcon className="w-3.5 h-3.5 text-[#10B981]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#8E8E89] group-hover:text-[#0D0D0D] transition-colors" />
                  )}
                </button>
                {emailCopied && (
                  <div className="text-[10px] font-mono text-[#10B981] mt-2">
                    COPIED TO CLIPBOARD
                  </div>
                )}
              </div>
            </div>

            {/* Alternate route CTA */}
            <div className="pt-2">
              <button
                onClick={() => onBookCallClick('Direct Booking from Contact Page')}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-black/5 text-[#0D0D0D] border border-black/15 px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Skip the form — Book a Call</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT — elevated form card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-black/[0.08] rounded-3xl p-7 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center justify-between mb-8 sm:mb-10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8E89] block mb-1">
                    PROJECT INQUIRY FORM
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-[#0D0D0D]">
                    Tell us about your project.
                  </h2>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E5F7E0] border border-[#BDE8B3] text-[#1E6B17] text-[10px] font-mono tracking-wider uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  ONLINE
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-7"
                  >
                    <FloatingField
                      id="contact-name"
                      name="name"
                      label="01 / NAME"
                      placeholder="Your full name"
                      value={formData.name}
                      focused={focused === 'name'}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      onChange={handleChange}
                      required
                    />

                    <FloatingField
                      id="contact-email"
                      name="email"
                      type="email"
                      label="02 / EMAIL"
                      placeholder="you@company.com"
                      value={formData.email}
                      focused={focused === 'email'}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      onChange={handleChange}
                      required
                    />

                    <FloatingField
                      id="contact-message"
                      name="message"
                      label="03 / MESSAGE"
                      placeholder="Brief project goals, timeline, and scope..."
                      value={formData.message}
                      focused={focused === 'message'}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      onChange={handleChange}
                      textarea
                      required
                    />

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2 bg-[#0D0D0D] hover:bg-black text-white px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium tracking-tight transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
                      >
                        <span>Send a Message</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>

                      <span className="text-[11px] font-mono text-[#8E8E89]">
                        OR EMAIL DIRECTLY —{' '}
                        <a
                          href="mailto:hey@sylven.com"
                          className="text-[#0D0D0D] underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors"
                        >
                          HEY@SYLVEN.COM
                        </a>
                      </span>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-6"
                  >
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] font-sans tracking-tight mb-2">
                        Message Received.
                      </h3>
                      <p className="text-sm sm:text-base text-[#555552] font-sans leading-relaxed max-w-md">
                        Thank you, {formData.name || 'friend'}. A partner will respond to{' '}
                        <span className="font-semibold text-[#0D0D0D]">
                          {formData.email || 'your email'}
                        </span>{' '}
                        within two business days.
                      </p>
                    </div>

                    <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
                      <div className="py-3 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#8E8E89] tracking-widest">REFERENCE</span>
                        <span className="text-[#0D0D0D] font-bold">
                          INQ-{Date.now().toString().slice(-6)}
                        </span>
                      </div>
                      <div className="py-3 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#8E8E89] tracking-widest">STATUS</span>
                        <span className="text-[#1E6B17] font-bold">QUEUED FOR REVIEW</span>
                      </div>
                      <div className="py-3 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#8E8E89] tracking-widest">RESPONSE ETA</span>
                        <span className="text-[#0D0D0D] font-bold">&lt; 48 HOURS</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', message: '' });
                        }}
                        className="inline-flex items-center gap-2 bg-[#0D0D0D] hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Send Another
                      </button>
                      <button
                        onClick={() => onBookCallClick('Direct Booking from Contact Page')}
                        className="inline-flex items-center gap-2 bg-transparent hover:bg-black/5 text-[#0D0D0D] border border-black/15 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Book a Call Instead
                      </button>
                      <button
                        onClick={onBackToHome}
                        className="inline-flex items-center gap-2 bg-transparent hover:bg-black/5 text-[#0D0D0D] border border-black/15 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Return Home
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        TEAM IMAGES — two side-by-side with mono overlay tags + hover zoom
        ========================================================================
      */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 sm:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {teamImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-neutral-200 aspect-4/3">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Mono tag overlay top-left */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-widest">
                    [TEAM] // {img.tag}
                  </span>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Caption row */}
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-sans text-[#0D0D0D] tracking-tight">
                  {img.caption}
                </span>
                <span className="text-[10px] font-mono text-[#8E8E89] tracking-widest">
                  ({String(idx + 1).padStart(2, '0')})
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 
        ========================================================================
        CTA BANNER — same treatment as About / Projects / Services
        ========================================================================
      */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="relative rounded-3xl bg-[#0D0D0D] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_top_right,rgba(92,225,230,0.35)_0%,rgba(130,235,240,0.12)_40%,transparent_70%)] blur-2xl z-0"
          />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5ce1e6] block mb-3">
              [ALTERNATE ROUTE] // DIRECT CALL
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans uppercase tracking-tight text-white leading-none mb-6">
              PREFER TO TALK IT THROUGH?
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              Skip the form and book a 30-minute strategy session with a partner. We&apos;ll diagnose
              your project and outline next steps on the call.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onBookCallClick('Contact Page Direct Booking')}
                className="inline-flex items-center gap-2 bg-[#5ce1e6] hover:bg-[#48d2d7] text-black font-semibold px-6 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:shadow-cyan-500/25 active:scale-95"
              >
                <span>Book a Call</span>
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
  );
};

/* 
  ==========================================================================
  FLOATING FIELD — modern editorial input with animated label + underline
  ==========================================================================
*/
interface FloatingFieldProps {
  id: string;
  name: keyof FormState;
  label: string;
  placeholder: string;
  value: string;
  focused: boolean;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FloatingField: React.FC<FloatingFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  value,
  focused,
  type = 'text',
  textarea = false,
  required = false,
  onFocus,
  onBlur,
  onChange,
}) => {
  const active = focused || value.length > 0;
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  return (
    <div className="relative">
      {/* Label + number */}
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] mb-3"
      >
        <span className={active ? 'text-[#0D0D0D]' : 'text-[#8E8E89]'}>{label}</span>
        {required && <span className="text-[#5ce1e6]">*</span>}
      </label>

      {textarea ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          id={id}
          name={name}
          rows={4}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full bg-transparent border-0 outline-none focus:ring-0 resize-none text-base sm:text-lg font-sans text-[#0D0D0D] placeholder:text-[#B5B5B0] pb-3"
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full bg-transparent border-0 outline-none focus:ring-0 text-base sm:text-lg font-sans text-[#0D0D0D] placeholder:text-[#B5B5B0] pb-3"
        />
      )}

      {/* Baseline rule */}
      <div className="relative h-[1px] w-full bg-black/[0.12]">
        {/* Animated fill underline — grows from left on focus */}
        <motion.div
          initial={false}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left center' }}
          className="absolute inset-0 bg-[#0D0D0D]"
        />
      </div>
    </div>
  );
};