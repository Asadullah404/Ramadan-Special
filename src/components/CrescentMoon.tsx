import React from 'react';

const CrescentMoon: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative animate-moon-glow ${className}`}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(43, 80%, 70%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(43, 80%, 55%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#moonGlow)" />
        <path
          d="M60 8C33.5 8 12 29.5 12 56s21.5 48 48 48c10.5 0 20.3-3.4 28.2-9.1C79.8 99.6 68.5 104 56 104 29.5 104 8 82.5 8 56S29.5 8 56 8c4.5 0 8.9.5 13.1 1.5A48.3 48.3 0 0 0 60 8z"
          fill="hsl(43, 80%, 60%)"
        />
        {/* Star near moon */}
        <circle cx="95" cy="25" r="2.5" fill="hsl(43, 80%, 75%)" className="animate-pulse-soft" />
      </svg>
    </div>
  );
};

export default CrescentMoon;
