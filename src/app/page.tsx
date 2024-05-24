"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import request from "@/request";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="h-full w-[1280px] mx-auto px-[24px] py-[32px] flex flex-col gap-y-[12px]">
      Home
      <div>
        <Button
          onClick={() => {
            request.post("/api/test");
          }}
        >
          需要登录的操作
        </Button>
      </div>
    </div>
  );
}
