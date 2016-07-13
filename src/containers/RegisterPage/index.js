import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import R from 'ramda'

import SelectStreetModal from '../../components/SelectStreetModal'
import VerificationModal from '../../components/VerificationModal'
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
      address: {
        name: '',
        coords: {
          latitude: '',
          longitude: ''
        }
      },
      showStreetModal: false,
      showVerificationModal: false
    }
  }

  componentDidMount () {
    $('.ui.form').form(registerValidation)
    $('#register-form').submit(() => {
      const isFormValid = $('#register-form').form('is valid')
      if (isFormValid) {
        this.openModal('VERIFICATION')
        this.props.onSub(this.state)
      }
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
      },
      showStreetModal: false
    })
  }

  handleGps (selection) {
    return (event) => {
      event.preventDefault()
      switch (selection) {
        case 'MAP':
          this.openModal('STREET')
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

  openModal (name) {
    if (name === 'STREET') {
      this.setState({ showStreetModal: true }) // eslint-disable-line
    } else if (name === 'VERIFICATION') {
      this.setState({ showVerificationModal: true }) // eslint-disable-line
    }
  }

  closeModal (name) {
    if (name === 'STREET') {
      this.setState({ showStreetModal: false }) // eslint-disable-line
    } else if (name === 'VERIFICATION') {
      this.setState({ showVerificationModal: false }) // eslint-disable-line
    }
  }

  render () {
    return (
      <div>
        {this.state.showVerificationModal
          ? (<VerificationModal onVer={this.props.onVer(this.state)}
                                onLeave={this.closeModal.bind(this, 'VERIFICATION')} />)
          : ''}

        {this.state.showStreetModal
          ? (<SelectStreetModal onClick={this.handleAddress.bind(this)}
                                onLeave={this.closeModal.bind(this, 'STREET')} />)
          : ''}

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
          <button type="submit" className="ui button">Abschicken</button>
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
    Api.getVerificationCode(payload).then((json) =>
      state.verification = json.verification
    )
  },
  onVer (state) {
    return (enteredVerification) => {
      if (state.verification === enteredVerification) {
        const payload = {
          username: state.username,
          password: state.password,
          phoneNr: state.phoneNr,
          location: `${state.address.coords.latitude},${state.address.coords.longitude}`
        }
        Api.createUser(payload)
        browserHistory.push('/login')
      }
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
