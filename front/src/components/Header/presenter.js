import React from 'react';
import SignUp from './SignUp'
import Login from './Login';
import Submission from './Submission'
import Overlay from './Overlay'
var input;

class Header extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.getSession()
  }

  render(){
    //Header Input show
    if(this.props.header.show === 'login') input = <Login />
    else if( this.props.header.show === 'signup') input = <SignUp />
    else if(this.props.header.show === 'submission') input = <Submission />
    else input = null;

    return (
      <header className="header">
      <Overlay />
        <div className="brand-div">
          <h1 className="brand">That's Hot</h1>
        </div>

        <div className="header-right">
          { this.props.auth.user ? <div><p>Hello {this.props.auth.user.firstName} Score: {this.props.auth.user.score} </p> <p onClick={() => this.props.showSubmission()}>Submit Tune</p><p onClick={() => this.props.logout()}>Logout</p></div> : <div> <p onClick={() => this.props.showSignUp()}>Sign Up</p> <p onClick={() => this.props.showLogin()}>Login</p></div> }
        </div>
        <div className="header-input">
        {input}
        {this.props.header.active ? <button onClick={() => this.props.closeHeader()}>Close</button> : null}
        </div>
        <div className="header-message">
          <h2>The top 15 songs from Soundcloud users with fewer than 15K followers, every day</h2>
        </div>
      </header>
    )
  }
}

export default Header;
