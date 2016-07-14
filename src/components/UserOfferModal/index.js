import React, { PropTypes, Component } from 'react'
import Api from '../../containers/App/api'
import { connect } from 'react-redux'
import SelectStreetModal from '../SelectStreetModal'

class UserOfferModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enteredVerification: '',
      offerID: this.props.requestID,
      username: this.props.username,
      misc: this.props.misc,
      goodName: this.props.goodName,
      quantity: this.props.quantity,
      priority: this.props.priority,
      radius: this.props.radius,
      active: this.props.active,
      location: this.props.location,
      address: {
        name: '',
        coords: {
          latitude: '',
          longitude: ''
        }
      }
    }
  }

  componentWillMount () {
    $('#app').removeClass('disabled')
  }

  componentDidMount () {
    $(this.modal)
      .modal({
        detachable: false,
        closable: false,
        context: $('#app')
      })
      .modal('show')

    $('#offerEdit-form').submit(() => {
      const isFormValid = $('#offerEdit-form').form('is valid')
      if (isFormValid) {
        this.props.onSub(this.state)
      }
      return false
    })
  }

  componentWillUnmount () {
    $(this.modal)
      .modal('hide')
    $('#app').addClass('disabled')
  }

  handleChange (prop) {
    return (event) => {
      this.setState({ [prop]: event.target.value }) // eslint-disable-line
    }
  }

  close (e) {
    e.preventDefault()
    this.props.onLeave()
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

  render () {
    const goods = {
      other: this.props.misc,
      water: 'Wasser',
      food: 'Mahlzeiten',
      clothes: 'Kleidung',
      accomodation: 'einer Unterkunft',
      woundcare: 'Verbandskästen'
    }

    const label = {
      other: 'Was?',
      water: 'Wie viel Liter Wasser brauchen Sie?',
      food: 'Wie viele Mahlzeiten brauchen Sie?',
      clothes: 'Wie viele Kleidungen brauchen Sie?',
      accomodation: 'Wie viele Personen brauchen Unterkunft?',
      woundcare: 'Wie viele Verbandskästen brauchen Sie?'
    }

    return (
      <div ref={(n) => this.modal = n} className="ui modal">
        <div className="header">
          Ihre Anfrage nach  {goods[this.props.goodName]} bearbeiten:
        </div>
        <div className="content">
          <form id="offerEdit-form" className="ui form">

            {this.state.goodName === 'other'
              ? (<div className="field">
              <label>Was?</label>
              <input onChange={this.handleChange('misc')} type="text" name="misc" value={this.state.misc}/>
            </div>)
              : (<div className="field">
              <label>{label[this.props.goodName]}</label>
              <input onChange={this.handleChange('quantity')} type="text" name="quantity" value={this.state.quantity}/>
            </div>)
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
              <input onChange={this.handleChange('radius')} type="text" name="radius" value={this.state.radius}/>
            </div>

            <div className="field">
              <label>Dringlichkeit</label>
              <input onChange={this.handleChange('priority')} type="text" name="priority" value={this.state.priority}/>
            </div>

            <div>
              <button className="ui button" type="submit">
                Bestätigen
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSub (state) {
    const payload = {
      username: state.username,
      misc: state.misc,
      goodName: state.goodName,
      quantity: state.quantity,
      priority: state.priority,
      radius: state.radius,
      active: state.active,
      location: state.postalCode
    }
    console.log(payload)
    fetch('http://localhost:8000/api/requests/'+state.offerID, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    // browserHistory.push('/login')
  }
})

UserOfferModal.propTypes = {
  misc: PropTypes.string,
  username: PropTypes.string,
  goodName: PropTypes.string,
  quantity: PropTypes.string,
  offerID: PropTypes.string
}

export default connect(
  mapDispatchToProps
)(UserOfferModal)
