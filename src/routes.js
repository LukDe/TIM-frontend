import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import HomePage from './containers/HomePage'
import RequestPage from './containers/RequestPage'
import OfferPage from './containers/OfferPage'
import LoginPage from './containers/LoginPage'
import NotFoundPage from './components/NotFoundPage'
import ImpressumPage from './components/ImpressumPage'
import { navbarSelect } from './actions/navbar'

export default function RouteWithStore (store) {
  const redirectIfLogged = (nextState, replaceState) => {
    const state = store.getState()
    const loggedIn = Boolean(state.global.user.data)

    if (loggedIn) {
      replaceState('/')
      store.dispatch(navbarSelect('RANKING'))
    }
  }

  const checkAuth = (nextState, replaceState) => {
    const state = store.getState()
    const loggedIn = state.global.user.data

    const goingRequestOrOffer =
      nextState.location.pathname === '/request' ||
      nextState.location.pathname === '/offer'

    const goingToLogin = nextState.location.pathname === '/login'

    if (loggedIn && goingToLogin) {
      replaceState('/')
      store.dispatch(navbarSelect('RANKING'))
    } else if (!loggedIn && goingRequestOrOffer) {
      replaceState('/login')
      store.dispatch(navbarSelect('LOGIN'))
    }
  }

  return (
    <Route path="/" component={App}>

      <IndexRoute component={HomePage}/>

      <Route onEnter={checkAuth}>
        <Route path="request" component={RequestPage}/>
        <Route path="offer" component={OfferPage}/>
      </Route>

      <Route path="login" component={LoginPage} onEnter={redirectIfLogged}/>
      <Route path="impressum" component={ImpressumPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  )
}
