import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'
import App from './components/App'
import Stream from './components/Stream'
import ProfilePage from './components/ProfilePage'
import ProfileSettings from './components/ProfilePage/Settings'
import ArtistPage from './components/ArtistPage'
import Unsubscribe from './components/Unsubscribe'
import SingleTrack from './components/ArtistPage/SingleTrack'

const store = configureStore()

const browserHistory = useRouterHistory(createHistory)({
  basename: '/'
})

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Stream} />
        <Route path='/user/:user' component={ProfilePage} />
        <Route path='/artist/:artistName' component={ArtistPage}>
          <Route path='/artist/:artistName/:songName' component={SingleTrack} />
        </Route>
        <Route path='/me' component={ProfilePage}>
          <Route path='/me/settings' component={ProfileSettings} />
        </Route>
        <Route path='/unsubscribe' component={Unsubscribe} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
