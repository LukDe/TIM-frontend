// Set up your root reducer here...
import { combineReducers } from 'redux'
import globalReducer from './global'
import navbarReducer from './navbar'

const rootReducer = combineReducers({
  global: globalReducer,
  navbar: navbarReducer
})

export default rootReducer
