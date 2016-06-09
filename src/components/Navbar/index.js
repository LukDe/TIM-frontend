import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

import './styles.css'

class Navbar extends Component {
  componentDidMount () {
    // Once the component is initially rendered,
    // activate the dropdown.
    $('.ui.dropdown').dropdown()
  }

  componentDidUpdate () {
    $('.ui.dropdown').dropdown()
  }

  render () {
    const { selection, onClick, username, onLogout } = this.props
    const rightContent = username
      ? (<div className="ui dropdown item">
           <i className="user icon"></i>
           {username}
           <div className="menu">
             <a className="item">Settings</a>
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
          <Link to="/" onClick={() => onClick('RANKING')}
                className={`green item ${selection === 'RANKING' ? 'active' : ''}`}>
            <i className="feed icon" />
            Ranking
          </Link>
          <Link to="/request" onClick={() => onClick('REQUEST')}
                className={`green item ${selection === 'REQUEST' ? 'active' : ''}`}>
            <i className="flag icon" />
            Request
          </Link>
          <Link to="/offer" onClick={() => onClick('OFFER')}
                className={`green item ${selection === 'OFFER' ? 'active' : ''}`}>
            <i className="doctor icon" />
            Offer
          </Link>
          <div className="right menu">
            {rightContent}
          </div>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  selection: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  username: PropTypes.string,
  onLogout: PropTypes.func
}

export default Navbar
