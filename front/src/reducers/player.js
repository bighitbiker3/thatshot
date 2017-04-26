import * as actionTypes from '../constants/actionTypes'

const initialState = {
  nowPlaying: false,
  activeTrack: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_TRACK: return toggleTrack(state, action)
  }
  return state
}

function toggleTrack (state, action) {
  // TODO: Don't rename action.track?
  return state.activeTrack === action.track || !action.track ? Object.assign({}, state, {nowPlaying: !state.nowPlaying}) : {nowPlaying: true, activeTrack: action.track}
}
