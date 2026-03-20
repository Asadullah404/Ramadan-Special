import React, { useState, useCallback } from 'react';

interface DuaStar {
  id: number;
  text: string;
  x: number;
  y: number;
}

const DuaSky: React.FC = () => {
  const [duas, setDuas] = useState<DuaStar[]>([]);
  const [input, setInput] = useState('');

  const addDua = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setDuas((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 60,
      },
    ]);
    setInput('');
  }, [input]);

  return (
    <div className="bg-glass rounded-2xl p-6 md:p-8 glow-gold animate-fade-in-up">
      <h3 className="text-gold font-arabic text-xl mb-1 text-center">🌠 Dua Sky</h3>
      <p className="text-muted-foreground text-sm text-center mb-4">Write your dua and send it to the sky</p>

      {/* Sky area */}
      <div className="relative w-full h-48 md:h-64 rounded-xl bg-secondary/30 overflow-hidden mb-4">
        {duas.map((dua) => (
          <div
            key={dua.id}
            className="absolute animate-float-up text-center"
            style={{ left: `${dua.x}%`, top: `${dua.y}%` }}
          >
            <div className="text-gold text-lg mb-0.5">✦</div>
            <span className="text-[10px] text-foreground/60 whitespace-nowrap max-w-[100px] overflow-hidden text-ellipsis block">
              {dua.text}
            </span>
          </div>
        ))}
        {duas.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 text-sm">
            Your duas will appear as stars ✦
          </p>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addDua()}
          placeholder="Type your dua..."
          className="flex-1 bg-secondary/50 rounded-lg px-4 py-2.5 text-sm text-foreground outline-none border border-transparent focus:border-gold/30 transition-colors placeholder:text-muted-foreground/40"
        />
        <button
          onClick={addDua}
          disabled={!input.trim()}
          className="px-5 py-2.5 rounded-lg bg-secondary text-gold text-sm font-medium transition-all hover:glow-gold active:scale-95 disabled:opacity-30"
        >
          Send ✦
        </button>
      </div>
    </div>
  );
};

export default DuaSky;
