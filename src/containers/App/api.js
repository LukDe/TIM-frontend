/**
 *
 * api.js
 *
 * This file declares all of the functions that talk directly to the api.
 * All of these functions are assumed to return a promise with the response.
 */

/* ====================================================== */
/* Google Api functions                                   */
/* ====================================================== */

export const GOOGLE_MAPS_API_KEY = 'AIzaSyDKWmVq0-nJ5v6b-2x9jBkhgPuVarwipbA'

function reverseGeocode (latitude, longitude) {
  const reverseGeocodingUrl =
    `https://maps.googleapis.com/maps/api/geocode/json` +
    `?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`

  return fetch(reverseGeocodingUrl)
    .then((response) => response.json())
    .catch((error) => Promise.reject(`Error connecting to Google Api: ${error}`))
}

function geocode (address) {
  console.log(`called with: ${address}`)
  const geocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json' +
                       `?address=${address}&key=${GOOGLE_MAPS_API_KEY}`

  return fetch(geocodingUrl)
    .then((response) => response.json())
    .catch((error) => Promise.reject(`Error connecting to Google Api: ${error}`))

}

/* ====================================================== */
/* TIM api functions                                      */
/* ====================================================== */

export const TIM_API_ROOT = 'http://localhost:8000/api'

 /**
  * Get all requests in json from the api.
  * @return {promise} Promise that resolves the JSON response.
  */
function getRequests () {
  return fetch(`${TIM_API_ROOT}/requests`)
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
  return fetch(`${TIM_API_ROOT}/login/`, options)
    .catch((e) => {
      Promise.reject('Error connecting to server')
    })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else if (response.status === 404) {
        return Promise.reject('Username was not found')
      } else if (response.status === 400) {
        return Promise.reject('Wrong password')
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
  return fetch(`${TIM_API_ROOT}/requests/`, {
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

/**
 * Given the payload, creates a new offer.
 * @param  {object}  payload Information about the new offer.
 * @return {promise}         Returns either an Error or a Success message.
 */
function createOffer (payload) {
  return fetch(`${TIM_API_ROOT}/offers/`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: new Headers({'Content-Type': 'application/json'})
  }).then((response) => {
    if (response.ok) {
      return Promise.resolve('Offer created successfully')
    } else {
      return Promise.reject('Error while creating the offer')
    }
  })
}

function getVerificationCode (payload) {
  return fetch('http://localhost:8000/api/verification/', {
    method: "POST",
    body: JSON.stringify(payload),
    headers: new Headers({'Content-Type': 'application/json'})
  }).then((response) => response.json())
}

export default {
  // Tim Api
  getRequests,
  userLogin,
  createRequest,
  createOffer,
  getVerificationCode,
  // Google Api
  geocode,
  reverseGeocode
}
