import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'
import * as actions from './actions'
import App from './components/App'
import Callback from './components/Callback'
import Stream from './components/Stream'
import ProfilePage from './components/ProfilePage'
import ProfileSettings from './components/ProfilePage/Settings'
import { CLIENT_ID, REDIRECT_URI } from './constants/auth'

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI })

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/callback' component={Callback} />
      <Route path='/' component={App}>
        <IndexRoute component={Stream} />
        <Route path='/:user' component={ProfilePage} />
        <Route path='/me' component={ProfilePage}>
          <Route path='/me/settings' component={ProfileSettings} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
