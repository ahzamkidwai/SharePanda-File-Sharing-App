import React from "react";
import { AlignJustify } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

function TopHeader() {
  return (
    <div className="flex border-b p-5 items-center justify-between  md:justify-evenly">
      <AlignJustify className="md:hidden" />
      <Image src="/logo.svg" height={100} width={150} />
      <UserButton />
    </div>
  );
}

export default TopHeader;
