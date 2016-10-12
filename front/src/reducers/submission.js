import * as actionTypes from '../constants/actionTypes'

const initialState = {
  link: '',
  song: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SUBMISSION_CHANGE: return submissionFormChange(state, action)
    case actionTypes.SUBMISSION_SUBMIT: return submissionSubmit(state, action)
    case actionTypes.CLEAR_SUBMISSION_INPUT: return clearSubmissionInput(state, action)
  }
  return state
}

function submissionFormChange (state, action) {
  let submission = action.submission
  return Object.assign({}, state, {link: submission})
}

function submissionSubmit (state, action) {
  let song = action.song
  return Object.assign({}, state, {song: song})
}


function clearSubmissionInput (state, action) {
  return Object.assign({}, state, {link: ''})
}
