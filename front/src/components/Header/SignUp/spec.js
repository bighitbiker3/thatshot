import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as server from '../../../constants/server'
import * as actionTypes from '../../../constants/actionTypes'
import * as actions from '../../../actions'
import nock from 'nock'
import { expect } from 'chai' // You can use any testing library
import SignUp from './presenter'

require('isomorphic-fetch')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

function setup () {
  const enzymeWrapper = shallow(<SignUp {...props} />)

  return {
    enzymeWrapper
  }
}

describe('Sign Up Test', () => {
  it('should send a input change action', () => {
    const payload = {target: {value: 'a'}}
    const expectedPassWordAction = {type: actionTypes.SIGNUP_PASSWORD_CHANGE, password: 'a'}
    const expectedEmailAction = {type: actionTypes.SIGNUP_EMAIL_CHANGE, email: 'a'}
    const expectedUsernameAction = {type: actionTypes.SIGNUP_USERNAME_CHANGE, username: 'a'}

    expect(actions.signUpPasswordFormChange(payload)).to.deep.equal(expectedPassWordAction)
    expect(actions.signUpEmailFormChange(payload)).to.deep.equal(expectedEmailAction)
    expect(actions.signUpUsernameChange(payload)).to.deep.equal(expectedUsernameAction)
  })
})
