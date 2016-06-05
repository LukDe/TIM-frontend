// Set up your application entry point here...
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore' // eslint-disable-line import/default
require('./favicon.ico')

import './semantic/dist/semantic.min.css'
import './semantic/dist/semantic.min.js'
import './semantic/dist/components/dropdown.min.js'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
