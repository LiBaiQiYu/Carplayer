'use client'
import Header from "@/components/header";
import List from "@/components/list";
import SubList from "@/components/subList"
import Stack from '@mui/material/Stack';
import { useState } from "react";


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
        <SubList click={clickBrand}></SubList>
        <List index={idx}></List>
      </Stack>
    </>
  );
}
