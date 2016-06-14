import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import Navbar from '../../components/Navbar'
import { navbarSelect } from '../../actions/navbar'
import { userLogout } from '../../actions/global'

class TimNavbar extends Component {
  render () {
    const { selection, onClick, onLogout, username } = this.props
    return (
      <Navbar selection={selection} onLogout={onLogout} onClick={onClick} username={username} />
    )
  }
}

TimNavbar.propTypes = {
  selection: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  username: PropTypes.string,
  onLogout: PropTypes.func
}

function stateToProps (state) {
  return {
    selection: R.path(['navbar', 'selection'], state),
    username: R.path(['global', 'user', 'data', 'username'], state)
  }
}

function dispatchToProps (dispatch) {
  return {
    onClick (selection) {
      dispatch(navbarSelect(selection))
    },
    onLogout () {
      dispatch(navbarSelect('LOGIN'))
      dispatch(userLogout())
    }
  }
}

export default connect(
  stateToProps,
  dispatchToProps
)(TimNavbar)
