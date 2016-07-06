import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import UserRequests from './../UserRequests'
import UserOffers from './../UserOffers'
import Footer from './../Footer'
import { GLOBAL_FETCH_REQUESTS } from '../../constants/global'

import './styles.css'

class UserListsPage extends Component {
  // Whenever the component will be rendered, fetch the requests from the api,
  // so it can be later rendered.
  componentWillMount () {
    this.props.dispatch({ type: GLOBAL_FETCH_REQUESTS })
  }

  render () {
    return (
      <div className="ui container home-page-top-spacing">
        <h2 className="ui dividing header">Meine Gesuche</h2>
        <UserRequests />
        <h2 className="ui dividing header">Meine Angebote</h2>
        <UserOffers />
        <Footer />
      </div>
    )
  }
}

UserListsPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(UserListsPage)
