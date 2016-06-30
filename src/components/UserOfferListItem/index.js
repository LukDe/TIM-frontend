import React, { PropTypes } from 'react'
import { Link } from 'react-router'

function UserOfferListItem (props) {
  const {
    username,
    misc,
    goodName,
    creationDate,
    postalCode,
    catastrophe
  } = props


  const imgs = {
    other: (<img className="ui avatar image" src={require('../../img/other.svg')} alt="others"/>),
    water: (<img className="ui avatar image" src={require('../../img/water.svg')} alt="water"/>),
    food: (<img className="ui avatar image" src={require('../../img/food.svg')} alt="food"/>),
    clothes: (<img className="ui avatar image" src={require('../../img/clothes.svg')} alt="clothes"/>),
    accomodation: (<img className="ui avatar image" src={require('../../img/accomodation.svg')} alt="accomodation"/>),
    woundcare: (<img className="ui avatar image" src={require('../../img/woundcare.svg')} alt="woundcare"/>)
  }
  return (
    <div className="item">
      {imgs[goodName]}
      <div className="content">
        <div className="header">{username}</div>
        <div className="meta">{catastrophe} | {goodName}| {creationDate.toLocaleDateString()} | {postalCode} | <Link to="/user" className="item"><button className="ui icon button" ><i className="edit icon"></i></button></Link> | <button className="ui icon button"><i className="ban icon"></i></button></div>
        <div className="description">
          {misc === 'NULL' ? '' : misc}
        </div>
        <div className="extra">
        </div>
      </div>
    </div>


  )
}


UserOfferListItem.propTypes = {
  misc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  goodName: PropTypes.string.isRequired,
  creationDate: PropTypes.object.isRequired,
  postalCode: PropTypes.string.isRequired,
  catastrophe: PropTypes.string.isRequired
}


export default UserOfferListItem
