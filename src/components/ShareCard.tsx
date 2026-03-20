import React, { useState, useCallback } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

interface ShareCardProps {
  name: string;
}

const ShareCard: React.FC<ShareCardProps> = ({ name }) => {
  const [copied, setCopied] = useState(false);

  const message = `🌙 ${name} is wishing you Ramzan Mubarak! May this blessed month bring you peace, joy, and divine blessings. ✨`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [message]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Ramzan Mubarak', text: message });
      } catch { /* cancelled */ }
    } else {
      handleCopy();
    }
  }, [message, handleCopy]);

  return (
    <div className="bg-glass rounded-2xl p-6 md:p-8 glow-gold animate-fade-in-up text-center">
      <h3 className="text-gold font-arabic text-xl mb-1">🎁 Share the Blessings</h3>
      <p className="text-muted-foreground text-sm mb-6">Spread the joy of Ramzan</p>

      <div className="bg-secondary/40 rounded-xl p-4 mb-6 text-left">
        <p className="text-foreground/80 text-sm leading-relaxed">{message}</p>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-foreground text-sm transition-all hover:glow-gold active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold/20 text-gold text-sm transition-all hover:bg-gold/30 active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
};

export default ShareCard;
