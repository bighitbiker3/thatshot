import React from 'react'
import SignUp from './SignUp'
import Login from './Login'
import Submission from './Submission'
import Overlay from './Overlay'
import Subscribe from './Subscribe'
import { Link } from 'react-router'
var input

class Header extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props);
  }

  componentWillMount () {
    this.props.getSession()
  }

  render () {
    // Header Input show
    if (this.props.header.show === 'login') input = <Login />
    else if (this.props.header.show === 'signup') input = <SignUp />
    else if (this.props.header.show === 'submission') input = <Submission />
    else input = null

    return (
      <header style={this.props.header.active ? {color: 'white'} : {color: 'black'}} className='header'>
      <Overlay />
        <div className='brand-div'>
          <Link to={`/`}><h1 className='brand'>That's Hot</h1></Link>
        </div>

        <div className='header-right'>
          { this.props.auth.user ? <div><Link to={`/me`}><p>Hi {this.props.auth.user.username}</p></Link> <p>Score: {this.props.auth.user.score} </p> <p onClick={() => this.props.showSubmission()}>Submit Tune</p><p onClick={() => this.props.logout()}>Logout</p></div> : <div> <p onClick={() => this.props.showSignUp()}>Sign Up</p> <p onClick={() => this.props.showLogin()}>Login</p></div> }
        </div>
        <div className='header-input'>
        {input}
        </div>
        <div className='header-close'>
            {this.props.header.active ? <p onClick={() => this.props.closeHeader()}>X</p> : null}
        </div>

        <div className='header-message'>
          <h2>The top 15 songs from Soundcloud users with fewer than 15K followers, every day</h2>
        </div>
        {this.props.route.pathname === '/' ? <Subscribe /> : null}
      </header>
    )
  }
}

export default Header
