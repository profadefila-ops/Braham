import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { ClientsLogoBar } from './components/ClientsLogoBar';
import { ImpactStatement } from './components/ImpactStatement';
import { WorksSection } from './components/WorksSection';
import { ServicesIntro } from './components/ServicesIntro';
import { PricingSection } from './components/PricingSection';
import { MethodologySection } from './components/MethodologySection';
import { ClientExperienceSection } from './components/ClientExperienceSection';
import { JournalSection } from './components/JournalSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ContactPage } from './components/ContactPage';
import { ServicesPage } from './components/ServicesPage';
import { BlogPage } from './components/BlogPage';
import { BlogPostPage } from './components/BlogPostPage';
import { ProjectModal } from './components/ProjectModal';
import { BookCallModal } from './components/BookCallModal';
import { Preloader } from './components/Preloader';
import { ServiceItem, Project } from './types';

type PageRoute =
  | 'home'
  | 'about'
  | 'projects'
  | 'contact'
  | 'services'
  | 'blog'
  | 'blog-post';

const HASH_TO_PAGE: Record<string, PageRoute> = {
  '': 'home',
  'home': 'home',
  'about': 'about',
  'projects': 'projects',
  'work': 'projects',
  'contact': 'contact',
  'services': 'services',
  'blog': 'blog',
  'journal': 'blog',
};

