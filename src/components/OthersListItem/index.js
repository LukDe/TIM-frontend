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
      <img className="ui avatar image" src={require('../../img/other.svg')} alt="others"/>
      <div className="content">
        <div className="header">{username}</div>
        <div className="meta">{creationDate.toLocaleDateString()}</div>
        <div className="description">
          {misc === 'NULL' ? '' : misc}
        </div>
        <div className="extra">
        </div>
      </div>
      <div className="react">
        <button type="button">Reagieren</button>
      </div>

    </div>

  )
}

OthersListItem.propTypes = {
  misc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  goodName: PropTypes.string.isRequired,
  creationDate: PropTypes.object.isRequired
}

export default OthersListItem
