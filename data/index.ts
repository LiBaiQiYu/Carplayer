import type { Brand, Country } from './types';

import roewe from './China/roewe';
import peugeot from './France/peugeot';
import volkswagen from './Germany/volkswagen';
import honda from './Japan/honda';
import mazda from './Japan/mazda';
import nissan from './Japan/nissan';
import toyota from './Japan/toyota';
import hyundai from './Korea/hyundai';
import kia from './Korea/kia';
import mg from './UK/mg';

const brandConfigs: { name: string; country: Country; data: Brand['data'] }[] = [
  { name: '现代 Hyundai', country: 'Korea', data: hyundai },
  { name: '起亚 KIA', country: 'Korea', data: kia },
  { name: '大众 VolksWagen', country: 'Germany', data: volkswagen },
  { name: '标致 Peugeot', country: 'France', data: peugeot },
  { name: '荣威 Roewe', country: 'China', data: roewe },
  { name: '名爵 MG', country: 'UK', data: mg },
  { name: '丰田 Toyota', country: 'Japan', data: toyota },
  { name: '本田 Honda', country: 'Japan', data: honda },
  { name: '马自达 Mazda', country: 'Japan', data: mazda },
  { name: '日产尼桑 Nissan', country: 'Japan', data: nissan },
];

export const brands: Brand[] = brandConfigs;

export type { Brand, CarItem, Country } from './types';
