/**
 *
 * api.js
 *
 * This file declares all of the functions that talk directly to the api.
 * All of these functions are assumed to return a promise with the response.
 */

 /**
  * Get all requests in json from the api.
  * @return {promise} Promise that resolves the JSON response.
  */
function getRequests () {
  return fetch('http://localhost:8000/api/requests')
    .then((data) => data.json())
}

/**
 * Calls the /users/:username api to get the information about the user.
 * It works but should eventually be replaced by a more `secure` version.
 * @param  {object} userData Relevent user data for login.
 * @return {promise}         Promise that resolves to the JSON user representation.
 */
 // FIXME:
function userLogin (credentials) {
  return fetch(`http://localhost:8000/api/users/${credentials.username}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else if (response.status === 404) {
        return Promise.reject('Username was not found')
      } else {
        console.log(response.status)
        return Promise.reject('Unknown error on the server')
      }
    })
}

/**
 * Given the payload, creates a new request.
 * @param  {object}  payload Information about the new request.
 * @return {promise}         Returns either an Error or a Success message.
 */
function createRequest (payload) {
  return fetch('http://localhost:8000/api/requests/', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: new Headers({'Content-Type': 'application/json'})
  }).then((response) => {
    if (response.ok) {
      return Promise.resolve('Request created successfully')
    } else {
      return Promise.reject('Error while creating the request')
    }
  })
}

export default {
  getRequests,
  userLogin,
  createRequest
}
