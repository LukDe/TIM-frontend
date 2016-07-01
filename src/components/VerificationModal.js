import React, { PropTypes, Component } from 'react'

class VerificationModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enteredVerification: ''
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
    this.setState({ enteredVerification: event.target.value }) // eslint-disable-line
  }

  close (e) {
    e.preventDefault()
    this.props.onLeave()
  }

  render () {
    return (
      <div ref={(n) => this.modal = n} className="ui modal">
        <div className="header">
          Bitte Bestätigungscode eingeben
        </div>
        <div className="content">
          <form id="verification-form" className="ui form">
            <div className="ui fluid input">
              <input type="text" placeholder="Bestätigungscode"
                     onChange={this.handleChange.bind(this)}/>
            </div>
            <button onClick={() => this.props.onVer(this.state.enteredVerification)}
                    className="ui button">
              Bestätigen
            </button>
          </form>
        </div>
      </div>
    )
  }
}

VerificationModal.propTypes = {
  onVer: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired
}

export default VerificationModal
