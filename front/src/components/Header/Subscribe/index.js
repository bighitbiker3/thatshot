import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import Subscribe from './presenter'

function mapStateToProps (state, props) {
  const subscribe = state.subscribe
  return {
    subscribe
  }
}

function mapDispatchToProps (dispatch) {
  return {
    subscribeFormChange: bindActionCreators(actions.subscribeFormChange, dispatch),
    subscribeSubmit: bindActionCreators(actions.subscribeSubmit, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe)
