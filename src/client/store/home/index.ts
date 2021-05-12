import { IUser } from '@/modules/home'
import { createModel } from '@rematch/core'

interface HomeState {
  users: IUser
}

export default createModel<any>()({
  state: {
    users: {}
  } as HomeState,
  reducers: {
    setUser: (state: HomeState, users: IUser) => ({
      ...state,
      users
    })
  },
  effects: (dispatch: any) => ({})
})
