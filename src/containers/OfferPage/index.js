import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import R from 'ramda'

import SelectStreetModal from '../../components/SelectStreetModal'
import { navbarSelect } from '../../actions/navbar'
import { offerValidation } from './validation'
import Api from '../../containers/App/api'

class OfferPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      offer: {
        username: this.props.userData,
        goodName: '',
        misc: '',
        quantity: '',
        range: '',
        labelText: 'Wie viel Liter Wasser bieten Sie an?',
        placeholderText: "Liter"
      },
      address: {
        name: '',
        coords: {
          latitude: '',
          longitude: ''
        }
      }
    }
  }

  componentDidMount () {
    $('.ui.form').form(offerValidation)
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
      }
    })
    $('#select-street-modal').modal('hide')
  }

  handleGps (selection) {
    return (event) => {
      event.preventDefault()
      switch (selection) {
        case 'MAP':
          $('#select-street-modal').modal('show')
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
      case 'water':
        return (event) => this.setState({ // eslint-disable-line
          labelText: 'Wie viel Liter Wasser bieten Sie an?',
          placeholderText: 'Liter'
        })
      case 'food':
        return (event) => this.setState({ // eslint-disable-line
          labelText: 'Wie viele Mahlzeiten bieten Sie an?',
          placeholderText: 'Mahlzeiten'
        })
      case 'woundcare':
        return (event) => this.setState({ // eslint-disable-line
          labelText: 'Wie viele Verbandskästen bieten Sie an?',
          placeholderText: 'Verbandskästen'
        })
      case 'clothes':
        return (event) => this.setState({ // eslint-disable-line
          labelText: 'Wie viele Kleidungen bieten Sie an?',
          placeholderText: 'Anzahl'
        })
      case 'accomodation':
        return (event) => this.setState({ // eslint-disable-line
          labelText: 'Für wie viele Personen bieten Sie Unterkunft an?',
          placeholderText: 'Personen'
        })
    }
  }

  render () {
    return (
      <div>
        <SelectStreetModal onClick={this.handleAddress.bind(this)} />
        <form id="offer-form" className="ui form">
                    <div className="fields">
            <label>Was wollen Sie anbieten?</label>
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
          </div>
          <div className="field">
            <label>{this.state.labelText}</label>
            <input onChange={this.handleChange('quantity')}
                   type="text" name="quantity" placeholder={this.state.placeholderText}/>
          </div>
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
          <button className="ui button" type="submit">Abschicken</button>
          <div className="ui error message"></div>
        </form>
      </div>
    )
  }

}

OfferPage.propTypes = {
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
      range: state.range,
      postalCode: state.postalCode,
      priority: state.priority
    }
    fetch('http://localhost:8000/api/offers/', {
      method: "POST",
      body: JSON.stringify(payload),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    browserHistory.push('/')
    dispatch(navbarSelect('RANKING'))
  }
})

const mapStateToProps = (state) => ({
  isLoggedIn: Boolean(R.path(['global', 'user', 'data'], state)),
  userData: R.path(['global', 'user', 'data', 'userame'], state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferPage)
