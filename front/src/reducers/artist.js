import * as actionTypes from '../constants/actionTypes'

const initialState = {
  artistTracks: [],
  single: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET_ARTIST: return setArtistTracks(state, action)
    case actionTypes.SINGLE_TRACK_SET_ARTIST: return setSingleArtistTrack(state, action)
  }
  return state
}

function setSingleArtistTrack (state, action) {
  return {
    ...state,
    single: action.payload
  }
}

function setArtistTracks (state, action) {
  return {
    ...state,
    artistTracks: action.payload
  }
}
