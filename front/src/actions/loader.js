import * as actionTypes from '../constants/actionTypes'

export function startLoading () {
  return {
    type: actionTypes.START_LOADING
  }
}

export function stopLoading () {
  return {
    type: actionTypes.STOP_LOADING
  }
}
