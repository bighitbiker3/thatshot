import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as server from '../../constants/server'
import * as actionTypes from '../../constants/actionTypes'
import * as actions from '../../actions'
import nock from 'nock'
import { expect } from 'chai' // You can use any testing library
import Header from './presenter'

require('isomorphic-fetch')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

function setup () {
  const props = {getSession: function () {}, header: {show: 'none', active: false}, auth: {user: {email: 'el@gmail.com', firstName: 'test'}}}

  const enzymeWrapper = shallow(<Header {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('header welcome', () => {
  const { enzymeWrapper, props } = setup()
  it('welcomes user if logged in', () => {
    expect(enzymeWrapper.find('p').text()).to.contain('Hello ' + props.auth.user.firstName)
  })
})

describe('header show Login/Signup', () => {
  const { enzymeWrapper, props } = setup()
  it('shows login and sign up', () => {
    expect(enzymeWrapper.find('SignUp')).to.be.an('object')
    expect(enzymeWrapper.find('Login')).to.be.an('object')
  })
})

describe('header state working', () => {
  const { enzymeWrapper, props } = setup()
  it('should send correct actions for signup', () => {
    let payload = {active: true, show: 'signup'}
    let expectedActionSignUp = {type: actionTypes.SHOW_SIGNUP, payload}
    expect(actions.showSignUp(payload)).to.deep.equal(expectedActionSignUp)
  })
  it('should send action for login', () => {
    let payload = {active: true, show: 'login'}
    let expectedActionLogin = {type: actionTypes.SHOW_LOGIN, payload}
    expect(actions.showLogin(payload)).to.deep.equal(expectedActionLogin)
  })
  it('should send action for closing header', () => {
    let payload = {active: false, show: 'none'}
    let expectedActionCloseHeader = {type: actionTypes.CLOSE_HEADER, payload}
    expect(actions.closeHeader(payload)).to.deep.equal(expectedActionCloseHeader)
  })
  it('should send action for submission ', () => {
    let payload = {active: true, show: 'submission'}
    let expectedActionShowSubmission = {type: actionTypes.SHOW_SUBMISSION, payload}
    expect(actions.showSubmission(payload)).to.deep.equal(expectedActionShowSubmission)
  })
})
