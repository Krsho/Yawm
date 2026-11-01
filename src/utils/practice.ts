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
