import React, { Component, PropTypes } from 'react'
import { toastr } from 'react-redux-toastr'
import UserRequestListItem from '../../components/UserRequestListItem'
import R from 'ramda'
import { connect } from 'react-redux'
import functions from '../../utils/functions'
import * as AC from '../../actions/global'
import UserRequestModal from '../../components/UserRequestModal'

class UserRequestList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      requestID: ''
    }
  }

  onDelete (requestId) {
    functions.deleteRequest(requestId)
    toastr.success('Anfrage erfolgreich gelöscht!')
    setTimeout(() => {
      this.props.dispatch(AC.fetchRequests())
    }, 500)
  }

  onEdit (requestId) {
    console.log(requestId)
    this.setState({ showModal: true, requestID: requestId  })
  }
  
  /*onActivate (requestId) {
    this.setState({active: true})
    
  }*/

  render () {
    return (
      <div>
        {this.state.showModal
          ? (<UserRequestModal
            requestID={this.state.requestID}
            username={this.props.username}
            goodName={this.props.requests.filter((req) => req.id === this.state.requestID)[0].goodName}
            active={this.props.requests.filter((req) => req.id === this.state.requestID)[0].active}
            misc={this.props.requests.filter((req) => req.id === this.state.requestID)[0].misc}
            quantity={this.props.requests.filter((req) => req.id === this.state.requestID)[0].quantity}
            priority={this.props.requests.filter((req) => req.id === this.state.requestID)[0].priority}
            location={this.props.requests.filter((req) => req.id === this.state.requestID)[0].location}
            radius={this.props.requests.filter((req) => req.id === this.state.requestID)[0].radius}
            creationDate={this.props.requests.filter((req) => req.id === this.state.requestID)[0].creationDate}
        />)

          : ''}

        { /* {this.state.showModal
            ? (<UserRequestModal />)
            : ''}
*/ }
        <div className="ui big middle aligned very relaxed selection divided list">
          {this.props.requests
            .filter((req) => req.username === this.props.username)
            .map((req) =>
              (<UserRequestListItem
                key={req.id}
                username={req.username}
                creationDate={new Date(req.creationDate)}
                goodName={req.goodName}
                misc={req.misc}
                requestID={req.id}
                onDelete={this.onDelete.bind(this)}
                onEdit={this.onEdit.bind(this)}/>))}
        </div>
      </div>
    )
  }

}

UserRequestList.propTypes = {
  requests: PropTypes.array,
  username: PropTypes.string,
  requestID: PropTypes.number
}

const mapStateToProps = (state) => ({
  isLoggedIn: Boolean(R.path(['global', 'user', 'data'], state)),
  requests: R.path(['global', 'requests', 'data'], state),
  username: R.path(['global', 'user', 'data', 'username'], state)
})

export default connect(
  mapStateToProps
)(UserRequestList)
