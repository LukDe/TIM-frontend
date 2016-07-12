import React, { PropTypes, Component } from 'react'

import StreetList from '../StreetList'
import Api from '../../containers/App/api'

class SelectStreetModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
      streets: [],
      error: null
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
  }

  componentWillUnmount () {
    $(this.modal)
      .modal('hide')
    $('#app').addClass('disabled')
  }

  handleChange (event) {
    this.setState({ search: event.target.value }) // eslint-disable-line

    Api.geocode(this.state.search)
      .then((json) => {
        if (json.error_message) {
          this.setState({ error: json.error_message }) // eslint-disable-line
        } else {
          this.setState({ // eslint-disable-line
            streets: json.results,
            error: null
          })
        }
      })
  }

  handleItemClick (street) {
    this.setState({ error: '', search: '', streets: [] }) // eslint-disable-line
    this.props.onClick(street)
  }

  close (e) {
    e.preventDefault()
    this.props.onLeave()
  }

  render () {
    return (
      <div ref={(n) => this.modal = n} className="ui modal">
        <div className="header">
          Deinen Ort auswählen
        </div>
        <div className="content">
          <div className="description">
            <div className="ui fluid input">
              <input type="text" placeholder="Straße"
                     onChange={this.handleChange.bind(this)}/>
            </div>
            {
              this.state.error
                ? (<div className="ui negative message">
                     <div className="header">
                       {this.state.error}
                     </div>
                   </div>)
                : (<StreetList onClick={this.handleItemClick.bind(this)}
                               streets={this.state.streets} />)
            }
          </div>
        </div>
        <div className="actions">
          <div onClick={this.close.bind(this)} className="ui black button">
            Abbrechen
          </div>
        </div>
      </div>
    )
  }
}

SelectStreetModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired
}

export default SelectStreetModal
