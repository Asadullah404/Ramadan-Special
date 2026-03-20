import React from 'react';

const timelineEvents = [
  { year: '610 CE', title: 'First Revelation', desc: 'Angel Jibreel revealed the first verses of the Quran to Prophet Muhammad ﷺ in the Cave of Hira during Ramadan.' },
  { year: '624 CE', title: 'Fasting Made Obligatory', desc: 'In the second year of Hijra, fasting during Ramadan was prescribed as one of the five pillars of Islam.' },
  { year: '624 CE', title: 'Battle of Badr', desc: 'The first major battle in Islamic history took place during Ramadan, a turning point for the Muslim community.' },
  { year: '630 CE', title: 'Conquest of Makkah', desc: 'Prophet Muhammad ﷺ and 10,000 companions peacefully conquered Makkah during Ramadan.' },
  { year: 'Present', title: '1,400+ Ramadans', desc: 'Over 1.8 billion Muslims worldwide continue the tradition of fasting, prayer, and spiritual reflection each Ramadan.' },
];

const sections = [
  {
    title: 'What is Ramzan?',
    icon: '🌙',
    content: 'Ramadan (Ramzan) is the ninth month of the Islamic lunar calendar. It is observed by Muslims worldwide as a month of fasting (sawm), prayer, reflection, and community. It commemorates the month in which the Quran was first revealed to Prophet Muhammad ﷺ.',
  },
  {
    title: 'Why Do Muslims Fast?',
    icon: '🕌',
    content: 'Fasting during Ramadan is one of the Five Pillars of Islam. Muslims abstain from food, drink, and other physical needs from dawn to sunset. It is a time of spiritual discipline — a means to develop self-control, gratitude, and compassion for those less fortunate.',
  },
  {
    title: 'Importance of Fasting',
    icon: '✨',
    content: 'Fasting purifies the soul, teaches patience, and brings believers closer to Allah. It is also a time for increased charity, Quran recitation, and community gatherings for iftar (breaking fast) and tarawih (night prayers).',
  },
  {
    title: 'Laylat al-Qadr',
    icon: '⭐',
    content: 'The "Night of Power" falls within the last ten nights of Ramadan, most likely on an odd night. It is described in the Quran as "better than a thousand months." Muslims spend these nights in intense prayer and devotion.',
  },
  {
    title: 'Zakat & Charity',
    icon: '🤲',
    content: 'Ramadan is a time of heightened generosity. Many Muslims pay their annual Zakat (obligatory charity of 2.5% of wealth) during this month. Sadaqah (voluntary charity) is also highly encouraged.',
  },
  {
    title: 'Eid al-Fitr',
    icon: '🎉',
    content: 'The end of Ramadan is celebrated with Eid al-Fitr, a joyous festival marked by communal prayers, feasting, gift-giving, and gratitude. It is a time of celebration after a month of spiritual growth.',
  },
];

const HistoricalContent: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Knowledge Cards */}
      <div>
        <h2 className="text-2xl md:text-3xl font-arabic text-gold text-glow text-center mb-6">📚 Understanding Ramzan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((s) => (
            <div key={s.title} className="bg-glass rounded-2xl p-6 transition-all duration-300 hover:glow-gold group">
              <div className="text-2xl mb-3">{s.icon}</div>
              <h4 className="text-gold font-arabic text-lg mb-2">{s.title}</h4>
              <p className="text-foreground/70 text-sm leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-2xl md:text-3xl font-arabic text-gold text-glow text-center mb-8">🕰️ Ramzan Through History</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/20" />

          <div className="space-y-8">
            {timelineEvents.map((event, i) => (
              <div
                key={event.year + event.title}
                className={`relative flex items-start gap-4 md:gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-gold glow-gold -translate-x-1.5 mt-2 z-10" />

                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <span className="text-gold/70 text-sm font-medium">{event.year}</span>
                  <h4 className="text-foreground font-arabic text-lg mt-1">{event.title}</h4>
                  <p className="text-foreground/60 text-sm mt-1 leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalContent;
