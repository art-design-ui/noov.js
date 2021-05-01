import { createModel } from '@rematch/core'

type HomeState = {
  players: any[]
}

export default createModel<any>()({
  state: {
    players: [1, 2, 3, 99]
  } as HomeState,
  reducers: {
    SET_PLAYERS: (state: HomeState, players: HomeState[]) => {
      return {
        ...state,
        players
      }
    }
  },
  effects: (dispatch: any) => {
    const { home } = dispatch
    return {
      async getPlayers(): Promise<any> {
        let response = await fetch('https://www.balldontlie.io/api/v1/players')
        let { data }: { data: HomeState[] } = await response.json()
        home.SET_PLAYERS(data)
      },
      // ! 约定的方法
      getInitialData(){
        return new Promise(resolve=>{
          //延迟 500ms 返回数据
            setTimeout(() => {
              const data = {
              test:'123'
              }
              resolve(data);
              //更新状态
              console.log('players',home)
              home.SET_PLAYERS([800,800,800])
            }, 500);
          })
      }
    }
  }
})
