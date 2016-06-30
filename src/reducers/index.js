// Set up your root reducer here...
import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import globalReducer from './global'
import navbarReducer from './navbar'
import offerReducer from './offer'

const rootReducer = combineReducers({
  toastr: toastrReducer,
  // Application reducers
  global: globalReducer,
  navbar: navbarReducer,
  offer: offerReducer
})

export default rootReducer
