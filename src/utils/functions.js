function deleteOffer (offerID) {
    fetch('http://localhost:8000/api/offers/'+offerID, {
      method: "DELETE",
      headers: new Headers({'Content-Type': 'application/json'})
    })
    return
}

function reActivateOffer (offerID) {
    fetch('http://localhost:8000/api/offers/'+offerID, {
      method: "POST",
      headers: new Headers({'Content-Type': 'application/json'})
    })
    return
}

function deleteRequest (requestID) {
    fetch('http://localhost:8000/api/requests/'+requestID, {
      method: "DELETE",
      headers: new Headers({'Content-Type': 'application/json'})
    })
    return
}

function reActivateRequest (requestID) {
    fetch('http://localhost:8000/api/requests/'+requestID, {
      method: "POST",
      headers: new Headers({'Content-Type': 'application/json'})
    })
    return
}

export default {
  deleteOffer,
  deleteRequest,
  reActivateOffer,
  reActivateRequest
}