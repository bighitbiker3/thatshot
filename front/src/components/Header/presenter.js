import React from 'react'
import SignUp from './SignUp'
import Login from './Login'
import Overlay from './Overlay'
import Subscribe from './Subscribe'
import { Link } from 'react-router'
var input

class Header extends React.Component {
  componentWillMount () {
    this.props.getSession()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.route.pathname === '/' && !nextProps.header.active && !nextProps.auth.user.id) this.props.getSession()
  }

  render () {
    const { header, auth } = this.props
    // Header Input show
    if (header.show === 'login') input = <Login />
    else if (header.show === 'signup') input = <SignUp />
    else input = null


    const renderHeader = () => {
      if (auth.user.id) {
        return (
          <div>
            <Link to={`/me`}><p>Hi {auth.user.username}</p></Link>
            <p onClick={() => this.props.logout()}>Logout</p>
          </div>
        )
      } else if (!auth.user.id && !header.active) {
        return <p onClick={() => this.props.logout()}>Login</p>
      }
      return null
    }

    return (
      <header style={header.active ? {color: 'white'} : {color: 'black'}} className='header'>
      <Overlay />
        <div className='brand-div'>
          <Link to={`/`}><h1 className='brand'>That's Hot</h1></Link>
        </div>

        <div className='header-right'>
          {renderHeader()}
        </div>
        <div className='header-input'>
        {input}
        </div>
        <div style={header.active ? {color: 'white'} : {color: 'black'}} className='header-message'>
          <h2>🔥 tunes from Soundcloud artists with fewer than 15K followers - every damn day</h2>
        </div>
      </header>
    )
  }
}

export default Header
