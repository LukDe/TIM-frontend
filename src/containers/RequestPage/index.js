import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import R from 'ramda'

import { userLogin } from '../../actions/global'
import { navbarSelect } from '../../actions/navbar'
import { offerValidation } from './validation'



class RequestPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username : this.props.userData,
      goodName : '',
      misc : '',
      quantity : '',
      range : '',
      postalCode : '',
      priority : ''
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
      this.setState({ [prop]: event.target.value })
    }
  }

  render () {
    return(
        <form id="offer-form" className="ui form">
          <div className="fields">
            <label>Was wollen sie Anbieten?</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')}
                       type="radio" name="goodName" value="food"/>
                <label><img src={require('../../img/food.png')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')}
                       type="radio" name="goodName" value="water"/>
                <label><img src={require('../../img/water.png')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')}
                       type="radio" name="goodName" value="woundcare"/>
                <label><img src={require('../../img/woundcare.png')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')}
                       type="radio" name="goodName" value="accomodation"/>
                <label><img src={require('../../img/accomodation.png')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')}
                       type="radio" name="goodName" value="other"/>
                <label><img src={require('../../img/other.png')} className="image" /></label>
              </div>
            </div>
          </div>

          <div className="field">
            <label>Was?</label>
            <input onChange={this.handleChange('misc')}
                   type="text" name="misc" placeholder="Was benötigen Sie?"/>
          </div>

          <div className="field">
            <label>Wieviel?</label>
            <input onChange={this.handleChange('quantity')}
                   type="text" name="quantity" placeholder="Anzahl"/>
          </div>

          <div className="field">
            <label>Wo?</label>
            <input onChange={this.handleChange('postalCode')}
                   type="text" name="postalCode" placeholder="Postleitzahl"/>
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
        </form>)
  }

}

RequestPage.propTypes = {
  onSub: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  onSub (payload) {
    console.log(payload)
    fetch('http://localhost:8000/api/requests/', {
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
)(RequestPage)