import Header from "@/components/Header"
import { FC, Fragment, PropsWithChildren } from "react"

interface HomeLayoutProps {}

const HomeLayout: FC<PropsWithChildren<HomeLayoutProps>> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  )
}

export default HomeLayout
