'use client'
import { Toaster } from "@/components/ui/sonner"
import request from "@/request"
import { useStore } from "@/stores/userStore"
import { Inter } from "next/font/google"
import { useEffect } from "react"
import "./global.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode
    modal: React.ReactNode
  }>,
) {
  const setUser = useStore((state) => state.setUser)
  const getUser = async () => {
    const { success, result } = await request.get("/api/user")
    if (success && result) {
      setUser(result)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <html lang="en">
      <head>
        <title>Cyberpunk</title>
      </head>
      <body className={inter.className}>
        <main>{props.children}</main>
        {props.modal}
        <Toaster
          // closeButton
          richColors
          toastOptions={{
            classNames: {
              toast: "items-start leading-[20px]",
              icon: "mt-[3px]",
              title: "leading-[22px] text-[16px] break-all",
              description: "leading-[20px] max-h-[150px] overflow-y-auto break-all",
            },
          }}
          visibleToasts={Infinity}
          position="top-right"
        />
      </body>
    </html>
  )
}
