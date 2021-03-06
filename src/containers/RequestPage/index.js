import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import SelectStreetModal from '../../components/SelectStreetModal'
import * as AC from '../../actions/request'
import { requestValidation } from './validation'
import Api from '../App/api'

class RequestPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: this.props.userData,
      goodName: '',
      misc: '',
      active: true,
      quantity: '-1',
      range: '',
      postalCode: '',
      priority: '',
      address: {
        name: '',
        coords: {
          latitude: '',
          longitude: ''
        }
      },
      labelText: "Wie viel Liter Wasser brauchen Sie?",
      placeholderText: "Liter",
      miscHidden: true,
      showModal: false
    }
  }

  componentDidMount () {
    $('.ui.form').form(requestValidation)
    $('#offer-form').submit(() => {
      const isFormValid = $('#offer-form').form('is valid')
      if (isFormValid) {
        this.props.onSub(this.state)
      }
      return false
    })
  }

  handleChange (prop) {
    return (event) => {
      this.setState({ [prop]: event.target.value }) // eslint-disable-line
    }
  }

  handleAddress (address) {
    this.setState({ // eslint-disable-line
      address: {
        name: address.formatted_address,
        coords: {
          latitude: address.geometry.location.lat,
          longitude: address.geometry.location.lng
        }
      },
      showModal: false
    })
  }

  handleGps (selection) {
    return (event) => {
      event.preventDefault()
      switch (selection) {
        case 'MAP':
          this.setState({ showModal: true }) // eslint-disable-line
          break

        case 'AUTOMATIC':
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords
              Api.reverseGeocode(latitude, longitude)
                .then((json) => {
                  this.setState({ // eslint-disable-line
                    address: {
                      name: json.results[0].formatted_address,
                      coords: { latitude, longitude }
                    }
                  })
                })
            })
          } else {
            console.err('Browser does not support the geolocation functionality')
          }
          break
      }
    }
  }

  labelUpdater (cat) {
    switch (cat) {
      case "water":
        return (event) => {
          this.setState({labelText: 'Wie viel Liter Wasser brauchen Sie?', placeholderText: 'Liter', miscHidden: true}) // eslint-disable-line
        }
      case "food":
        return (event) => {
          this.setState({labelText: 'Wie viele Mahlzeiten brauchen Sie?', placeholderText: 'Mahlzeiten', miscHidden: true}) // eslint-disable-line
        }
      case "woundcare":
        return (event) => {
          this.setState({labelText: 'Wie viele Verbandskästen brauchen Sie?', placeholderText: 'Verbandskästen', miscHidden: true}) // eslint-disable-line
        }
      case "clothes":
        return (event) => {
          this.setState({labelText: 'Wie viele Kleidungen brauchen Sie?', placeholderText: 'Anzahl', miscHidden: true}) // eslint-disable-line
        }
      case "accomodation":
        return (event) => {
          this.setState({labelText: 'Wie viele Personen brauchen Unterkunft?', placeholderText: 'Personen', miscHidden: true}) // eslint-disable-line
        }
      case "other":
        return (event) => {
          this.setState({miscHidden: false}) // eslint-disable-line
        }
      default:
    }
  }

  closeModal () {
    this.setState({ showModal: false }) // eslint-disable-line
  }

  render () {
    return (
      <div>
        {this.state.showModal
          ? (<SelectStreetModal onClick={this.handleAddress.bind(this)}
                                onLeave={this.closeModal.bind(this)} />)
          : ''}
        <form id="offer-form" className="ui form">
          <div className="fields">
            <label>Was brauchen Sie?</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick={this.labelUpdater("water")}
                       type="radio" name="goodName" value="water"/>
                <label><img src={require('../../img/water.svg')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick={this.labelUpdater("food")}
                       type="radio" name="goodName" value="food"/>
                <label><img src={require('../../img/food.svg')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick={this.labelUpdater("woundcare")}
                       type="radio" name="goodName" value="woundcare"/>
                <label><img src={require('../../img/woundcare.svg')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick={this.labelUpdater("clothes")}
                       type="radio" name="goodName" value="clothes"/>
                <label><img src={require('../../img/clothes.svg')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick={this.labelUpdater("accomodation")}
                       type="radio" name="goodName" value="accomodation"/>
                <label><img src={require('../../img/accomodation.svg')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick ={this.labelUpdater("other")}
                       type="radio" name="goodName" value="other"/>
                <label><img src={require('../../img/other.svg')} className="image" /></label>
              </div>
            </div>
          </div>

          {this.state.miscHidden
             ? ''
             : (<div className="field hidden">
                 <label>Was?</label>
                 <input onChange={this.handleChange('misc')} id = "misc"
                   type="text" name="misc" placeholder= "Was brauchen sie?"/>
                </div>)
          }
          {this.state.miscHidden
            ? (<div className="field">
                <label>{this.state.labelText}</label>
                <input onChange={this.handleChange('quantity')}
                       type="text" name="quantity" placeholder={this.state.placeholderText}/>
              </div>)
            : ''
          }

          <div className="ui action field">
            <label>Wo?</label>
            <input type="text" name="location" value={this.state.address.name}/>
            <div className="ui buttons">
              <button onClick={this.handleGps('MAP')} className="ui button">Straße</button>
              <div className="or" data-text="or"></div>
              <button onClick={this.handleGps('AUTOMATIC')} className="ui positive button">Automatisch</button>
            </div>
          </div>

          <div className="field">
            <label>In welchem Umkreis?</label>
            <input onChange={this.handleChange('range')}
                   type="text" name="range" placeholder="Umkreis"/>
          </div>

          <div className="fields">
            <label>Dringlichkeit</label>
              <div className="field">
                <div className="ui radio checkbox">
                  <input onChange={this.handleChange('priority')}
                         type="radio" name="priority" value="1"/>
                  <label>1 Tag</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input onChange={this.handleChange('priority')}
                         type="radio" name="priority" value="2"/>
                  <label>2 Tage</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input onChange={this.handleChange('priority')}
                         type="radio" name="priority" value="3"/>
                  <label>3 Tage</label>
                </div>
              </div>
            </div>
          <button className="ui button" type="submit">Abschicken</button>
          <div className="ui error message"></div>
        </form>
      </div>
    )
  }
}

RequestPage.propTypes = {
  onSub: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onSub (state) {
    const payload = {
      username: state.username,
      goodName: state.goodName,
      misc: state.misc,
      quantity: state.quantity,
      radius: state.range,
      location: `${state.address.coords.latitude},${state.address.coords.longitude}`,
      priority: state.priority
    }
    dispatch(AC.requestNew(payload))
  }
})

const mapStateToProps = (state) => ({
  isLoggedIn: Boolean(R.path(['global', 'user', 'data'], state)),
  userData: R.path(['global', 'user', 'data', 'username'], state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestPage)
