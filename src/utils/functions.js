function deleteOffer (offerID) {
  return fetch('http://localhost:8000/api/offers/' + offerID, {
    method: 'DELETE',
    headers: new Headers({'Content-Type': 'application/json'})
  })
}

function deleteRequest (requestID) {
  return fetch('http://localhost:8000/api/requests/' + requestID, {
    method: 'DELETE',
    headers: new Headers({'Content-Type': 'application/json'})
  })
}

function reActivateRequest (requestID) {
  return fetch(`http://localhost:8000/api/requests/${requestID}/activate`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'})
  })
}

function reActivateOffer (offerID) {
  return fetch(`http://localhost:8000/api/offers/${offerID}/activate`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'})
  })
}

export default {
  deleteOffer,
  deleteRequest,
  reActivateOffer,
  reActivateRequest
}
