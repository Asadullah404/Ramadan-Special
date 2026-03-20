import React, { useEffect, useState } from 'react';
import { MapPin, Sunrise, Sunset, Calendar } from 'lucide-react';

interface PrayerData {
  fajr: string;
  maghrib: string;
  date: string;
  hijri: string;
  hijriMonth: string;
  hijriDay: string;
}

const PrayerTimesCard: React.FC = () => {
  const [data, setData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchPrayerTimes = async (lat: number, lon: number) => {
      try {
        // Reverse geocode for city name
        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const geoData = await geoRes.json();
        setCity(geoData.city || geoData.locality || 'Your Location');

        const today = new Date();
        const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lon}&method=2`);
        const json = await res.json();
        const timings = json.data.timings;
        const hijriDate = json.data.date.hijri;

        setData({
          fajr: timings.Fajr,
          maghrib: timings.Maghrib,
          date: json.data.date.readable,
          hijri: `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} AH`,
          hijriMonth: hijriDate.month.en,
          hijriDay: hijriDate.day,
        });
      } catch {
        setData({
          fajr: '05:12',
          maghrib: '18:34',
          date: new Date().toLocaleDateString(),
          hijri: 'Ramadan 1446 AH',
          hijriMonth: 'Ramadan',
          hijriDay: '15',
        });
      }
      setLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchPrayerTimes(pos.coords.latitude, pos.coords.longitude),
        () => fetchPrayerTimes(21.4225, 39.8262) // Default: Makkah
      );
    } else {
      fetchPrayerTimes(21.4225, 39.8262);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-glass rounded-2xl p-8 glow-gold animate-pulse-soft">
        <div className="h-6 bg-muted rounded w-1/2 mx-auto mb-4" />
        <div className="h-10 bg-muted rounded w-3/4 mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-glass rounded-2xl p-6 md:p-8 glow-gold animate-fade-in-up">
      {/* Location */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-1">
        <MapPin className="w-3.5 h-3.5" />
        <span>{city}</span>
      </div>

      {/* Islamic date */}
      <div className="flex items-center justify-center gap-2 text-gold/80 text-sm mb-6">
        <Calendar className="w-3.5 h-3.5" />
        <span className="font-arabic">{data?.hijri}</span>
      </div>

      {/* Sehri / Iftar */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 rounded-xl bg-secondary/50">
          <Sunrise className="w-6 h-6 text-gold mx-auto mb-2" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sehri ends</p>
          <p className="text-2xl md:text-3xl font-arabic text-gold text-glow">{data?.fajr}</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-secondary/50">
          <Sunset className="w-6 h-6 text-lantern mx-auto mb-2" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Iftar</p>
          <p className="text-2xl md:text-3xl font-arabic text-lantern" style={{ textShadow: '0 0 20px hsla(25, 90%, 55%, 0.4)' }}>{data?.maghrib}</p>
        </div>
      </div>

      <p className="text-center text-muted-foreground text-xs mt-4">{data?.date}</p>
    </div>
  );
};

export default PrayerTimesCard;
