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
    getArtistTracks: (artistName) => { 
      dispatch(actions.setArtistPageTracks(artistName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage)