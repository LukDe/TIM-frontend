import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import MainCategories from '../../components/MainCategories'
import OtherCategories from './../OtherCategories'
import { GLOBAL_FETCH_REQUESTS } from '../../constants/global'

import './styles.css'

class HomePage extends Component {
  // Whenever the component will be rendered, fetch the requests from the api,
  // so it can be later rendered.
  componentWillMount () {
    this.props.dispatch({ type: GLOBAL_FETCH_REQUESTS })
  }

  render () {
    return (
      <div className="ui container home-page-top-spacing">
        <MainCategories />
        <h2 className="ui dividing header">Others</h2>
        <OtherCategories />
      </div>
    )
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(HomePage)
