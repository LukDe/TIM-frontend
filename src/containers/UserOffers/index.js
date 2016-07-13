import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import UserOfferList from '../UserOfferList'

const UserOffers = ({ offers, isFetching, fetchError }) => {
  let content
  if (isFetching) {
    content = (<i className="notched circle loading icon"></i>)
  } else if (fetchError) {
    content = (<h3>Error while loading the offers :(</h3>)
  } else {
    content = (<UserOfferList offers={offers} />)
  }
  return (<div>{content}</div>)
}

UserOffers.propTypes = {
  offers: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool
}

const mapStateToProps = (state) => ({
  offers: R.path(['offer', 'data'], state),
  isFetching: R.path(['offer', 'isFetching'], state),
  fetchError: R.path(['offer', 'error'], state)
})

export default connect(mapStateToProps, null)(UserOffers)
