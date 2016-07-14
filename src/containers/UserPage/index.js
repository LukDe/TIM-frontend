import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import SelectStreetModal from '../../components/SelectStreetModal'
import Api from '../../containers/App/api'

import { userValidation } from './validation'

class UserPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: this.props.userData,
      password: 'Passwort',
      passwordTest: '',
      mobile: this.props.userTel,
      email: this.props.userMail,
      location: this.props.userLocation,
      radius: this.props.userRadius,
      labelText: this.props.userData,
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
    $('.ui.form').form(userValidation)
    $('#user-form').submit(() => {
      const isFormValid = $('#user-form').form('is valid')
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

  render (props) {
    return (
      <form id="user-form" className="ui form">
        <SelectStreetModal onClick={this.handleAddress.bind(this)} />
        <div className="field">
          <label><h2>{this.props.userData}s Daten bearbeiten</h2></label>
        </div>

        <div className="field">
          <label>Passwort</label>
          <input onChange={this.handleChange('password')}
                 type="password" name="password" value={this.state.password}/>
        </div>

        <div className="field">

          <label>Passwort wiederholen</label>
          <input onChange={this.handleChange('passwordTest')}
                 type="password" name="passwordTest" placeholder="Nur bei Änderung des Passworts notwendig"/>
        </div>

        <div className="field">
          <label>Telefonnummer</label>
          <input onChange={this.handleChange('mobile')}
                 type="text" name="mobile" value={this.state.mobile}/>
        </div>

        <div className="field">
          <label>E-Mail</label>
          <input onChange={this.handleChange('email')}
                 type="text" name="email" value={this.state.email}/>
        </div>

        <div className="ui action field">
          <label>Aktueller Standpunkt</label>
          <input type="text" name="location" value={this.state.address.name}/>
          <div className="ui buttons">
            <button onClick={this.handleGps('MAP')} className="ui button">Straße</button>
            <div className="or" data-text="or"></div>
            <button onClick={this.handleGps('AUTOMATIC')} className="ui positive button">Automatisch</button>
          </div>
        </div>

        <div className="field">
          <label>Bewegungsradius</label>
          <input onChange={this.handleChange('radius')}
                 type="text" name="radius" value={this.state.radius} />
        </div>

        <button className="ui button" type="submit">Speichern</button>
        <div className="ui error message"></div>
      </form>)
  }
}

UserPage.propTypes = {
  onSub: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.string.isRequired,
  userTel: PropTypes.string.isRequired,
  userMail: PropTypes.string.isRequired,
  userLocation: PropTypes.string.isRequired,
  userRadius: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onSub (state) {
    const payload = {
        username: state.username,
        phoneNr: state.mobile,
        email: state.email,
        location: state.location,
        radius: state.radius
    }
    console.log(payload)
    fetch('http://localhost:8000/api/users/'+state.username, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    // browserHistory.push('/login')
  }
})

const mapStateToProps = (state) => ({
  isLoggedIn: Boolean(R.path(['global', 'user', 'data'], state)),
  userData: R.path(['global', 'user', 'data', 'username'], state),
  userTel: R.path(['global', 'user', 'data', 'phoneNr'], state),
  userMail: R.path(['global', 'user', 'data', 'email'], state),
  userLocation: R.path(['global', 'user', 'data', 'location'], state),
  userRadius: R.path(['global', 'user', 'data', 'radius'], state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)
