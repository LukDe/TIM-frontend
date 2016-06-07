/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar).
 */

import React, { PropTypes } from 'react'
import TimNavbar from '../TimNavbar'

import './styles.css'

const App = ({ children }) =>
  <div className="app-all-content">
    <TimNavbar />
    <div className="ui grid">
      <div className="two wide column">asoiads</div>
      <div className="twelve wide column app-main-content">{children}</div>
      <div className="two wide column"></div>
    </div>
  </div>

App.propTypes = {
  children: PropTypes.node
}

export default App
