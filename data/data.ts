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

const brandMap = {
  '现代 Hyundai': hyundai,
  '起亚 KIA': kia,
  '大众 VolksWagen': volkswagen,
  '标致 Peugeot': peugeot,
  '荣威 Roewe': roewe,
  '名爵 MG': mg,
  '丰田 Toyota': toyota,
  '本田 Honda': honda,
  '马自达 Mazda': mazda,
  '日产尼桑 Nissan': nissan,
};

export const brands: Brand[] = Object.entries(brandMap).map(([name, data]) => ({
  name,
  data,
}));