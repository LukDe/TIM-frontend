import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const NavbarItem = ({ to, icon, onClick, selected, name }) =>
  <Link to={to} onClick={() => onClick()}
        className={`green item ${selected ? 'active' : ''}`}>
    <i className={`${icon} icon`} />
    {name}
  </Link>

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool
}

export default NavbarItem
