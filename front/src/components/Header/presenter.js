import React from 'react';
import SignUp from './SignUp'
import Login from './Login';
import Submission from './Submission'

class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <header className="header">
      <h1>That's Hot</h1>
      <Submission />
        {this.props.auth.user ? <p>Hello {this.props.auth.user.firstName} </p> : <div> <SignUp /> <Login /> </div> }
      </header>
    )
  }
}

export default Header;
