import R from 'ramda'
import { NAVBAR_SELECT } from '../constants/navbar'

const initialState = {
  selection: 'RANKING'
}

function navbarReducer (state = initialState, action) {
  switch (action.type) {
    case NAVBAR_SELECT:
      return R.assoc('selection', action.selection, state)

    default:
      return state
  }
}

export default navbarReducer
