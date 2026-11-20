import { Practice } from '../types';
import { practices } from './mockData';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Fake API until Supabase (Week 13): waits like a real request, then returns the sample data. */
export async function fetchPractices(options: { fail?: boolean } = {}): Promise<Practice[]> {
  await wait(800);
  if (options.fail) throw new Error('Could not load practices');
  return practices;
}

/** Finds one practice by its id, or returns undefined if there is none. */
export function getPractice(id: string): Practice | undefined {
  return practices.find((practice) => practice.id === id);
}
