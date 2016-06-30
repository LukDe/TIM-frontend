import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import MainCategories from '../../components/MainCategories'
import OtherCategories from './../OtherCategories'
import { GLOBAL_FETCH_REQUESTS } from '../../constants/global'
import { OFFERS_FETCH } from '../../constants/offer'
import CircleSearch from '../../components/CircleSearch'
import './styles.css'

class HomePage extends Component {
  // Whenever the component will be rendered, fetch the requests from the api,
  // so it can be later rendered.
  componentWillMount () {
    this.props.dispatch({ type: GLOBAL_FETCH_REQUESTS })
    this.props.dispatch({ type: OFFERS_FETCH })

  }

  render () {
    return (
      <div className="ui container home-page-top-spacing">
        <h1 className="ui block header">Umkreis</h1>
        <CircleSearch/>
        <p> </p>
        <h1 className="ui block header">Hauptkategorien</h1>
        <MainCategories />
        <h1 className="ui block header">Andere Anfrage</h1>
        <OtherCategories />
      </div>
    )
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(HomePage)
