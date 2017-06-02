import * as actionTypes from '../constants/actionTypes'

const initialState = {
  savantTracks: [],
  next_href: null,
  userTracks: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET_SAVANT: return setSavantTracks(state, action)
    case actionTypes.MORE_SAVANT_TRACKS: return moreSavantTracks(state, action)
    case actionTypes.TRACKS_SET_USER: return setUserTracks(state, action)
    case actionTypes.UPVOTE_TRACK: return upVoteTrack(state, action)
    case actionTypes.ALREADY_UPVOTED: return alreadyUpvoted(state, action)
  }
  return state
}

function setSavantTracks (state, action) {
  const { songs, next_href } = action.payload
  return {
    ...state,
    savantTracks: songs,
    next_href
  }
}

const moreSavantTracks = (state, action) => {
  const { songs, next_href } = action.payload
  const newTracks = [...state.savantTracks, ...songs]
  return {
    ...state,
    savantTracks: newTracks,
    next_href

  }
}

function setUserTracks (state, action) {
  let userTracksInAction = action.tracks
  if (Array.isArray(userTracksInAction)) {
    let userTracks = userTracksInAction
    return {...state, userTracks}
  }
  else {
    let userTracksArr = state.userTracks.slice()
    userTracksArr.push(userTracksInAction)
    let userTracks = userTracksArr
    return { ...state, userTracks }
  }
}

function upVoteTrack (state, action) {
  const newUpvotes = action.track.upvotes
  const upvoted = Object.assign({}, action.track, {
    upvotes: newUpvotes
  })
  return Object.assign({}, state, {
    savantTracks: state.savantTracks.map(track => track.id === upvoted.id ? upvoted : track),
    userTracks: state.userTracks.map(track => track.id === upvoted.id ? upvoted : track)
  })
}

function alreadyUpvoted (state, action) {
  return {...state}
}
