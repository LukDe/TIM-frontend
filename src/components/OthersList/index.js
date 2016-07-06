import React, { PropTypes } from 'react'
import OthersListItem from '../OthersListItem'
import R from 'ramda'
import { connect } from 'react-redux'

function OthersList ({ requests }) {
  return (
    <div className="ui big middle aligned very relaxed selection divided list">
      {requests
        .filter((req) => req.goodName === 'other' && req.active === true)
        .map((req) =>
          (<OthersListItem
                key={req.id}
                username={req.username}
                creationDate={new Date(req.creationDate)}
                misc={req.misc}
				requestID={req.id}/>))}
    </div>
  )
}

OthersList.propTypes = {
  requests: PropTypes.array,
  offusername: PropTypes.string
}

const mapStateToProps = (state) => ({
  offusername: R.path(['global', 'user', 'data', 'username'], state)
})

export default connect (
  mapStateToProps
)(OthersList)
