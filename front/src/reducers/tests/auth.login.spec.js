import reducer from '../auth.login'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

const initState = {email: '', password: ''}

describe('Login Auth', () => {
  it('return default state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initState)
  })

  it('should handle email inputs', () => {
    expect(reducer(initState, {type: actionTypes.LOGIN_EMAIL_CHANGE, email: 'elliott@gmail.com'})).to.deep.equal({email: 'elliott@gmail.com', password: ''})
  })

  it('should handle password inputs', () => {
    expect(reducer(initState, {type: actionTypes.LOGIN_PASSWORD_CHANGE, password: 'lol'})).to.deep.equal({email: '', password: 'lol'})
  })
})
