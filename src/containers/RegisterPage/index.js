import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import R from 'ramda'

import { navbarSelect } from '../../actions/navbar'
import { registerValidation } from './validation'

class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      phoneNr: '',
      location: ''
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
  }

  handleChange (prop) {
    return (event) => {
      this.setState({ [prop]: event.target.value }) // eslint-disable-line
    }
  }
  render () {
    return (
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
          <div className="field">
            <input onChange={this.handleChange('location')}
                   type="text" name="location" placeholder="Ort"/>
          </div>
          <button className="ui button" type="submit">Abschicken</button>
          <div className="ui error message"></div>
        </form>)
  }

}

RegisterPage.propTypes = {
  onSub: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onSub (payload) {
    console.log(payload)
    fetch('http://localhost:8000/api/users/', {
      method: "POST",
      body: JSON.stringify(payload),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    browserHistory.push('/login')
  }
})

const mapStateToProps = (state) => ({
  isLoggedIn: Boolean(R.path(['global', 'user', 'data'], state)),
  userData: R.path(['global', 'user', 'data', 'userame'], state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)