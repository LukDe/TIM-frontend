import React, { PropTypes } from 'react'

function OthersListItem (props) {
  const {
    username,
    misc,
    creationDate,
    postalCode,
    catastrophe
  } = props
  return (
    <div className="item">
      <img className="ui avatar image" src={require('../../img/food.svg')} alt="food"/>
      <div className="content">
        <div className="header">{username}</div>
        <div className="meta">{catastrophe} | {creationDate.toLocaleDateString()} | {postalCode}</div>
        <div className="description">
          {misc === 'NULL' ? '' : misc}
        </div>
        <div className="extra">
        </div>
      </div>
    </div>
  )
}

OthersListItem.propTypes = {
  misc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  goodName: PropTypes.string.isRequired,
  creationDate: PropTypes.object.isRequired,
  postalCode: PropTypes.string.isRequired,
  catastrophe: PropTypes.string.isRequired
}

export default OthersListItem
