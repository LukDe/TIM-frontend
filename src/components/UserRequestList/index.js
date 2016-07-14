import React, { PropTypes } from 'react'
import UserRequestListItem from '../UserRequestListItem'
import R from 'ramda'
import { connect } from 'react-redux'

function UserRequestList (props) {
  return (
    <div className="ui big middle aligned very relaxed selection divided list">
      {props.requests
        .filter((req) => req.username === props.username )
        .map((req) =>
          (<UserRequestListItem
            key={req.id}
            username={req.username}
            creationDate={new Date(req.creationDate)}
            goodName={req.goodName}
            misc={req.misc}
            requestID={req.id}
          	active={req.active}/>))}
    </div>
  )
}

UserRequestList.propTypes = {
  requests: PropTypes.array,
  username: PropTypes.string
}

const mapStateToProps = (state) => ({
  isLoggedIn: Boolean(R.path(['global', 'user', 'data'], state)),
  requests: R.path(['global', 'requests', 'data'], state),
  username: R.path(['global', 'user', 'data', 'username'], state)
})

export default connect(
  mapStateToProps
)(UserRequestList)
