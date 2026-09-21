import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Star, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';
import { NumberCounter } from './motion/NumberCounter';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onBookCall: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onBookCall,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F9F9F8] rounded-2xl shadow-2xl z-10 border border-black/10 flex flex-col"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 bg-[#F9F9F8]/95 backdrop-blur-md px-6 py-4 border-b border-black/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-black text-white px-2.5 py-1 rounded">
                {project.number}
              </span>
              <h2 className="text-lg font-sans font-bold text-black tracking-tight">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-black transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Hero Image */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/5 border border-black/5">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Viewfinder brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/95" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/95" />
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-black/[0.08] text-xs font-mono">
              <div>
                <span className="text-[#73736F] uppercase">CLIENT</span>
                <p className="font-bold text-black mt-0.5">{project.client}</p>
              </div>
              <div>
                <span className="text-[#73736F] uppercase">CATEGORY</span>
                <p className="font-bold text-black mt-0.5">{project.category}</p>
              </div>
              <div>
                <span className="text-[#73736F] uppercase">TIMELINE</span>
                <p className="font-bold text-black mt-0.5">{project.year}</p>
              </div>
              <div>
                <span className="text-[#73736F] uppercase">STATUS</span>
                <p className="font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> LIVE IN PROD
                </p>
              </div>
            </div>

            {/* Overview & Impact */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-sans tracking-tight text-black">
                Design & Architecture Overview
              </h3>
              <p className="text-base text-[#3A3A36] leading-relaxed">
                {project.description}
              </p>
              <div className="p-4 rounded-xl bg-black text-white font-mono text-xs sm:text-sm">
                <span className="text-lime-400 font-bold block mb-1 uppercase tracking-wider">
                  PROJECT HIGHLIGHT:
                </span>
                {project.impact}
              </div>
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((metric, i) => {
                  const match = metric.value.match(/^([^0-9.-]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
                  return (
                    <div
                      key={i}
                      className="p-5 rounded-xl border border-black/10 bg-white shadow-xs"
                    >
                      <div className="text-3xl font-black text-black font-sans">
                        {match ? (
                          <NumberCounter
                            value={parseFloat(match[2])}
                            decimals={match[2].includes('.') ? match[2].split('.')[1].length : 0}
                            prefix={match[1]}
                            suffix={match[3]}
                            duration={1.5}
                            delay={0.15 * i}
                          />
                        ) : (
                          metric.value
                        )}
                      </div>
                      <div className="text-xs font-mono text-[#666662] mt-1 uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Deliverables */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#666662] mb-3">
                KEY DELIVERABLES
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.deliverables?.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full border border-black/10 bg-white text-xs font-mono text-[#222]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Testimonial */}
            {project.testimonial && (
              <div className="p-6 rounded-xl bg-white border border-black/10">
                <div className="flex items-center gap-1 mb-3 text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                  ))}
                </div>
                <p className="text-sm sm:text-base italic text-[#222] leading-relaxed">
                  "{project.testimonial.quote}"
                </p>
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-black/5">
                  <img
                    src={project.testimonial.avatar}
                    alt={project.testimonial.author}
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-bold text-black font-sans">
                      {project.testimonial.author}
                    </p>
                    <p className="text-[11px] font-mono text-[#666662]">
                      {project.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA in Modal */}
            <div className="pt-4 border-t border-black/10 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs font-mono text-[#666662]">
                Looking to elevate your brand's digital presence?
              </span>
              <button
                onClick={() => {
                  onClose();
                  onBookCall(project.title);
                }}
                className="px-6 py-3 rounded-full bg-black text-white text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#222] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
