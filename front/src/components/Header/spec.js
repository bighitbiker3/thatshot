import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as server from '../../constants/server'
import * as actionTypes from '../../constants/actionTypes'
import * as actions from '../../actions'
import nock from 'nock'
import { expect } from 'chai' // You can use any testing library
import Header from './presenter';

require('isomorphic-fetch');

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

function setup(bool){
  var props;
  if(bool){
    props = {auth: {user: {email: 'el@gmail.com', firstName: 'test'}}}
  } else {
    props = {auth: {}}
  }
  const enzymeWrapper = shallow(<Header {...props} />)


  return {
    props,
    enzymeWrapper
  }
}

xdescribe('header welcome', () => {
  const { enzymeWrapper, props } = setup(true)
  it('welcomes user if logged in', () => {
    expect(enzymeWrapper.find('p').text()).to.contain('Hello ' + props.auth.user.firstName)
  })
})

describe('header show Login/Signup', () => {
  const { enzymeWrapper, props } = setup(false)
  it('shows login and sign up', () => {
    expect(enzymeWrapper.find('SignUp')).to.be.an('object')
    expect(enzymeWrapper.find('Login')).to.be.an('object')
  })
})
