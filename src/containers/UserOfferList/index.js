import React, { Component, PropTypes } from 'react'
import UserOfferListItem from '../../components/UserOfferListItem'
import R from 'ramda'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import functions from '../../utils/functions'
import * as AC from '../../actions/offer'
import UserOfferModal from '../../components/UserOfferModal'


class UserOfferList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      offerID: ''
    }
  }

  onDelete (offerId) {
    functions.deleteOffer(offerId)
    toastr.success('Gebot erfolgreich gelöscht!')
    setTimeout(() => {
      this.props.dispatch(AC.offersFetch())
    }, 500)
  }

  onEdit (offerId) {
    console.log(offerId)
    this.setState({ showModal: true })
    this.setState({ offerID: offerId })
  }

  render () {
    return(
      <div>
        {this.state.showModal
          ? (<UserOfferModal
          offerID={this.state.offerID}
          username={this.props.username}
          goodName={this.props.offers.filter((off) => off.id === this.state.offerID)[0].goodName}
          active={this.props.offers.filter((off) => off.id === this.state.offerID)[0].active}
          misc={this.props.offers.filter((off) => off.id === this.state.offerID)[0].misc}
          quantity={this.props.offers.filter((off) => off.id === this.state.offerID)[0].quantity}
          priority={this.props.offers.filter((off) => off.id === this.state.offerID)[0].priority}
          location={this.props.offers.filter((off) => off.id === this.state.offerID)[0].location}
          radius={this.props.offers.filter((off) => off.id === this.state.offerID)[0].radius}
          creationDate={this.props.offers.filter((off) => off.id === this.state.offerID)[0].creationDate}
        />)
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
                offerID={off.id}
                onDelete={this.onDelete.bind(this)}
                onEdit={this.onEdit.bind(this)}
          />))}
        </div>
      </div>
    )
  }
}

UserOfferList.propTypes = {
  offers: PropTypes.array,
  username: PropTypes.string,
  offerID: PropTypes.number
}

const mapStateToProps = (state) => ({
  isLoggedIn: Boolean(R.path(['global', 'user', 'data'], state)),
  offers: R.path(['offer', 'data'], state),
  username: R.path(['global', 'user', 'data', 'username'], state)
})

export default connect(
  mapStateToProps
)(UserOfferList)
