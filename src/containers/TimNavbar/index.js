import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import Navbar from '../../components/Navbar'
import { navbarSelect } from '../../actions/navbar'

class TimNavbar extends Component {
  render () {
    const { selection, onClick } = this.props
    return (
      <Navbar selection={selection} onClick={onClick} />
    )
  }
}

TimNavbar.propTypes = {
  selection: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

function stateToProps (state) {
  return {
    selection: R.path(['navbar', 'selection'], state)
  }
}

function dispatchToProps (dispatch) {
  return {
    onClick (selection) {
      dispatch(navbarSelect(selection))
    }
  }
}

export default connect(
  stateToProps,
  dispatchToProps
)(TimNavbar)
