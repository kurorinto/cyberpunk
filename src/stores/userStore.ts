import { produce } from 'immer'
import { createStore } from 'zustand/vanilla'

export type UserState = {
  userInfo: {
    name: string;
    username: string;
    avatar: string;
  }
}

export type UserActions = {
  setUser: (userInfo: UserState) => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  userInfo: {
    name: '',
    username: '',
    avatar: '',
  },
}

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: ({ userInfo }) =>
      set(
        produce<UserState>((state) => {
          state.userInfo = userInfo
        })
      ),
  }))
}