import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import OthersList from '../../components/OthersList'

class OtherCategories extends Component {
  render () {
    const { requests, isFetching, fetchError } = this.props
    let content
    if (isFetching) {
      content = (<i className="notched circle loading icon"></i>)
    } else if (fetchError) {
      content = (<h3>Error while loading the requests :(</h3>)
    } else {
      content = (<OthersList requests={requests} />)
    }
    return (<div>{content}</div>)
  }
}

OtherCategories.propTypes = {
  requests: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    requests: R.path(['global', 'requests', 'data'], state),
    isFetching: R.path(['global', 'requests', 'isFetching'], state),
    fetchError: R.path(['global', 'requests', 'error'], state)
  }
}

export default connect(mapStateToProps, null)(OtherCategories)
