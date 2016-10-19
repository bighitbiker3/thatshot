import reducer from '../auth.signup'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

const initState = {email: '', password: '', username: ''}

describe('Signup form should respond to input actions', () => {
  it('return default state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initState)
  })

  it('should handle email inputs', () => {
    expect(reducer(initState, {type: actionTypes.SIGNUP_EMAIL_CHANGE, email: 'elliott@gmail.com'})).to.deep.equal({email: 'elliott@gmail.com', password: '', username: ''})
  })

  it('should handle password inputs', () => {
    expect(reducer(initState, {type: actionTypes.SIGNUP_PASSWORD_CHANGE, password: 'lol'})).to.deep.equal({email: '', password: 'lol', username: ''})
  })

  it('should handle username inputs', () => {
    expect(reducer(initState, {type: actionTypes.SIGNUP_USERNAME_CHANGE, username: 'bighitbiker3'})).to.deep.equal({email: '', password: '', username: 'bighitbiker3'})
  })
})