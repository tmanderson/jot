import thunk from 'redux-thunk'
import rootReducer from './reducer'
import createLogger from 'redux-logger'

import { applyMiddleware, compose, createStore } from 'redux'

export default (initialState) => {
  const middleware = applyMiddleware(thunk)
  let init = compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f=>f)

  const store = init(createStore)(rootReducer, initialState)
  if(module.hot) module.hot.accept('./reducer', () => store.replaceReducer(require('./reducer').default))

  return store
}