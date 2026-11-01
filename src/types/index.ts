// Shared data types for Yawm. Practices are the app's main data: the user
// creates, views, edits and deletes them in later weeks.

export type PracticeType = 'obligatory' | 'voluntary';

export type PracticeCategory = 'prayer' | 'adhkar' | 'quran' | 'dua';

/** "checkbox" = done / not done, "count" = progress towards a target. */
export type TrackingType = 'checkbox' | 'count';

export interface Practice {
  id: string;
  name: string;
  description: string;
  type: PracticeType;
  category: PracticeCategory;
  tracking: TrackingType;
  /** Time shown next to prayers, e.g. "5:42 AM". */
  time?: string;
  /** Only for "count" tracking. */
  target?: number;
  unit?: string;
  progress: number;
  completed: boolean;
}

export interface Hadith {
  arabic: string;
  translation: string;
  narrator: string;
  source: string;
  grade: string;
}

export interface ArabicWord {
  arabic: string;
  transliteration: string;
  meaning: string;
  example: string;
}

export interface DayRecord {
  date: Date;
  completed: number;
  total: number;
}

export interface RoutineSetting {
  id: string;
  label: string;
  icon: 'prayer' | 'sunny' | 'moon' | 'book' | 'hand';
  enabled: boolean;
}
