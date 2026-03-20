import React from 'react';

const fastingData = [
  { city: 'Nuuk, Greenland', hours: '21h', flag: '🇬🇱', type: 'longest' },
  { city: 'Reykjavik, Iceland', hours: '19h 30m', flag: '🇮🇸', type: 'longest' },
  { city: 'Helsinki, Finland', hours: '18h 45m', flag: '🇫🇮', type: 'longest' },
  { city: 'Buenos Aires, Argentina', hours: '12h 15m', flag: '🇦🇷', type: 'shortest' },
  { city: 'Cape Town, South Africa', hours: '11h 40m', flag: '🇿🇦', type: 'shortest' },
  { city: 'Christchurch, NZ', hours: '11h 20m', flag: '🇳🇿', type: 'shortest' },
];

const GlobalFasting: React.FC = () => {
  return (
    <div className="bg-glass rounded-2xl p-6 md:p-8 glow-gold animate-fade-in-up">
      <h3 className="text-gold font-arabic text-xl mb-1 text-center">🌍 Fasting Around the World</h3>
      <p className="text-muted-foreground text-sm text-center mb-6">Longest & shortest fasting hours</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Longest */}
        <div>
          <p className="text-xs text-gold/70 uppercase tracking-wider mb-3 text-center">☀️ Longest Fast</p>
          <div className="space-y-2">
            {fastingData.filter(d => d.type === 'longest').map((d) => (
              <div key={d.city} className="flex items-center justify-between bg-secondary/40 rounded-lg px-4 py-3">
                <span className="text-sm text-foreground/80">{d.flag} {d.city}</span>
                <span className="text-sm font-medium text-gold tabular-nums">{d.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shortest */}
        <div>
          <p className="text-xs text-gold/70 uppercase tracking-wider mb-3 text-center">🌙 Shortest Fast</p>
          <div className="space-y-2">
            {fastingData.filter(d => d.type === 'shortest').map((d) => (
              <div key={d.city} className="flex items-center justify-between bg-secondary/40 rounded-lg px-4 py-3">
                <span className="text-sm text-foreground/80">{d.flag} {d.city}</span>
                <span className="text-sm font-medium text-gold tabular-nums">{d.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFasting;
