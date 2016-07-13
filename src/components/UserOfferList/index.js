import React, { Component, PropTypes } from 'react'
import UserOfferListItem from '../UserOfferListItem'
import R from 'ramda'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import functions from '../../utils/functions'
import * as AC from '../../actions/offer'
import UserOfferModal from '../UserOfferModal'


class UserOfferList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  onDelete (offerId) {
    functions.deleteRequest(offerId)
    toastr.success('Gebot erfolgreich gelöscht!')
    setTimeout(() => {
      props.dispatch(AC.offersFetch())
    }, 500)
  }

  onEdit (offerId) {
    console.log(offerId)
    this.setState({ showModal: true })
  }

  render () {
    return(
      <div>
        {this.state.showModal
          ? (<UserRequestModal />)
          : ''}

       <div className="ui big middle aligned very relaxed selection divided list">
         {this.props.offers
           .filter((off) => off.username === this.props.username)
           .map((off) =>
              (<UserOfferListItem
                key={off.id}
                username={off.username}
                creationDate={new Date(off.creationDate)}
                goodName={off.goodName}
                misc={off.misc}
                offerID={off.id}/>))}
                onDelete={this.onDelete.bind(this)}
                onEdit={this.onEdit.bind(this)}/>))}
        </div>
      </div>
    )
  }
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
