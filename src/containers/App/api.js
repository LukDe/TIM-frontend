/**
 *
 * api.js
 *
 * This file declares all of the functions that talk directly to the api.
 * All of these functions are assumed to return a promise with the response.
 */
const apiDomain = 'http://localhost:8000/api'

/**
 * Get all the offers from the server.
 * @return {promise}       Promise of the result
 */
function getOffers () {
  return fetch(`${apiDomain}/offers/`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else if (response.status === 404) {
        return Promise.reject({ error: 'Offers not found' })
      } else {
        return Promise.reject({ error: 'Unknown error on the server' })
      }
    })
}

 /**
  * Get all requests in json from the api.
  * @return {promise} Promise that resolves the JSON response.
  */
function getRequests () {
  return fetch(`${apiDomain}/requests/`)
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
  const options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }
  return fetch(`${apiDomain}/login/`, options)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else if (response.status === 404) {
        return Promise.resolve({
          error: 'Username was not found'
        })
      } else if (response.status === 400) {
        return Promise.resolve({
          error: 'Wrong password'
        })
      } else {
        console.log(response.status)
        return Promise.reject({
          error: 'Unknown error on the server'
        })
      }
    })
}

/**
 * Given the payload, creates a new request.
 * @param  {object}  payload Information about the new request.
 * @return {promise}         Returns either an Error or a Success message.
 */
function createRequest (payload) {
  return fetch(`${apiDomain}/requests/`, {
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
  createRequest,
  getOffers
}
