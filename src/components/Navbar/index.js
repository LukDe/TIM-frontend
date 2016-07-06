import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import NavbarItem from '../NavbarItem'

import './styles.css'

class Navbar extends Component {
  componentDidMount () {
    // Once the component is initially rendered,
    // activate the dropdown.
    $('.ui.dropdown').dropdown()
  }

  componentDidUpdate () {
    // When the component is again updated, activates again the dropdown.
    // This is necessary when the user logs in and the login button disappears.
    $('.ui.dropdown').dropdown()
  }

  render () {
    const { selection, onClick, username, onLogout } = this.props
    const rightContent = username
      ? (<div className="ui dropdown item">
           <i className="user icon"></i>
           {username}
           <div className="menu">
             <Link to="/userLists" onClick={() => onClick('USERLISTS')} className="item">Meine Angebote und Gesuche</Link>
             <Link to="/user" onClick={() => onClick('USER')} className="item">Einstellungen</Link>
             <Link to="/login" onClick={() => onLogout()} className="item">Log-out</Link>
           </div>
        </div>)
      : (<div className="item">
          <Link to="/login" onClick={() => onClick('LOGIN')}
                className="ui inverted green button navbar-login-button">
            Login
          </Link>
        </div>)

    return (
      <div>
        <div className="ui labeled icon top fixed menu navbar-container">
          <div className="item">
            <img className="navbar-tim-icon" src={require('../../img/tim_gradient.svg')} />
          </div>
          <NavbarItem to="/" icon="line chart"
                      onClick={() => onClick('RANKING')}
                      selected={selection === 'RANKING'}
                      name='Ranking' />
          <NavbarItem to="/request" icon="search"
                      onClick={() => onClick('REQUEST')}
                      selected={selection === 'REQUEST'}
                      name='Suchen' />
          <NavbarItem to="/offer" icon="send"
                      onClick={() => onClick('OFFER')}
                      selected={selection === 'OFFER'}
                      name='Bieten' />
          <div className="right menu">
            {rightContent}
          </div>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  selection: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  username: PropTypes.string,
  onLogout: PropTypes.func
}

export default Navbar
