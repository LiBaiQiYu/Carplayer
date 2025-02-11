import hyundai from '@/data/Korea/hyundai'
import kia from '@/data/Korea/kia';
import roewe from '@/data/China/roewe';
import volkswagen from '@/data/Germany/volkswagen';
import honda from '@/data/Japan/honda';
import mazda from '@/data/Japan/mazda';
import toyota from '@/data/Japan/toyota';
import nissan from '@/data/Japan/nissan';
import mg from '@/data/UK/mg';
import peugeot from '@/data/France/peugeot';

const 现代 = hyundai;
const KIA = kia;
const 大众 = volkswagen;
const 标致 = peugeot;
const 荣威 = roewe;
const 丰田 = toyota;
const 本田 = honda;
const 马自达 = mazda;
const 名爵 = mg;
const 尼桑 = nissan;

export const brands: Brand[] = [
  {
    name: '现代 Hyundai',
    data: 现代
  },
  {
    name: '起亚 KIA',
    data: KIA
  },
  {
    name: '大众 VolksWagen',
    data: 大众
  },
  {
    name: '标致 Peugeot',
    data: 标致
  },
  {
    name: '荣威 Roewe',
    data: 荣威
  },
  {
    name: '名爵 MG',
    data: 名爵
  },
  {
    name: '丰田 Toyota',
    data: 丰田
  },
  {
    name: '本田 Honda',
    data: 本田
  },
  {
    name: '马自达 Mazda',
    data: 马自达
  },
  {
    name: '日产尼桑 Nissan',
    data: 尼桑
  },
]