const SECTION_TO_PAGE: Partial<Record<string, PageRoute>> = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  work: 'projects',
  contact: 'contact',
  services: 'services',
  blog: 'blog',
  journal: 'blog',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [activeSection, setActiveSection] = useState('home');
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [selectedServiceForCall, setSelectedServiceForCall] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [blogSlug, setBlogSlug] = useState<string>('');

  // Preloader state — plays once on first mount of App
  const [isPreloading, setIsPreloading] = useState(true);

  // Lock body scroll while preloader is visible
  useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPreloading]);

  // Sync hash routing on load + on hashchange
  useEffect(() => {
    const checkHash = () => {
      const rawHash = window.location.hash.toLowerCase().trim();
      const hash = rawHash.replace(/^#/, '');

      if (hash.startsWith('blog/')) {
        const slug = hash.slice(5);
        setBlogSlug(slug);
        setCurrentPage('blog-post');
        setActiveSection('blog');
        return;
      }

      const nextPage = HASH_TO_PAGE[hash] ?? 'home';
      setCurrentPage(nextPage);
      setActiveSection(nextPage === 'home' ? 'home' : nextPage);
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Scroll spy — only runs on the homepage
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = [
        'home',
        'impact-section',
        'projects-section',
        'services-scroll-container',
        'pricing-section',
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(
          sectionId === 'home' ? 'hero-section' : sectionId
        );
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            if (sectionId === 'projects-section') {
              setActiveSection('projects');
            } else if (sectionId === 'services-scroll-container') {
              setActiveSection('services');
            } else if (sectionId === 'pricing-section') {
              setActiveSection('pricing');
            } else {
              setActiveSection('home');
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const scrollToSection = (sectionId: string) => {
    const targetId =
      sectionId === 'projects'
        ? 'projects-section'
        : sectionId === 'services'
        ? 'services-scroll-container'
        : sectionId === 'pricing'
        ? 'pricing-section'
        : sectionId === 'methodology' || sectionId === 'methodology-section'
        ? 'methodology-section'
        : sectionId === 'experience'
        ? 'impact-section'
        : sectionId === 'journal' || sectionId === 'blog'
        ? 'journal-section'
        : sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 70;
      const targetPos = element.offsetTop - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    const targetPage = SECTION_TO_PAGE[sectionId];
    if (targetPage) {
      setCurrentPage(targetPage);
      setActiveSection(targetPage);
      window.location.hash = targetPage === 'home' ? '' : targetPage;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home') {
      setCurrentPage('home');
      setActiveSection(sectionId);
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      setTimeout(() => scrollToSection(sectionId), 100);
      return;
    }

    setActiveSection(sectionId);
    scrollToSection(sectionId);
  };

  const handleOpenPost = (slug: string) => {
    setBlogSlug(slug);
    setCurrentPage('blog-post');
    setActiveSection('blog');
    window.history.pushState(null, '', `#blog/${slug}`);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    });
  };

  const handleBackToBlog = () => {
    setCurrentPage('blog');
    setActiveSection('blog');
    window.location.hash = 'blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookCallClick = (preselected?: string) => {
    setSelectedServiceForCall(preselected || '');
    setIsBookCallOpen(true);
  };

  const handleServiceSelect = (service: ServiceItem) => {
    handleBookCallClick(service.title);
  };

  const handleClientClick = () => {
    handleNavigate('projects');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#0D0D0D] selection:bg-black selection:text-white font-sans flex flex-col relative">
      {/* Preloader — plays once on first mount */}
      {isPreloading && (
        <Preloader onComplete={() => setIsPreloading(false)} />
      )}

      {/* Top Sticky Header */}
      <Navbar
        onBookCallClick={() => handleBookCallClick()}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {currentPage === 'about' ? (
          <AboutPage
            onBackToHome={() => handleNavigate('home')}
            onExploreProjects={() => handleNavigate('projects')}
            onBookCallClick={(service) => handleBookCallClick(service)}
          />
        ) : currentPage === 'projects' ? (
          <ProjectsPage
            onBackToHome={() => handleNavigate('home')}
            onBookCallClick={(service) => handleBookCallClick(service)}
            onProjectClick={(proj) => setActiveProject(proj)}
          />
        ) : currentPage === 'contact' ? (
          <ContactPage
            onBackToHome={() => handleNavigate('home')}
            onBookCallClick={(service) => handleBookCallClick(service)}
          />
        ) : currentPage === 'services' ? (
          <ServicesPage
            onBackToHome={() => handleNavigate('home')}
            onBookCallClick={(service) => handleBookCallClick(service)}
          />
        ) : currentPage === 'blog' ? (
          <BlogPage
            onBackToHome={() => handleNavigate('home')}
            onBookCallClick={(service) => handleBookCallClick(service)}
            onPostClick={handleOpenPost}
          />
        ) : currentPage === 'blog-post' ? (
          <BlogPostPage
            slug={blogSlug}
            onBackToBlog={handleBackToBlog}
            onBackToHome={() => handleNavigate('home')}
            onBookCallClick={(service) => handleBookCallClick(service)}
            onPostClick={handleOpenPost}
          />
        ) : (
          <>
            <Hero
              onServiceSelect={handleServiceSelect}
              onReviewsClick={() => handleNavigate('projects')}
            />

            <MarqueeTicker />
            <ClientsLogoBar onClientClick={handleClientClick} />
            <ImpactStatement />

            <WorksSection onProjectClick={(proj) => setActiveProject(proj)} />

            <MarqueeTicker />

            <ServicesIntro
              onServiceSelect={(title) => handleBookCallClick(title)}
            />

            <PricingSection
              onSelectPlan={(plan) =>
                handleBookCallClick(`Pricing Plan: ${plan}`)
              }
              onContactClick={() =>
                handleBookCallClick('Custom Retainer Briefing')
              }
            />

            <MethodologySection
              onStageClick={(stage) =>
                handleBookCallClick(`Methodology Stage: ${stage}`)
              }
            />

            <ClientExperienceSection
              onQuoteClick={() =>
                handleBookCallClick('Client Experience Inquiry')
              }
            />

            <JournalSection onPostClick={handleOpenPost} />
            <FAQSection />
          </>
        )}
      </main>

      {/* Footer — always visible */}
      <Footer
        onBookCallClick={() => handleBookCallClick()}
        onNavigate={handleNavigate}
      />

      {/* Case study modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onBookCall={(title) => handleBookCallClick(title)}
      />

      {/* Booking modal */}
      <BookCallModal
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
        preselectedService={selectedServiceForCall}
      />
    </div>
  );
}