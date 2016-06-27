import React, { PropTypes } from 'react'

function StreetList ({ onClick, streets }) {
  return (
    <div className="ui very relaxed list">
      {
        streets.map((street, i) =>
          <div key={i} className="item">
            <div className="content">
              <a onClick={() => onClick(street)}
                 className="header">
                {street.formatted_address}
              </a>
            </div>
          </div>
        )
      }
    </div>
  )
}

StreetList.propTypes = {
  onClick: PropTypes.func.isRequired,
  streets: PropTypes.array.isRequired
}

export default StreetList
