import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as auth from '../../constants/auth'
import * as actionTypes from '../../constants/actionTypes'
import * as actions from '../../actions'
import { expect } from 'chai'
import Player from './presenter'

require('isomorphic-fetch')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

function setup () {
  const props = {
    player: {
      activeTrack: {title: 'sick', stream_url: 'google.com', id: '1'},
      nowPlaying: false
    },
    toggleTrack: function () {
      this.player.nowPlaying = !this.player.nowPlaying
    }
  }

  const enzymeWrapper = shallow(<Player {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('player', () => {
  it('should receive track data from state on toggle', () => {
    const track = {id: 4, title: 'Good Song', link: 'http://google.com'}
    const expectedAction = {type: actionTypes.TOGGLE_TRACK, track}

    expect(actions.toggleTrack(track)).to.deep.equal(expectedAction)
  })

  describe('player Render', () => {
    it('should render self', () => {
      const { enzymeWrapper, props } = setup()
      expect(enzymeWrapper.find('player').hasClass('player')).to.equal(true)
      expect(enzymeWrapper.find('audio')).to.have.length(1)
      expect(enzymeWrapper.find('audio').props().src).to.equal(props.player.activeTrack.stream_url + '?client_id=' + auth.CLIENT_ID)
    })
  })

  describe('play button action', () => {
    it('should toggle nowPlaying boolean', () => {
      const { enzymeWrapper, props } = setup()
      enzymeWrapper.find('.play-pause-button').simulate('click')
      expect(props.player.nowPlaying).to.equal(true)
      enzymeWrapper.find('.play-pause-button').simulate('click')
      expect(props.player.nowPlaying).to.equal(false)
    })
  })
})
