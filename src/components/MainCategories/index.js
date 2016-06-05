import React from 'react'

function MainCategories () {
  return (
    <div className="ui four column grid">
      <div className="column">
        <div className="content">
          <div className="ui labeled button" tabindex="0">
            <div className="ui teal button">
              Wasser
            </div>
            <a href="#" className="ui basic teal left pointing label">
              40
            </a>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="content">
          <div className="ui labeled button" tabindex="0">
            <div className="ui teal button">
              Kleidung
            </div>
            <a href="#" className="ui basic teal left pointing label">
              40
            </a>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="content">
          <div className="ui labeled button" tabindex="0">
            <div className="ui teal button">
              Woundcare
            </div>
            <a href="#" className="ui basic teal left pointing label">
              40
            </a>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="content">
          <div className="ui labeled button" tabindex="0">
            <div className="ui teal button">
              Unterkunft
            </div>
            <a href="#" className="ui basic teal left pointing label">
              40
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainCategories
