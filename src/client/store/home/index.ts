import { createModel } from '@rematch/core'

interface HomeState {
  players: any[]
}

export default createModel<any>()({
  state: {
    players: [1, 2, 3, 99]
  } as HomeState,
  reducers: {
    SET_PLAYERS: (state: HomeState, players: HomeState[]) => ({
      ...state,
      players
    })
  },
  effects: (dispatch: any) => {
    const { home } = dispatch
    return {
      async getPlayers(): Promise<any> {
        const response = await fetch('https://www.balldontlie.io/api/v1/players')
        const { data }: { data: HomeState[] } = await response.json()
        home.SET_PLAYERS(data)
      },
      // ! 约定的方法
      getInitialData() {
        return new Promise(resolve => {
          // 延迟 500ms 返回数据
          setTimeout(() => {
            const data = {
              test: '123'
            }
            resolve(data)
            // 更新状态
            home.SET_PLAYERS([800, 800, 800])
          }, 500)
        })
      }
    }
  }
})
