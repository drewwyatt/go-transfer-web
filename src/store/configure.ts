import { createStore, applyMiddleware, compose } from 'redux'
import * as createLogger from 'redux-logger'
import rootReducer from '../reducers'

const configureStore = (preloadedState?: any) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(createLogger())
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