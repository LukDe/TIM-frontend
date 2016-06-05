/**
 *
 * api.js
 *
 * This file declares all of the functions that talk directly to the api.
 * All of these functions are assumed to return a promise with the response.
 */

function getRequests () {
  return fetch('http://localhost:8000/api/requests')
    .then((data) => data.json())
}

export default {
  getRequests
}
