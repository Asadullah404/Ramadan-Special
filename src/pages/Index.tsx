import React, { useState, useCallback, useRef, useEffect } from 'react';
import StarField from '@/components/StarField';
import FloatingLanterns from '@/components/FloatingLanterns';
import CrescentMoon from '@/components/CrescentMoon';
import IntroScreen from '@/components/IntroScreen';
import VoiceGreeting from '@/components/VoiceGreeting';
import PrayerTimesCard from '@/components/PrayerTimesCard';
import DigitalTasbeeh from '@/components/DigitalTasbeeh';
import DuaSky from '@/components/DuaSky';
import RamzanProgress from '@/components/RamzanProgress';
import GlobalFasting from '@/components/GlobalFasting';
import HistoricalContent from '@/components/HistoricalContent';
import ShareCard from '@/components/ShareCard';

type RevealVariant = 'fade-up' | 'fade-left' | 'fade-right' | 'zoom' | 'flip' | 'slide-up' | 'rotate-in' | 'blur-in';

const useScrollReveal = (variant: RevealVariant = 'fade-up', threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    };

    if (!visible) {
      switch (variant) {
        case 'fade-up':
          return { ...base, opacity: 0, transform: 'translateY(60px)', filter: 'blur(6px)' };
        case 'fade-left':
          return { ...base, opacity: 0, transform: 'translateX(-80px) rotate(-2deg)', filter: 'blur(4px)' };
        case 'fade-right':
          return { ...base, opacity: 0, transform: 'translateX(80px) rotate(2deg)', filter: 'blur(4px)' };
        case 'zoom':
          return { ...base, opacity: 0, transform: 'scale(0.7)', filter: 'blur(8px)' };
        case 'flip':
          return { ...base, opacity: 0, transform: 'perspective(800px) rotateX(25deg) translateY(40px)', filter: 'blur(4px)' };
        case 'slide-up':
          return { ...base, opacity: 0, transform: 'translateY(100px) scale(0.95)', filter: 'blur(3px)' };
        case 'rotate-in':
          return { ...base, opacity: 0, transform: 'rotate(-8deg) scale(0.85) translateY(50px)', filter: 'blur(6px)' };
        case 'blur-in':
          return { ...base, opacity: 0, transform: 'translateY(30px) scale(1.05)', filter: 'blur(15px)' };
      }
    }

    return { ...base, opacity: 1, transform: 'none', filter: 'blur(0)' };
  };

  return { ref, visible, style: getStyles() };
};

interface SectionProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, variant = 'fade-up', delay = '0s', className = '' }) => {
  const { ref, style } = useScrollReveal(variant);
  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

// Staggered children wrapper
const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
}> = ({ children, className = '', variant = 'fade-up' }) => {
  const { ref, visible } = useScrollReveal(variant);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <div
          style={{
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: visible ? `${i * 0.12}s` : '0s',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(50px) scale(0.95)',
            filter: visible ? 'blur(0)' : 'blur(6px)',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Parallax wrapper
const Parallax: React.FC<{ children: React.ReactNode; speed?: number; className?: string }> = ({ children, speed = 0.3, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      setOffset((center - viewCenter) * speed);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${offset}px)`, willChange: 'transform' }}>
      {children}
    </div>
  );
};

const Index: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [showMain, setShowMain] = useState(false);

  const handleIntroComplete = useCallback((name: string) => {
    setUserName(name);
    setTimeout(() => setShowMain(true), 300);
  }, []);

  if (!showMain) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-night geometric-pattern relative">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <StarField count={60} />
        <FloatingLanterns count={3} />
      </div>

      <VoiceGreeting name={userName!} />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* Hero — dramatic zoom + blur entrance */}
        <Section variant="zoom">
          <Parallax speed={-0.15}>
            <div className="text-center mb-16 md:mb-24 pt-8">
              <CrescentMoon className="mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-arabic text-gold text-glow-strong mb-4" style={{ lineHeight: '1.1' }}>
                Ramzan Mubarak
              </h1>
              <p className="text-2xl md:text-3xl font-arabic text-foreground/80 mb-2">{userName}</p>
              <p className="text-foreground/50 text-sm md:text-base max-w-md mx-auto mt-4">
                May this blessed month illuminate your path with faith, hope, and endless blessings
              </p>
            </div>
          </Parallax>
        </Section>

        {/* Prayer Times + Progress — slide from sides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Section variant="fade-left" delay="0s">
            <PrayerTimesCard />
          </Section>
          <Section variant="fade-right" delay="0.15s">
            <RamzanProgress />
          </Section>
        </div>

        {/* Tasbeeh + Dua — flip entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Section variant="flip" delay="0s">
            <DigitalTasbeeh />
          </Section>
          <Section variant="flip" delay="0.15s">
            <DuaSky />
          </Section>
        </div>

        {/* Global Fasting — rotate in */}
        <Section className="mb-8" variant="rotate-in">
          <GlobalFasting />
        </Section>

        {/* Historical Content — slide up heavy */}
        <Section className="mb-8" variant="slide-up">
          <HistoricalContent />
        </Section>

        {/* Share — blur in */}
        <Section className="mb-16" variant="blur-in">
          <ShareCard name={userName!} />
        </Section>

        {/* Footer */}
        <Section variant="fade-up">
          <div className="text-center py-8 border-t border-border/30">
            <p className="text-muted-foreground/50 text-sm font-arabic">
              🌙 May Allah accept your fasts and prayers 🌙
            </p>
            <p className="text-muted-foreground/30 text-xs mt-2">Ramzan Mubarak {new Date().getFullYear()}</p>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Index;
