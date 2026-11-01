import { ArabicWord, DayRecord, Hadith, Practice, RoutineSetting } from '../types';

// Static sample data for the Week 4 screens. It will be replaced by real,
// user-owned data (global state, local storage and Supabase) in later weeks.

export const mockUser = {
  name: 'Faris',
  email: 'faris@example.com',
};

export const practices: Practice[] = [
  {
    id: 'fajr',
    name: 'Fajr',
    description: 'The dawn prayer, two rakʿah before sunrise.',
    type: 'obligatory',
    category: 'prayer',
    tracking: 'checkbox',
    time: '5:42 AM',
    progress: 1,
    completed: true,
  },
  {
    id: 'dhuhr',
    name: 'Dhuhr',
    description: 'The midday prayer, four rakʿah.',
    type: 'obligatory',
    category: 'prayer',
    tracking: 'checkbox',
    time: '12:15 PM',
    progress: 1,
    completed: true,
  },
  {
    id: 'asr',
    name: 'Asr',
    description: 'The afternoon prayer, four rakʿah.',
    type: 'obligatory',
    category: 'prayer',
    tracking: 'checkbox',
    time: '3:45 PM',
    progress: 1,
    completed: true,
  },
  {
    id: 'maghrib',
    name: 'Maghrib',
    description: 'The sunset prayer, three rakʿah.',
    type: 'obligatory',
    category: 'prayer',
    tracking: 'checkbox',
    time: '6:20 PM',
    progress: 0,
    completed: false,
  },
  {
    id: 'isha',
    name: 'Isha',
    description: 'The night prayer, four rakʿah.',
    type: 'obligatory',
    category: 'prayer',
    tracking: 'checkbox',
    time: '7:45 PM',
    progress: 0,
    completed: false,
  },
  {
    id: 'fajr-sunnah',
    name: 'Sunnah of Fajr',
    description: 'Two rakʿah before the Fajr prayer.',
    type: 'voluntary',
    category: 'prayer',
    tracking: 'checkbox',
    progress: 1,
    completed: true,
  },
  {
    id: 'duha',
    name: 'Duha Prayer',
    description: 'The forenoon prayer, after sunrise and before Dhuhr.',
    type: 'voluntary',
    category: 'prayer',
    tracking: 'checkbox',
    progress: 0,
    completed: false,
  },
  {
    id: 'witr',
    name: 'Witr',
    description: 'The odd-numbered night prayer after Isha.',
    type: 'voluntary',
    category: 'prayer',
    tracking: 'checkbox',
    progress: 0,
    completed: false,
  },
  {
    id: 'morning-adhkar',
    name: 'Morning Adhkar',
    description: 'Remembrance of Allah after Fajr until sunrise.',
    type: 'voluntary',
    category: 'adhkar',
    tracking: 'count',
    target: 15,
    progress: 15,
    completed: true,
  },
  {
    id: 'evening-adhkar',
    name: 'Evening Adhkar',
    description: 'Remembrance of Allah after Asr until Maghrib.',
    type: 'voluntary',
    category: 'adhkar',
    tracking: 'count',
    target: 15,
    progress: 0,
    completed: false,
  },
  {
    id: 'istighfar',
    name: 'Istighfar',
    description: 'Seeking forgiveness: “Astaghfirullah”.',
    type: 'voluntary',
    category: 'dua',
    tracking: 'count',
    target: 100,
    progress: 100,
    completed: true,
  },
  {
    id: 'quran',
    name: 'Qurʾan Reading',
    description: 'Daily reading from the Qurʾan.',
    type: 'voluntary',
    category: 'quran',
    tracking: 'count',
    target: 2,
    unit: 'pages',
    progress: 0,
    completed: false,
  },
];

// Sahih Muslim 2699, narrated by Abu Hurayrah.
export const hadithOfTheDay: Hadith = {
  arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
  translation:
    'Whoever follows a path seeking knowledge, Allah will make easy for him a path to Paradise.',
  narrator: 'Abu Hurayrah',
  source: 'Sahih Muslim 2699',
  grade: 'Sahih',
};

export const wordOfTheDay: ArabicWord = {
  arabic: 'صَبْر',
  transliteration: 'Sabr',
  meaning: 'Patience, perseverance',
  example: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ — “Indeed, Allah is with the patient.” (Qurʾan 2:153)',
};

const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const previousDays: DayRecord[] = [
  { date: daysAgo(1), completed: 10, total: 12 },
  { date: daysAgo(2), completed: 8, total: 12 },
  { date: daysAgo(3), completed: 11, total: 12 },
  { date: daysAgo(4), completed: 9, total: 12 },
  { date: daysAgo(5), completed: 12, total: 12 },
];

export const routineSettings: RoutineSetting[] = [
  { id: 'prayers', label: 'Five Daily Prayers', icon: 'prayer', enabled: true },
  { id: 'morning-adhkar', label: 'Morning Adhkar', icon: 'sunny', enabled: true },
  { id: 'evening-adhkar', label: 'Evening Adhkar', icon: 'moon', enabled: true },
  { id: 'quran', label: 'Qurʾan Reading', icon: 'book', enabled: true },
  { id: 'istighfar', label: 'Istighfar', icon: 'hand', enabled: false },
];
