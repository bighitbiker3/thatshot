import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as server from '../../../constants/server'
import * as actionTypes from '../../../constants/actionTypes'
import * as actions from '../../../actions'
import nock from 'nock'
import { expect } from 'chai' // You can use any testing library
import SignUp from './presenter';

require('isomorphic-fetch');


const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

function setup(){
  const enzymeWrapper = shallow(<SignUp {...props} />)

  return {
    enzymeWrapper
  }
}



describe('Sign Up Test', () => {
  it('should send a input change action', () => {
    const payload = {target: {value: 'a'}};
    const expectedPassWordAction = {type: actionTypes.SIGNUP_PASSWORD_CHANGE, password: 'a'};
    const expectedEmailAction = {type: actionTypes.SIGNUP_EMAIL_CHANGE, email: 'a'};

    expect(actions.signUpPasswordFormChange(payload)).to.deep.equal(expectedPassWordAction)
    expect(actions.signUpEmailFormChange(payload)).to.deep.equal(expectedEmailAction)
  })
  it('should send input change actions', () => {
    const expectedAction = {type: actionTypes.ME_SET, hi: ''}
    const store = mockStore();
    return store.dispatch(actions.signUpSubmit('el@gmail.com', 'mc'))
    .then(() => {
      expect(store.getActions()[0]).to.deep.equal(expectedAction)
    })
    enzymeWrapper.ref('email').simulate('keypress')

  })
})
