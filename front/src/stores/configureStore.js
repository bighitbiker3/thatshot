import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers/index'

const isDev = process.env.NODE_ENV !== 'production'

const logger = createLogger()
const router = routerMiddleware(browserHistory)

const createStoreWithMiddleware = applyMiddleware(thunk, router, isDev ? logger : null)(createStore)

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
