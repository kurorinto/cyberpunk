"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import request from "@/request";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getUsers = async () => {
    const res = await request.get("/api/user");
    console.log(res);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    // <div className="cards-container">
    //   {photos.map((item, index) => (
    //     <Link key={index} className="card" href={`/photos/${item.id}`} passHref>
    //       <Image src={item.src} alt="" width={300} height={100} priority className="w-auto h-auto" />
    //     </Link>
    //   ))}
    // </div>
    <div className="h-full w-[1280px] mx-auto px-[24px] py-[32px] flex flex-col gap-y-[12px]">
      <Button
        onClick={async () => {
          const res = await request.post("/api/login", {
            username,
            password,
          });
        }}
      >
        click
      </Button>
      <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
  );
}
