import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import R from 'ramda'

import SelectStreetModal from '../../components/SelectStreetModal'
import { registerValidation } from './validation'
import Api from '../App/api'

class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      phoneNr: '',
      verification: '',
      entered_verification: '',
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
    $('.ui.form').form(registerValidation)
    $('#register-form').submit(() => {
      const isFormValid = $('#register-form').form('is valid')
      if (isFormValid) {
        this.props.onSub(this.state)
      }
      return false
    })
    $('#verification-form').submit(() => {
      this.props.onVer(this.state)
      return false
    })
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

  handleChange (prop) {
    return (event) => {
      this.setState({ [prop]: event.target.value }) // eslint-disable-line
    }
  }

  render () {
    return (
      <div>
        <div id="verification-modal" className="ui modal">
          <div className="header">
            Bitte Bestätigungscode eingeben
          </div>
          <div className="content">
            <form id="verification-form" className="ui form">
              <div className="ui fluid input">
                <input type="text" placeholder="Bestätigungscode"
                       onChange={this.handleChange('entered_verification')}/>
              </div>
              <button className="ui button" type="submit">Bestätigen</button>
            </form>
          </div>
        </div>
        <SelectStreetModal onClick={this.handleAddress.bind(this)} />
        <form id="register-form" className="ui form">
          <label>Registrieren</label>
          <div className="field">
            <input onChange={this.handleChange('username')}
                   type="text" name="username" placeholder="Benutzername"/>
          </div>
          <div className="field">
            <input onChange={this.handleChange('password')}
                   type="password" name="password" placeholder="Passwort"/>
          </div>
          <div className="field">
            <input onChange={this.handleChange('phoneNr')}
                   type="text" name="phoneNr" placeholder="Telefonnummer"/>
          </div>
          <div className="ui action field">
            <label>Adresse?</label>
            <input type="text" name="location" value={this.state.address.name}/>
            <div className="ui buttons">
              <button onClick={this.handleGps('MAP')} className="ui button">Straße</button>
              <div className="or" data-text="or"></div>
              <button onClick={this.handleGps('AUTOMATIC')} className="ui positive button">Automatisch</button>
            </div>
          </div>
          <button className="ui button" type="submit">Abschicken</button>
          <div className="ui error message"></div>
        </form>
      </div>
    )
  }

}

RegisterPage.propTypes = {
  onSub: PropTypes.func.isRequired,
  onVer: PropTypes.func.isRequired
}
const mapDispatchToProps = (dispatch) => ({
  onSub (state) {
    const payload = {
      phoneNr: state.phoneNr
    }
    Api.getVerificationCode(payload).then((json) => {
      state.verification = json.verification
    })
    $('#verification-modal').modal('show')
  },
  onVer (state) {
    if (state.verification === state.entered_verification) {
      const payload = {
        username: state.username,
        password: state.password,
        phoneNr: state.phoneNr,
        location: `${state.address.coords.latitude},${state.address.coords.longitude}`
      }
      fetch('http://localhost:8000/api/users/', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: new Headers({'Content-Type': 'application/json'})
      })
      $('#verification-modal').modal('hide')
      browserHistory.push('/login')
    }
  }
})

const mapStateToProps = (state) => ({
  isLoggedIn: Boolean(R.path(['global', 'user', 'data'], state))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)
