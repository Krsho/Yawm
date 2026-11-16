import { Practice } from '../types';

/** Text shown on the right of a practice row: a time, "15 / 15" or "0 / 2 pages". */
export function practiceMeta(practice: Practice): string {
  if (practice.tracking === 'count' && practice.target) {
    const unit = practice.unit ? ` ${practice.unit}` : '';
    return `${practice.progress} / ${practice.target}${unit}`;
  }
  return practice.time ?? '';
}

export function countCompleted(list: Practice[]): number {
  return list.filter((practice) => practice.completed).length;
}

/** One group on the Practices screen; SectionList needs the items in `data`. */
export interface PracticeSection {
  title: string;
  badge: string;
  tone: 'green' | 'beige';
  data: Practice[];
}

/** Splits practices into the three groups, keeping their order and leaving out empty groups. */
export function groupPractices(list: Practice[]): PracticeSection[] {
  const sections: PracticeSection[] = [
    {
      title: 'Obligatory Prayers',
      badge: 'Fard',
      tone: 'green',
      data: list.filter((p) => p.type === 'obligatory'),
    },
    {
      title: 'Sunnah Prayers',
      badge: 'Voluntary',
      tone: 'beige',
      data: list.filter((p) => p.type === 'voluntary' && p.category === 'prayer'),
    },
    {
      title: 'Daily Worship',
      badge: 'Voluntary',
      tone: 'beige',
      data: list.filter((p) => p.type === 'voluntary' && p.category !== 'prayer'),
    },
  ];
  return sections.filter((section) => section.data.length > 0);
}
