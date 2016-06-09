// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from '../actions/global/sagas'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, compose(
      // redux-observable middleware for async actions.
      applyMiddleware(sagaMiddleware),
      // Devtools extension for chrome.
      window.devToolsExtension ? window.devToolsExtension() : (f) => f // add support for Redux dev tools
    )
  )

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
