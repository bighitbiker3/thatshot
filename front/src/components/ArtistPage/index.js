import { connect } from 'react-redux'
import * as actions from '../../actions'
import ArtistPage from './presenter'

const mapStateToProps = ({artist}, ownProps) => {
  const routeParams = ownProps.routeParams
  return {
    routeParams,
    artist
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setArtistTracks: (artist) => dispatch(actions.setArtistPageTracks(artist))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage)
