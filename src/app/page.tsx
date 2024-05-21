"use client";

import photos from "@/constants/photos";
import Image from "next/image";
import Link from "next/link";
import request from "@/request";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  const getUsers = async () => {
    const res = await request.get("/api/user");
    console.log(res);
  };

  const addUser = async () => {
    const res = await request.post("/api/user", {
      name: "dx",
      avatar: "https://sitecdn.zcycdn.com/1133XY/b47a33dc-be82-4217-b8bb-3448e22dd5bf",
      username: "superadmin",
      password: "test123456",
    });
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
    <div className="h-full w-[1280px] mx-auto px-[24px] py-[32px]">
      <button onClick={addUser}>add user</button>
      <input type="text" value={username} />
    </div>
  );
}
