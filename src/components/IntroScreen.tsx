import React, { useState, useEffect, useCallback } from 'react';
import StarField from './StarField';
import CrescentMoon from './CrescentMoon';
import FloatingLanterns from './FloatingLanterns';

interface IntroScreenProps {
  onComplete: (name: string) => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'sky' | 'greeting' | 'name'>('sky');
  const [name, setName] = useState('');
  const savedName = localStorage.getItem('ramzan_user_name');

  useEffect(() => {
    if (savedName) {
      const t = setTimeout(() => onComplete(savedName), 2500);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setPhase('greeting'), 2200);
    const t2 = setTimeout(() => setPhase('name'), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [savedName, onComplete]);

  const handleSubmit = useCallback(() => {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem('ramzan_user_name', trimmed);
    onComplete(trimmed);
  }, [name, onComplete]);

  if (savedName) {
    return (
      <div className="fixed inset-0 bg-night flex items-center justify-center z-50">
        <StarField count={80} />
        <CrescentMoon className="absolute top-10 right-[15%] md:right-[20%]" />
        <div className="text-center animate-fade-in-up z-10">
          <p className="text-muted-foreground text-lg mb-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>Welcome back</p>
          <h1 className="text-4xl md:text-6xl font-arabic text-gold text-glow-strong">{savedName}</h1>
          <p className="text-gold/60 mt-4 animate-pulse-soft">🌙</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-night flex flex-col items-center justify-center z-50 overflow-hidden">
      <StarField count={100} />
      <FloatingLanterns count={5} />

      {/* Moon */}
      <CrescentMoon className="absolute top-8 right-[12%] md:top-12 md:right-[18%] animate-fade-in" />

      {/* Main content column — vertically centered */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 gap-10">
        {/* Greeting text */}
        {(phase === 'greeting' || phase === 'name') && (
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-arabic text-gold text-glow-strong mb-4" style={{ lineHeight: '1.1' }}>
              🌙 Ramzan Mubarak
            </h1>
            <p className="text-foreground/70 text-lg md:text-xl max-w-md mx-auto" style={{ animationDelay: '0.3s' }}>
              May this blessed month bring you peace, joy, and divine blessings
            </p>
          </div>
        )}

        {/* Name input */}
        {phase === 'name' && (
          <div className="w-full max-w-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-gold/80 text-center text-sm mb-4 font-light tracking-wide uppercase">What is your name?</p>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter your name"
                autoFocus
                className="w-full bg-transparent border-b-2 border-gold/30 focus:border-gold text-center text-2xl font-arabic text-foreground py-3 outline-none transition-colors duration-300 placeholder:text-muted-foreground/40"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="mt-6 w-full py-3 rounded-lg bg-glass text-gold font-medium tracking-wide transition-all duration-300 hover:glow-gold-strong active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Begin Your Journey ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroScreen;
