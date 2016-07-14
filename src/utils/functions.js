function deleteOffer (offerID) {
  return fetch('http://backend.62s4p53h4j.eu-central-1.elasticbeanstalk.com/api/offers/' + offerID, {
    method: 'DELETE',
    headers: new Headers({'Content-Type': 'application/json'})
  })
}

function deleteRequest (requestID) {
  return fetch('http://backend.62s4p53h4j.eu-central-1.elasticbeanstalk.com/api/requests/' + requestID, {
    method: 'DELETE',
    headers: new Headers({'Content-Type': 'application/json'})
  })
}

function initiateContact (offusername,requsername){
	fetch('http://backend.62s4p53h4j.eu-central-1.elasticbeanstalk.com/api/initiateContact/'+offusername+'/'+requsername, {
	method: "POST",
	headers: new Headers({'Content-Type': 'application/json'})
	})
	return
}

function reActivateRequest (requestID) {
  return fetch('http://backend.62s4p53h4j.eu-central-1.elasticbeanstalk.com/api/requests/${requestID}/activate', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'})
  })
}

function reActivateOffer (offerID) {
  return fetch('http://backend.62s4p53h4j.eu-central-1.elasticbeanstalk.com/api/offers/${offerID}/activate', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'})
  })
}

function deleteOffer (offerID) {
  fetch('http://backend.62s4p53h4j.eu-central-1.elasticbeanstalk.com/api/offers/'+offerID, {
    method: "DELETE",
    headers: new Headers({'Content-Type': 'application/json'})
  })
  return
}

export default {
  deleteOffer,
  deleteRequest,
  initiateContact,
  reActivateOffer,
  reActivateRequest,
  deleteRequest
}
