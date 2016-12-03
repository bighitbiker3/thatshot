import React from 'react'
import Track from '../Track'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router'

//PROPS ARE: name; oneColumn; upvotedTracks; postedTracks

export default function (props) {
  console.log(props)
    return (
      <profile-page>
      {/* {this.props.route.pathname === '/me' ? <Link to='/me/settings'> <FontAwesome onClick={this.toggleSettings} className="settings-cog" name='cog' size='2x' /> </Link> : null}*/} 
        <h1 className='username'>{props.name}</h1>
        {props.children}
        {
          props.oneColumn
          ? null
          : <div>
              <h3 className='upvotes-title'>Upvotes</h3>
              <h3 className='posted-title'>Submissions</h3>
            </div>
        }
        <div className='upvoted-tracks'>
          {props.upvotedTracks.map((track, i) => <Track className='track' key={i} track={track} />)}
        </div>
        <div className={props.oneColumn ? null : 'posted-tracks'}>
          {props.postedTracks.map((track, i) => <Track className='track' key={i} track={track} />)}
        </div>
      </profile-page>
    )
}
