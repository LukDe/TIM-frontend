import React, { PropTypes } from 'react'
import UserOfferListItem from '../UserOfferListItem'
import R from 'ramda'
import { connect } from 'react-redux'

function UserOfferList (props) {
  return (
    <div className="ui big middle aligned very relaxed selection divided list">
      {props.offers
        .filter((req) => req.username === props.username )
        .map((req) =>
          (<UserOfferListItem
            key={req.id}
            username={req.username}
            creationDate={new Date(req.creationDate)}
            goodName={req.goodName}
            misc={req.misc}
            offerID={req.id}/>))}
    </div>
  )
}

UserOfferList.propTypes = {
  offers: PropTypes.array,
  username: PropTypes.string
}

const mapStateToProps = (state) => ({
  isLoggedIn: Boolean(R.path(['global', 'user', 'data'], state)),
  offers: R.path(['offer', 'data'], state),
  username: R.path(['global', 'user', 'data', 'username'], state)
})

export default connect(
  mapStateToProps
)(UserOfferList)
