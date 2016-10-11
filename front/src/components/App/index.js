import React from 'react'
import Player from '../Player'
import Header from '../Header'
import { Notifs } from 'redux-notifications'
import Loader from '../Loader'

function App ({ children }) {
  return (
    <div>
      <Notifs />
      <Loader />
      <Header />
      {children}
      <Player />
    </div>)
}

export default App
