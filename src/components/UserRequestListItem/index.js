import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import functions from '../../utils/functions'

function UserRequestListItem (props) {
  const {
    requestID,
    username,
    active,
    misc,
    goodName,
    creationDate,
    onDelete,
    onEdit
  } = props

  const imgs = {
    other: (<img className="ui avatar image" src={require('../../img/other.svg')} alt="others"/>),
    water: (<img className="ui avatar image" src={require('../../img/water.svg')} alt="water"/>),
    food: (<img className="ui avatar image" src={require('../../img/food.svg')} alt="food"/>),
    clothes: (<img className="ui avatar image" src={require('../../img/clothes.svg')} alt="clothes"/>),
    accomodation: (<img className="ui avatar image" src={require('../../img/accomodation.svg')} alt="accomodation"/>),
    woundcare: (<img className="ui avatar image" src={require('../../img/woundcare.svg')} alt="woundcare"/>)
  }

  const goods = {
    water: 'Wasser',
    food: 'Mahlzeiten',
    clothes: 'Kleidung',
    accomodation: 'einer Unterkunft',
    woundcare: 'Verbandskästen'
  }

  return (
    <div className="item">
      {imgs[goodName]}
      <div className="content">
        {goodName === 'other'
          ? (<div className="header">{misc}</div>)
          : (<div className="header">{goods[goodName]}</div>)}
        <div className="meta">Anfrage vom {creationDate.toLocaleDateString()} | {" "}
          <button className="ui blue icon button" onClick={() => onEdit(requestID)}>
            <i className="edit icon"></i>
          </button>
          <button onClick={() => onDelete(requestID)} className="ui orange icon button">
            <i className="ban icon"></i>
          </button>
          {/*<button onClick={() => onActivate(requestID)} className="ui green button">
            Aktivieren
          </button>*/}
        </div>
      </div>
    </div>
)
}


UserRequestListItem.propTypes = {
  requestID: PropTypes.number.isRequired,
  misc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  goodName: PropTypes.string.isRequired,
  creationDate: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}


export default UserRequestListItem
