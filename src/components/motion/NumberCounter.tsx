// src/components/motion/NumberCounter.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface NumberCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  padZero?: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({
  value,
  duration = 1,
  delay = 0,
  padZero = false,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let rafId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const delayMs = delay * 1000;
      const durationMs = duration * 1000;

      if (elapsed < delayMs) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((elapsed - delayMs) / durationMs, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(eased * value);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, duration, delay]);

  const formatted = displayValue.toFixed(decimals);
  const finalString = padZero
    ? formatted.padStart(2, '0')
    : formatted;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {finalString}
      {suffix}
    </span>
  );
};