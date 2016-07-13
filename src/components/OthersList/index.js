import React, { PropTypes } from 'react'
import OthersListItem from '../OthersListItem'
import R from 'ramda'
import { connect } from 'react-redux'

function OthersList ({ requests } ,props) {
  const {
    offusername,
	userloc,
	userrad
  } = props
  return (
    <div className="ui big middle aligned very relaxed selection divided list">
      {requests
        .filter((req) => req.goodName === 'other' && req.active === true  && load(req.location,req.radius) === true)
        .map((req) =>
          (<OthersListItem
                key={req.id}
                username={req.username}
                creationDate={new Date(req.creationDate)}
                misc={req.misc}
				requestID={req.id}/>))}
    </div>
  )
}

OthersList.propTypes = {
  requests: PropTypes.array,
  offusername: PropTypes.string.isRequired,
  userloc: PropTypes.string.isRequired,
  userrad: PropTypes.number.isRequired
}

function load(reqloc,reqrad){
  if(offusername === 'undefined'){ //nicht eingeloggt, sieht alle otherlistitems
    return true;
  }else{
    var req_loc = reqloc.split(",");
    var req_lon = req_loc[0] * Math.PI / 180.0;
    var req_lat = req_loc[1] * Math.PI / 180.0;
    var user_loc = userloc.split(",");
	var user_lon = user_loc[0] * Math.PI / 180.0;
	var user_lat = user_loc[1] *Math.PI / 180.0;
	var dlon = user_lon - req_lon;
	var dlat = user_lat - req_lat;
	var a = Math.pow(Math.sin(dlat/2),2) + Math.cos(req_lat) * Math.cos(user_lat) * Math.pow(Math.sin(dlon/2),2);
	var c = 2 * Math.asin(Math.sqrt(a));
	var km = 6367*c;
	if(( userrad + reqrad ) <= km){
	  return true;
	}else{
	  return false;
	}
  }
}

const mapStateToProps = (state) => ({
  offusername: R.path(['global', 'user', 'data', 'username'], state),
  userloc: R.path(['global','user','data','location'],state),
  userrad: R.path(['global','user','data','radius'],state)
})

export default connect (
  mapStateToProps
)(OthersList)
