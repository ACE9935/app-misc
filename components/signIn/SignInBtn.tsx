"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Button } from "@mui/material";

export default function SignInBtn({text,img,onClick}:{text:string,img:string,onClick:MouseEventHandler}) {
  return (
    <Button
      onClick={onClick}
      sx={{textTransform:"none"}}
      className="!flex !gap-5 !shadow-lg !rounded-2xl !w-full"
    >
      <Image alt="sign-in with google" src={img} height={40} width={40} />
      <span className="text-black text-xl px-4 py-3">
       {text}
      </span>
    </Button>
  );
}