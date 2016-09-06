import React from 'react';
import Player from '../Player'
import Header from '../Header'
import { Notifs } from 'redux-notifications';

function App({ children }) {
  return (
    <div>
      <Notifs />
      <Header />
      {children}
      <Player />
    </div>)
}

export default App;
