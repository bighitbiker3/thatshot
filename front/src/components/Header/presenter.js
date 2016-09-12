import React from 'react';
import SignUp from './SignUp'
import Login from './Login';
import Submission from './Submission'
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

    //


    return (
      <header className="header">
        <h1>That's Hot</h1>
        <div className="header-right">
          { this.props.auth.user ? <div><p>Hello {this.props.auth.user.firstName} </p> <button onClick={() => this.props.showSubmission()}>Submit Tune</button><button onClick={() => this.props.logout()}>Logout</button></div> : <div> <button onClick={() => this.props.showSignUp()}>Show SignUp</button>
          <button onClick={() => this.props.showLogin()}>Show Login</button><button onClick={() => this.props.showSubmission()}>Submit Tune</button> </div> }
        </div>
        {input}
        {this.props.header.active ? <button onClick={() => this.props.closeHeader()}>Close</button> : null}
      </header>
    )
  }
}

export default Header;
