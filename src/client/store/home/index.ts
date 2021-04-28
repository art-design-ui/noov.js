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
    const { players } = dispatch
    return {
      async getPlayers(): Promise<any> {
        let response = await fetch('https://www.balldontlie.io/api/v1/players')
        let { data }: { data: HomeState[] } = await response.json()
        players.SET_PLAYERS(data)
      }
    }
  }
})
