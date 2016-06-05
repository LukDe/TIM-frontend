import React, { Component } from 'react'

import { loginValidation } from './validation'

import './styles.css'

class LoginPage extends Component {
  componentDidMount () {
    $('.ui.form').form(loginValidation)
  }

  render () {
    return (
      <div className="ui middle aligned center aligned grid login-page-container">
        <div className="six wide column">
          <img src={require('../../img/tim_gradient.svg')} className="image" />
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input type="text" name="email" placeholder="E-mail address" />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input type="password" name="password" placeholder="Password" />
                </div>
              </div>
              <div className="ui fluid large green submit button">Login</div>
            </div>

            <div className="ui error message"></div>
          </form>

          <div className="ui message">
            First time using Tim? <a href="#">Sign Up</a>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
