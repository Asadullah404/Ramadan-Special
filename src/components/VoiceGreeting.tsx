import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VoiceGreetingProps {
  name: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ name }) => {
  const [muted, setMuted] = useState(() => localStorage.getItem('ramzan_muted') === 'true');
  const spokenRef = useRef(false);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.volume = 0.9;

    // Try to find an Urdu or Hindi female voice
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Prefer Urdu female
      const urduFemale = voices.find(v => /ur/i.test(v.lang) && /female/i.test(v.name));
      if (urduFemale) return urduFemale;
      // Any Urdu voice
      const urdu = voices.find(v => /ur/i.test(v.lang));
      if (urdu) return urdu;
      // Hindi female (close to Urdu)
      const hindiFemale = voices.find(v => /hi/i.test(v.lang) && /female/i.test(v.name));
      if (hindiFemale) return hindiFemale;
      // Any Hindi voice
      const hindi = voices.find(v => /hi[-_]?IN/i.test(v.lang));
      if (hindi) return hindi;
      // Fallback: any female voice
      const anyFemale = voices.find(v => /female/i.test(v.name));
      if (anyFemale) return anyFemale;
      return null;
    };

    const voice = pickVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'ur-PK';
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  // Ensure voices are loaded
  useEffect(() => {
    window.speechSynthesis?.getVoices();
    const handler = () => window.speechSynthesis?.getVoices();
    window.speechSynthesis?.addEventListener?.('voiceschanged', handler);
    return () => window.speechSynthesis?.removeEventListener?.('voiceschanged', handler);
  }, []);

  useEffect(() => {
    if (!muted && !spokenRef.current) {
      spokenRef.current = true;
      const t = setTimeout(() => {
        speak(`رمضان مبارک، ${name}۔ اللہ تعالیٰ آپ کے روزے اور نمازیں قبول فرمائے۔ آمین`);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [muted, name, speak]);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    localStorage.setItem('ramzan_muted', String(next));
    if (next) {
      window.speechSynthesis?.cancel();
    } else {
      speak(`رمضان مبارک، ${name}۔`);
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-glass glow-gold transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? <VolumeX className="w-5 h-5 text-gold" /> : <Volume2 className="w-5 h-5 text-gold" />}
    </button>
  );
};

export default VoiceGreeting;
