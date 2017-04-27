import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers/index'

const isDev = process.env.NODE_ENV !== 'production'

const router = routerMiddleware(browserHistory)

const middleware = [thunk, router]

if (isDev) middleware.push(require('redux-logger')())

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
