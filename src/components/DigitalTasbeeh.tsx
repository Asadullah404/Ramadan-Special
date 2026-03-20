import React, { useState, useCallback } from 'react';

const DigitalTasbeeh: React.FC = () => {
  const [count, setCount] = useState(0);
  const [pressing, setPressing] = useState(false);

  const increment = useCallback(() => {
    setCount((c) => c + 1);
    setPressing(true);
    setTimeout(() => setPressing(false), 200);
  }, []);

  const reset = useCallback(() => setCount(0), []);

  return (
    <div className="bg-glass rounded-2xl p-6 md:p-8 glow-gold text-center animate-fade-in-up">
      <h3 className="text-gold font-arabic text-xl mb-1">📿 Digital Tasbeeh</h3>
      <p className="text-muted-foreground text-sm mb-6">Tap to count your dhikr</p>

      {/* Count display */}
      <div className="text-6xl md:text-7xl font-arabic text-gold text-glow-strong mb-8 tabular-nums select-none">
        {count}
      </div>

      {/* Bead button */}
      <button
        onClick={increment}
        className={`w-24 h-24 md:w-28 md:h-28 rounded-full bg-secondary border-2 border-gold/30 mx-auto flex items-center justify-center transition-all duration-150 active:scale-90 ${pressing ? 'animate-bead-press glow-gold-strong border-gold/60' : 'hover:border-gold/50 hover:glow-gold'}`}
        aria-label="Count"
      >
        <span className="text-3xl">☪</span>
      </button>

      <p className="text-muted-foreground text-xs mt-6">
        {count >= 99 ? '✨ SubhanAllah — you reached 99!' : count >= 33 ? 'Keep going, you\'re doing great!' : 'Tap the bead to begin'}
      </p>

      {count > 0 && (
        <button onClick={reset} className="mt-3 text-xs text-muted-foreground/60 hover:text-gold transition-colors">
          Reset counter
        </button>
      )}
    </div>
  );
};

export default DigitalTasbeeh;
