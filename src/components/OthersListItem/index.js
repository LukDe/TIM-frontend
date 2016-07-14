import React, { PropTypes } from 'react'
import functions from '../../utils/functions'
import R from 'ramda'
import { connect } from 'react-redux'

function OthersListItem (props) {
  const {
    offusername,
    requestID,
    username,
    misc,
    creationDate
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
        <button onClick={functions.initiateContact.bind(null,requestID,offusername)} type="button">Reagieren</button>
		<label> <output id="test"></output></label>
      </div>

    </div>

  )
}

OthersListItem.propTypes = {
  requestID: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  misc: PropTypes.string.isRequired,
  creationDate: PropTypes.object.isRequired,
  offusername: PropTypes.string
}

const mapStateToProps = (state) => ({
  offusername: R.path(['global', 'user', 'data', 'username'], state)
})

export default connect(
  mapStateToProps
)(OthersListItem)




