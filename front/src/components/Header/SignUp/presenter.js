import React from 'react';
import ReactDOM from 'react-dom';


class SignUp extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
    return (
        <div className="signup">
          <p>Sign Up</p>
            <input onChange={this.props.signUpEmailFormChange} ref="email" type="email"/>
            <input onChange={this.props.signUpPasswordFormChange} ref="password" type="password"/>
            <button onClick={() => this.props.signUpSubmit(this.props.signup.email, this.props.signup.password)}>Submit</button>
        </div>
    )
  }
}

export default SignUp;
