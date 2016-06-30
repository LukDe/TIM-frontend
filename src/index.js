import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import ReduxToastr from 'react-redux-toastr'
import routes from './routes'
import configureStore from './store/configureStore' // eslint-disable-line import/default
require('./favicon.ico')

import 'react-redux-toastr/src/less/index.less'
import './semantic/dist/semantic.min.css'
import './semantic/dist/semantic.min.js'
import './semantic/dist/components/dropdown.min.js'
import './semantic/dist/components/modal.min.js'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes(store)} />
      {/* This component allows us to use toastrs */}
      <ReduxToastr
        timeOut={2000}
        newestOnTop={true}
        position="bottom-right" />
    </div>
  </Provider>,
  document.getElementById('app')
)
