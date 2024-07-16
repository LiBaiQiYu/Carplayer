'use client'
import Header from "@/components/header";
import List from "@/components/list";
import SubList from "@/components/subList"
import Stack from '@mui/material/Stack';
import { useState } from "react";


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
const 名爵 = mg
const 尼桑 = nissan;
const brands: Brand[] = [
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
]

export default function Home() {
  const [idx, setIdx] = useState(0)
  const clickBrand = (index: number) => {
    console.log(index)
    setIdx(index)
  }
  return (
    <>
      {/* <Header></Header> */}
      <Stack
        className="h-[100vh]"
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}>
        <SubList click={clickBrand} brands={brands}></SubList>
        <List index={idx} brands={brands}></List>
      </Stack>
    </>
  );
}
