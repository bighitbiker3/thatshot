import reducer from '../header'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

const initState = {
  show: 'none',
  active: false,
  profilePage: false
}

describe('Header', () => {
  it('should respond to showSignup', () => {
    expect(reducer(initState, {type: actionTypes.SHOW_SIGNUP, payload: {active: true, show: 'signup'}})).to.deep.equal({
      show: 'signup',
      active: true,
      profilePage: false
    })
  })

  it('should respond to showLogin', () => {
    expect(reducer(initState, {type: actionTypes.SHOW_SIGNUP, payload: {active: true, show: 'login'}})).to.deep.equal({
      show: 'login',
      active: true,
      profilePage: false
    })
  })

  it('should respond to showSubmission', () => {
    expect(reducer(initState, {type: actionTypes.SHOW_SUBMISSION, payload: {active: true, show: 'submission'}})).to.deep.equal({
      show: 'submission',
      active: true,
      profilePage: false
    })
  })

  it('should respond to close the header', () => {
    expect(reducer(initState, {type: actionTypes.CLOSE_HEADER, payload: {active: false, show: 'none'}})).to.deep.equal({
      show: 'none',
      active: false,
      profilePage: false
    })
  })

  it('should toggle to show/hide profile page', () => {
    expect(reducer(initState, {type: actionTypes.SHOW_PROFILE_PAGE, profilePage: 'none'})).to.deep.equal({
      show: 'none',
      active: false,
      profilePage: true
    })
    initState.profilePage = true
    expect(reducer(initState, {type: actionTypes.SHOW_PROFILE_PAGE, profilePage: 'none'})).to.deep.equal({
      show: 'none',
      active: false,
      profilePage: false
    })
  })

})
