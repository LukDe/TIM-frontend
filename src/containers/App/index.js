/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar).
 */

// Import global semantic .css and .js files to be used on the whole
// application.
// -----------------------------------------------------------------

import React, { Component, PropTypes } from 'react'
import TimNavbar from '../TimNavbar'

import './styles.css'

class App extends Component {
  render () {
    return (
      <div>
        <TimNavbar />
        <div className="app-main-content">
        {this.props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default App
