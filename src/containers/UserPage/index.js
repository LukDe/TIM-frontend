
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { userValidation } from './validation'

class UserPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: this.props.userData,
      password: this.props.userPass,
      mobile: this.props.userTel,
      email: this.props.userMail,
      postalCode: "Work in Progress",
      labelText: this.props.userData,
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


  render (props) {
    return (
      <form id="user-form" className="ui form">
        <div className="field">
          <label><h2>{this.props.userData}</h2></label>
        </div>

        <div className="field">
          <label>Passwort</label>
          <input onChange={this.handleChange('password')}
                 type="password" name="password" value={this.state.password}/>
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

        <div className="field">
          <label>Adresse</label>
          <input onChange={this.handleChange('postalCode')}
                 type="text" name="postalCode" value={this.state.postalCode} />
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
  userPass: PropTypes.string.isRequired,
  userTel: PropTypes.string.isRequired,
  userMail: PropTypes.string.isRequired,
  userPostal: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onSub (state) {
    const payload = {
        username: state.username,
        password: state.password,
        phoneNr: state.mobile,
        email: state.email,
        location: state.postalCode
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
  userPass: R.path(['global', 'user', 'data', 'password'], state),
  userTel: R.path(['global', 'user', 'data', 'phoneNr'], state),
  userMail: R.path(['global', 'user', 'data', 'email'], state),
  userPostal: R.path(['global', 'user', 'data', 'address'], state)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)
