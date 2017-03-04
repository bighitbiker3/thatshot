import * as actionTypes from '../constants/actionTypes'

const initialState = {
  user: {},
  soundcloud: {
    favorites: []
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ME_SET: return setMe(state, action)
    case actionTypes.ME_SET_SOUNDCLOUD: return setMeSoundCloud(state, action)
    case actionTypes.LOGOUT: return logout(state, action)
    case actionTypes.LIKE_ON_SOUNDCLOUD: return likeOnSoundcloud(state, action)
  }
  return state
}

function setMe (state, action) {
  const { user } = action
  return {...state, user}
}

function setMeSoundCloud (state, action) {
  const { soundcloud } = action
  return {...state, soundcloud}
}

function logout (state, action) {
  const user = null
  const soundcloud = null
  return Object.assign({}, state, {soundcloud, user})
}

function likeOnSoundcloud (state, action) {
  state.soundcloud.favorites.push(action.trackId)
  return Object.assign({}, state)
}
