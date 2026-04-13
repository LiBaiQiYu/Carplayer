import type { CarItem } from './types';

export function createCarItem(
  name: string,
  year: number,
  carplay: boolean,
  carlife: boolean,
  hicar: boolean,
  iccoa: boolean,
  recommend?: 1 | 2 | 3 | 4 | 5,
): CarItem {
  return { name, year, carplay, carlife, hicar, iccoa, recommend };
}
