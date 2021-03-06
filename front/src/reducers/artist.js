import * as actionTypes from '../constants/actionTypes'

const initialState = {
  artistTracks: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET_ARTIST: return setArtistTracks(state, action)
  }
  return state
}

function setArtistTracks (state, action) {
  return {
    ...state,
    artistTracks: action.payload
  }
}
