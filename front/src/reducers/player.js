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
  const { activeTrack, nowPlaying } = action.payload
  return {
    nowPlaying,
    activeTrack
  }
}
