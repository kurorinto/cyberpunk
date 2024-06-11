"use client"

import { CyberEditor } from "@/components/CyberEditor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import request from "@/request"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const cyberEditorRef = useRef<CyberEditor>()

  useEffect(() => {
    cyberEditorRef.current = new CyberEditor("#editor")
    return () => {
      cyberEditorRef.current?.destroy()
    }
  }, [])

  return (
    <div className="h-full w-[1280px] mx-auto px-[24px] py-[32px] flex flex-col gap-y-[12px]">
      <div id="editor" className="w-[800px] h-[400px]" />
    </div>
  )
}
