import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './styles.css'

class MainCategories extends Component {
  componentDidMount () {
    $('.ui.dimmer').css('background-color', 'rgba(0, 0, 0, 0.3)')
    // $('.ui.dimmer h2').css('color', '#03FF7E')
    $('.ui.dimmer').dimmer({
      on: 'hover'
    })
  }

  render () {
    const { requests, isFetching, requestsError } = this.props
    const getTotals = (goodName) => R.pipe(
      R.filter((req) => req.goodName === goodName),
      R.reduce((acc, elem) => acc + elem.quantity, 0)
    )
    return (
      <div className="ui link cards main-categories-cards-container">
        <div className="card main-categories-card">
          <div className="ui small image">
            <img src={require('../../img/water.svg')} />
          </div>
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <h2 className="ui inverted icon header">
                  {isFetching || requestsError ? '' : getTotals('water')(requests)}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="card main-categories-card">
          <div className="ui small image">
            <img src={require('../../img/clothes.svg')} />
          </div>
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <h2 className="ui inverted icon header">
                  {isFetching || requestsError ? '' : getTotals('clothes')(requests)}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="card main-categories-card">
          <div className="ui small image">
            <img src={require('../../img/woundcare.svg')} />
          </div>
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <h2 className="ui inverted icon header">
                  {isFetching || requestsError ? '' : getTotals('woundcare')(requests)}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="card main-categories-card">
          <div className="ui small image">
            <img src={require('../../img/accomodation.svg')} />
          </div>
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <h2 className="ui inverted icon header">
                  {isFetching || requestsError ? '' : getTotals('accomodation')(requests)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MainCategories.propTypes = {
  requests: PropTypes.array,
  isFetching: PropTypes.bool,
  requestsError: PropTypes.bool
}

const mapStateToProps = (state) => ({
  requests: R.path(['global', 'requests', 'data'], state),
  isFetching: R.path(['global', 'requests', 'isFetching'], state),
  requestsError: R.path(['global', 'requests', 'error'], state)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MainCategories)
