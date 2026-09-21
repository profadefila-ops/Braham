import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Magnetic } from './motion/Magnetic';

interface NavbarProps {
  onBookCallClick: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookCallClick,
  onNavigate,
  activeSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about', code: '04' },
    { name: 'Work', id: 'projects', code: '01' },
    { name: 'Services', id: 'services', code: '02' },
    { name: 'Blog', id: 'blog', code: '05' },
    { name: 'Contact', id: 'contact', code: '06' },
  ];

  return (
    <motion.header
      id="main-navigation"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F9F9F8]/85 backdrop-blur-md border-b border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.02)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            aria-label="BRAHAM Home"
            className="flex items-center group cursor-pointer text-left transition-opacity hover:opacity-90 focus:outline-none"
          >
            <img
              src="https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/Braham%20Logo.png"
              alt="BRAHAM - A Findar Company"
              className="h-8 sm:h-9 w-auto max-h-9 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Desktop Navigation */}
          <nav
            id="desktop-nav"
            className="hidden lg:flex items-center gap-6 xl:gap-8"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => onNavigate(link.id)}
                  className={`text-sm tracking-tight transition-colors duration-200 flex items-baseline gap-1 py-1 cursor-pointer font-sans group ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-[#4A4A48] hover:text-black'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-[10px] font-mono text-[#8C8C88] group-hover:text-black transition-colors">
                    {link.code}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right side: status pill + CTA + mobile toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Status Pill */}
            <div
              id="live-status-badge"
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E5F7E0] border border-[#BDE8B3] text-[#1E6B17] text-[11px] font-mono tracking-wider uppercase font-semibold"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span>OPEN FOR WORK</span>
            </div>

            {/* Start a Project CTA — teal #6be3e8 with black text */}
            <Magnetic strength={0.15}>
              <button
                id="book-call-cta-btn"
                onClick={onBookCallClick}
                className="group relative inline-flex items-center gap-2 bg-[#6be3e8] hover:bg-[#48d2d7] text-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-tight shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span className="whitespace-nowrap font-medium">
                  Start a Project
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-black/70 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Magnetic>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-black hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu-drawer"
        className={`lg:hidden bg-[#F9F9F8] border-b border-black/[0.08] px-4 shadow-xl overflow-hidden transition-all duration-200 ease-out origin-top ${
          mobileMenuOpen
            ? 'max-h-[500px] opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-3 pt-4 pb-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`mobile-nav-${link.id}`}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between py-2 text-base font-medium transition-colors ${
                activeSection === link.id
                  ? 'text-black font-semibold'
                  : 'text-[#555552]'
              }`}
            >
              <span>{link.name}</span>
              <span className="text-xs font-mono text-[#8C8C88]">
                {link.code}
              </span>
            </button>
          ))}

          <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center text-left"
              aria-label="BRAHAM Home"
            >
              <img
                src="https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/Braham%20Logo.png"
                alt="BRAHAM - A Findar Company"
                className="h-7 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </button>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-[#10B981]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" /> OPEN FOR
              WORK
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};