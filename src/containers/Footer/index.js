import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { NAVBAR_SELECT } from '../../constants/navbar'

const Footer = ({ onClick }) =>
  <div className="ui container footer-center">
      <Link className="" onClick={onClick} to="/impressum">Impressum</Link>
  </div>

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch({ type: NAVBAR_SELECT, selection: 'IMPRESSUM' })
})

Footer.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Footer)
