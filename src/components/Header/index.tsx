import { DEFAULT_AVATAR } from "@/constants/defaults"
import { useStore } from "@/stores/userStore"
import { isEmptyObject } from "@/utils"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const userInfo = useStore((state) => state.userInfo)

  return (
    <header className="sticky top-0 h-[64px] flex justify-center shadow backdrop-blur">
      <div className="w-[1400px] px-[24px] flex items-center justify-between">
        <nav className="flex items-center gap-[24px]">
          <Link href="/home">Home</Link>
          <Link href="/">Dashboard</Link>
        </nav>
        {!isEmptyObject(userInfo) && (
          <a href={userInfo.loggedIn ? "/home" : "/login"} className="flex items-center gap-x-[8px]">
            <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
              <Image alt="" width={32} height={32} src={userInfo.avatar || DEFAULT_AVATAR} />
            </div>
            <div>{userInfo.loggedIn ? userInfo.nick : "点击登录"}</div>
          </a>
        )}
      </div>
    </header>
  )
}

export default Header
