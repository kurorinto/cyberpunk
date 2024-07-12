"use client"
import { FC } from "react"
import { data } from "./data"
import Image from "next/image"
import { toast } from "sonner"

interface MaterialProps {}

const Material: FC<MaterialProps> = () => {
  return (
    <div className="w-[1200px] mx-auto flex flex-wrap gap-[12px] py-[32px]">
      {data.map((item, index) => (
        <div
          key={index}
          className="w-[192px] p-[6px] border border-solid border-gray-300 rounded-md cursor-pointer relative group"
          onClick={async () => {
            navigator.clipboard.writeText(item.url)
            toast.success('复制成功', {
              description: item.name,
            })
          }}
        >
          <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0 justify-center items-center hidden group-hover:flex text-white font-medium text-[18px]">
            复制
          </div>
          <div className="w-[180px] h-[120px]">
            <Image className="w-full h-full object-contain" alt={item.name} src={item.url} width={180} height={120} />
          </div>
          <div className="mt-[8px] text-center">{item.name}</div>
          <div className="mt-[4px] text-center">{item.createTime}</div>
        </div>
      ))}
    </div>
  )
}

export default Material
