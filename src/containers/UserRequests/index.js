import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import UserRequestList from '../UserRequestList'

const UserRequests = ({ requests, isFetching, fetchError }) => {
  let content
  if (isFetching) {
    content = (<i className="notched circle loading icon"></i>)
  } else if (fetchError) {
    content = (<h3>Error while loading the requests :(</h3>)
  } else {
    content = (<UserRequestList requests={requests} />)
  }
  return (<div>{content}</div>)
}

UserRequests.propTypes = {
  requests: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool
}

const mapStateToProps = (state) => ({
  requests: R.path(['global', 'requests', 'data'], state),
  isFetching: R.path(['global', 'requests', 'isFetching'], state),
  fetchError: R.path(['global', 'requests', 'error'], state)
})

export default connect(mapStateToProps, null)(UserRequests)
