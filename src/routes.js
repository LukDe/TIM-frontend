import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import HomePage from './containers/HomePage'
import RequestPage from './containers/RequestPage'
import OfferPage from './containers/OfferPage'
import LoginPage from './containers/LoginPage'
import NotFoundPage from './components/NotFoundPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="request" component={RequestPage}/>
    <Route path="offer" component={OfferPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
)
