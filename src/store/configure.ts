import { createStore, applyMiddleware, compose, Middleware } from 'redux'
import * as createLogger from 'redux-logger'
import rootReducer from '../reducers'
import api from '../middleware/api';
import thunk from 'redux-thunk';

const configureStore = (preloadedState?: any) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, api as Middleware, createLogger()),
    )
  )

  // TODO
  // if (module['hot']) {
  //   // Enable Webpack hot module replacement for reducers
  //   module['hot'].accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}

export default configureStore