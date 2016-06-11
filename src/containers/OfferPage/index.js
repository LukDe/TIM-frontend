import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import R from 'ramda'

import { navbarSelect } from '../../actions/navbar'
import { offerValidation } from './validation'

class OfferPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: this.props.userData,
      goodName: '',
      misc: '',
      quantity: '',
      range: '',
      postalCode: '',
      labelText: "Wie viel Liter Wasser brauchen Sie?",
      placeholderText: "Liter"
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

  labelUpdater (cat) {
    switch (cat) {
      case "water":
        return (event) => {
          this.setState({labelText : 'Wie viel Liter Wasser bieten Sie an?', placeholderText : 'Liter'}) // eslint-disable-line
        }
      case "food":
        return (event) => {
          this.setState({labelText : 'Wie viele Mahlzeiten bieten Sie an?', placeholderText : 'Mahlzeiten'}) // eslint-disable-line
        }
      case "woundcare":
        return (event) => {
          this.setState({labelText : 'Wie viele Verbandskästen bieten Sie an?', placeholderText : 'Verbandskästen'}) // eslint-disable-line
        }
      case "clothes":
        return (event) => {
          this.setState({labelText : 'Wie viele Kleidungen bieten Sie an?', placeholderText : 'Anzahl'}) // eslint-disable-line
        }
      case "accomodation":
        return (event) => {
          this.setState({labelText : 'Für wie viele Personen bieten Sie Unterkunft an?', placeholderText : 'Personen'}) // eslint-disable-line
        }
      default:
    }
  }
  render () {
    return (
        <form id="offer-form" className="ui form">
                    <div className="fields">
            <label>Was wollen sie Anbieten?</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick={this.labelUpdater("water")}
                       type="radio" name="goodName" value="water"/>
                <label><img src={require('../../img/water.png')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick={this.labelUpdater("food")}
                       type="radio" name="goodName" value="food"/>
                <label><img src={require('../../img/food.png')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick={this.labelUpdater("woundcare")}
                       type="radio" name="goodName" value="woundcare"/>
                <label><img src={require('../../img/woundcare.png')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick={this.labelUpdater("clothes")}
                       type="radio" name="goodName" value="clothes"/>
                <label><img src={require('../../img/clothes.png')} className="image" /></label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input onChange={this.handleChange('goodName')} onClick={this.labelUpdater("accomodation")}
                       type="radio" name="goodName" value="accomodation"/>
                <label><img src={require('../../img/accomodation.png')} className="image" /></label>
              </div>
            </div>
          </div>
          <div className="field">
            <label>{this.state.labelText}</label>
            <input onChange={this.handleChange('quantity')}
                   type="text" name="quantity" placeholder={this.state.placeholderText}/>
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
          <button className="ui button" type="submit">Abschicken</button>
          <div className="ui error message"></div>
        </form>)
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
    console.log(payload)
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