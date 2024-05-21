import Image from "next/image";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 h-[64px] flex justify-center shadow backdrop-blur">
      <div className="w-[1400px] px-[24px] flex items-center justify-between">
        <nav className="flex items-center gap-[24px]">
          <a href="">Home</a>
          <a href="">Dashboard</a>
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
      </div>
    </header>
  );
};

export default Header;
