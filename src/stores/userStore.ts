import { produce } from 'immer'
import { create } from 'zustand'
import { User } from "@/app/api/account/login/route"

export type UserState = {
  userInfo: Partial<Omit<User, 'password'>>
}

export type UserActions = {
  setUser: (userInfo: UserState['userInfo']) => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  userInfo: {},
}

export const useStore = create<UserStore>()((set) => ({
  ...defaultInitState,
  setUser: (userInfo) =>
    set(
      produce<UserState>((state) => {
        state.userInfo = userInfo
      })
    ),
}))