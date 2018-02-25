const addName = (state: any, name: string) => ({ 
  ...state,
  allNames: [...state.allNames, name],
  gameSetup : {
    ...state.gameSetup,
    currentNames: [...state.gameSetup.currentNames, name]
  }
})

const clearForNextPlayer = (state: any) => ({
  ...state,
  gameSetup : {
    ...state.gameSetup,
    currentNames: [],
    currentPlayerNum: state.gameSetup.currentPlayerNum + 1
  }
})

const actions = (_store: any) => ({
  addName: addName,
  clearForNextPlayer: clearForNextPlayer,
})

export interface ActionPropTypes {
  addName: (name: string) => void,
  clearForNextPlayer: () => void,
}

export default actions