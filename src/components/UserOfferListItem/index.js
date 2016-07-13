import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import functions from '../../utils/functions'

function UserOfferListItem (props) {
  const {
    offerID,
    username,
    misc,
    active,
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
        <div className="meta">{goodName}| {creationDate.toLocaleDateString()} | <Link to="/user" className="item"><button className="ui icon button" ><i className="edit icon"></i></button></Link> | <button onClick={functions.deleteOffer.bind(null,offerID)} className="ui icon button" ><i className="ban icon"></i></button> | <button onClick={functions.reActivateOffer.bind(null,offerID)} className="ui icon button" ><i className="ban icon"></i></button></div>
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
  offerID: PropTypes.number.isRequired,
  misc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  goodName: PropTypes.string.isRequired,
  creationDate: PropTypes.object.isRequired,
  active: PropTypes.boolean.isRequired
}


export default UserOfferListItem
