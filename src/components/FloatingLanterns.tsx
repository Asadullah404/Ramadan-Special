import React, { useMemo } from 'react';

interface LanternProps {
  count?: number;
}

const Lantern: React.FC<{ x: number; delay: number; size: number }> = ({ x, delay, size }) => (
  <div
    className="absolute animate-lantern-float"
    style={{
      left: `${x}%`,
      bottom: `${20 + Math.random() * 30}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${3 + Math.random() * 3}s`,
    }}
  >
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`lanternGlow-${x}`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="hsl(35, 100%, 60%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(25, 90%, 55%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="24" r="20" fill={`url(#lanternGlow-${x})`} />
      <rect x="14" y="4" width="12" height="2" rx="1" fill="hsl(43, 60%, 45%)" />
      <path d="M14 6 Q10 20 14 36 L26 36 Q30 20 26 6Z" fill="hsl(25, 80%, 50%)" fillOpacity="0.35" stroke="hsl(43, 60%, 45%)" strokeWidth="0.8" />
      <line x1="20" y1="0" x2="20" y2="4" stroke="hsl(43, 60%, 45%)" strokeWidth="0.8" />
      <rect x="18" y="36" width="4" height="4" rx="1" fill="hsl(43, 60%, 45%)" />
      {/* Inner glow */}
      <ellipse cx="20" cy="20" rx="4" ry="6" fill="hsl(40, 100%, 70%)" fillOpacity="0.5" className="animate-pulse-soft" />
    </svg>
  </div>
);

const FloatingLanterns: React.FC<LanternProps> = ({ count = 6 }) => {
  const lanterns = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 8 + (i / count) * 84 + (Math.random() - 0.5) * 10,
      delay: Math.random() * 3,
      size: 28 + Math.random() * 16,
    })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lanterns.map((l) => (
        <Lantern key={l.id} x={l.x} delay={l.delay} size={l.size} />
      ))}
    </div>
  );
};

export default FloatingLanterns;
