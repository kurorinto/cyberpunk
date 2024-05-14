"use client"

import { FC, useEffect, useState } from "react"

interface HomeProps {}

const fn = (i: any) => {
  console.log(i)
}

const Home: FC<HomeProps> = () => {
  const [data, setData] = useState()

  const getData = async () => {
    const r = await fetch("/api")
    const res = await r.json()

    setData(res.data)
  }

  useEffect(() => {
    // getData()
    location.href = "/api"
    return () => {}
  }, [])

  return <div>{data}</div>
}

export default Home
