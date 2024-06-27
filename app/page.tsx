'use client'
import Header from "@/components/header";
import List from "@/components/list";
import SubList from "@/components/subList"
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
      <div className="flex h-[100vh]">
        <SubList click={clickBrand}></SubList>
        <List index={idx}></List>
      </div>

    </>
  );
}
