import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import functions from '../../utils/functions'

function UserOfferListItem (props) {
  const {
    offerID,
    username,
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
        <div className="meta">Angebot vom {creationDate.toLocaleDateString()} | {" "}
          <button className="ui blue icon button" onClick={() => onEdit(offerID)}>
            <i className="edit icon"></i>
          </button>
          <button onClick={() => onDelete(offerID)} className="ui orange icon button">
            <i className="ban icon"></i>
          </button>
        </div>
      </div>
    </div>


  )
}



UserOfferListItem.propTypes = {
  offerID: PropTypes.number.isRequired,
  misc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  goodName: PropTypes.string.isRequired,
  creationDate: PropTypes.object.isRequired
}


export default UserOfferListItem
