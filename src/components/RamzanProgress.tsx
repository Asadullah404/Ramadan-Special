import React from 'react';

const RamzanProgress: React.FC = () => {
  // Calculate current Ramadan day (approximate — real calculation would need hijri calendar)
  const today = new Date();
  // Ramadan 2025 starts approximately March 1, 2025
  const ramadanStart = new Date(2025, 2, 1);
  const diffDays = Math.floor((today.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const currentDay = Math.max(1, Math.min(30, diffDays));
  const progress = (currentDay / 30) * 100;

  return (
    <div className="bg-glass rounded-2xl p-6 md:p-8 glow-gold animate-fade-in-up">
      <h3 className="text-gold font-arabic text-xl mb-1 text-center">🧭 Ramzan Progress</h3>
      <p className="text-muted-foreground text-sm text-center mb-6">Day {currentDay} of 30</p>

      {/* Progress bar */}
      <div className="relative w-full h-3 bg-secondary rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, hsl(43, 80%, 45%), hsl(43, 80%, 60%))',
            boxShadow: '0 0 12px hsla(43, 80%, 55%, 0.5)',
          }}
        />
      </div>

      {/* Day dots */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {Array.from({ length: 30 }, (_, i) => {
          const day = i + 1;
          const isPast = day < currentDay;
          const isCurrent = day === currentDay;
          return (
            <div
              key={day}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium transition-all duration-300 ${
                isCurrent
                  ? 'bg-gold text-primary-foreground glow-gold-strong scale-110'
                  : isPast
                  ? 'bg-gold/20 text-gold/70'
                  : 'bg-secondary text-muted-foreground/50'
              }`}
              title={`Day ${day}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <p className="text-center text-muted-foreground/60 text-xs mt-4">
        {currentDay <= 10 ? 'First Ashra — Mercy' : currentDay <= 20 ? 'Second Ashra — Forgiveness' : 'Third Ashra — Salvation'}
      </p>
    </div>
  );
};

export default RamzanProgress;
