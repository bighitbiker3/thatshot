import Settings from './presenter'
import { connect } from 'react-redux'
import { soundCloudAuth } from '../../../actions/auth'
import { toggleSettings } from '../../../actions/profilePage'

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    soundCloudAuth: () => dispatch(soundCloudAuth()),
    toggleSettings: () => dispatch(toggleSettings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
