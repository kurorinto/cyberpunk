import Image from "next/image"
import { FC } from "react"

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 px-[24px] h-[64px] flex justify-between">
      <nav className="flex items-center gap-[24px]">
        <a href="">Home</a>
      </nav>
      <div className="flex items-center">
        <a href="" className="w-[32px] h-[32px] rounded-full overflow-hidden">
          <Image
            alt=""
            width={32}
            height={32}
            src="https://sitecdn.zcycdn.com/1133XY/b47a33dc-be82-4217-b8bb-3448e22dd5bf"
          />
        </a>
      </div>
    </header>
  )
}

export default Header
