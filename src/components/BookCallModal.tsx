import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NumberCounter } from './motion/NumberCounter';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [selectedType, setSelectedType] = useState(
    preselectedService || '30-Min Strategy Consultation'
  );
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 10:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('$15k - $30k');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const consultationTypes = [
    {
      title: '30-Min Strategy Consultation',
      desc: 'High-level roadmap & conversion diagnosis',
      duration: '30 min',
    },
    {
      title: 'Full Technical Architecture Scope',
      desc: 'Stack audit, Framer/React evaluation',
      duration: '45 min',
    },
    {
      title: 'Enterprise Digital Transformation',
      desc: 'Multi-brand headless infrastructure & design tokens',
      duration: '60 min',
    },
  ];

  const timeSlots = [
    'Tomorrow, 09:30 AM (AEST)',
    'Tomorrow, 11:00 AM (AEST)',
    'Tomorrow, 02:30 PM (AEST)',
    'Thursday, 10:00 AM (AEST)',
    'Thursday, 03:00 PM (AEST)',
    'Friday, 01:30 PM (AEST)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5ce1e6', '#38bdf8', '#000000', '#ffffff'],
      });
    } catch {
      // Ignore if confetti context not available
    }
  };

  const handleReset = () => {
    setStep('details');
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        id="booking-modal-overlay"
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="booking-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto border border-black/[0.08]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#111110] text-white p-6 sm:p-8 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-11 px-3 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center shrink-0">
                <img
                  src="https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/Braham%20Logo.png"
                  alt="BRAHAM - A Findar Company"
                  className="h-6 w-auto object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg sm:text-xl font-sans tracking-tight">
                    Start a Project
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    DIRECT INQUIRY
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Braham Creative Agency • Project Consultation
                </p>
              </div>
            </div>

            <button
              id="close-booking-modal-btn"
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 'details' ? (
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto"
            >
              {/* Type Selection */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#73736F] mb-2 font-medium">
                  <NumberCounter value={1} padZero duration={0.8} suffix="." />
                  <span>Select Consultation Focus</span>
                </label>
                <div className="space-y-2">
                  {consultationTypes.map((t) => (
                    <div
                      key={t.title}
                      onClick={() => setSelectedType(t.title)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedType === t.title
                          ? 'border-black bg-[#F9F9F8] shadow-xs'
                          : 'border-black/[0.08] hover:border-black/30'
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-black font-sans">
                          {t.title}
                        </div>
                        <div className="text-[11px] text-[#6E6E6A]">
                          {t.desc}
                        </div>
                      </div>
                      <span className="text-xs font-mono px-2 py-1 rounded bg-[#EFEFEF] text-black">
                        <NumberCounter
                          value={parseInt(t.duration, 10)}
                          suffix=" min"
                          duration={0.8}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slot Selection */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#73736F] mb-2 font-medium">
                  <NumberCounter
                    value={2}
                    padZero
                    duration={0.8}
                    delay={0.1}
                    suffix="."
                  />
                  <span>Preferred Time Slot (AEST)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedDate(slot)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                        selectedDate === slot
                          ? 'border-black bg-black text-white'
                          : 'border-black/[0.08] hover:border-black/30 text-[#40403D]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#73736F] mb-2 font-medium">
                  <NumberCounter
                    value={3}
                    padZero
                    duration={0.8}
                    delay={0.2}
                    suffix="."
                  />
                  <span>Contact Coordinates</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.12] text-sm focus:outline-none focus:border-black font-sans"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Work Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.12] text-sm focus:outline-none focus:border-black font-sans"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Brand / Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.12] text-sm focus:outline-none focus:border-black font-sans"
                    />
                  </div>
                  <div>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.12] text-sm focus:outline-none focus:border-black font-sans bg-white"
                    >
                      <option value="$10k - $25k">
                        Estimated Budget: $10k - $25k
                      </option>
                      <option value="$25k - $50k">
                        Estimated Budget: $25k - $50k
                      </option>
                      <option value="$50k - $100k+">
                        Estimated Budget: $50k - $100k+
                      </option>
                      <option value="Flexible">
                        Estimated Budget: Flexible / Equity
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <textarea
                    rows={2}
                    placeholder="Brief project goals, links, or current bottlenecks (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.12] text-sm focus:outline-none focus:border-black font-sans"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-black/[0.08] flex items-center justify-between">
                <div className="text-xs font-mono text-[#8C8C88]">
                  CONFIDENTIAL • DIRECT PARTNER REVIEW
                </div>
                <button
                  type="submit"
                  id="confirm-booking-btn"
                  className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer"
                >
                  <span>CONFIRM CALENDAR INVITE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-black font-sans">
                  Inquiry Received by Braham
                </h3>
                <p className="text-sm text-[#5C5C58] mt-2 max-w-md mx-auto">
                  Thank you. A project briefing questionnaire and confirmation
                  have been dispatched to{' '}
                  <span className="font-bold text-black">
                    {email || 'your email'}
                  </span>
                  .
                </p>
              </div>

              <div className="p-4 bg-[#F9F9F8] rounded-xl border border-black/[0.06] text-xs font-mono text-left max-w-md mx-auto space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#8C8C88]">FOCUS:</span>
                  <span className="font-bold text-black">{selectedType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8C88]">TIME:</span>
                  <span className="font-bold text-black">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8C88]">LOCATION:</span>
                  <span className="font-bold text-black">
                    Google Meet (Link in Invite)
                  </span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="bg-black text-white px-8 py-3 rounded-full text-xs font-mono uppercase font-bold tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                RETURN TO OVERVIEW
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};