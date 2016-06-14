/**
 *
 * api.js
 *
 * This file declares all of the functions that talk directly to the api.
 * All of these functions are assumed to return a promise with the response.
 */

 /**
  * Get all requests in json from the api.
  * @return {Promise} Promise that resolves the JSON response.
  */
function getRequests () {
  return fetch('http://localhost:8000/api/requests')
    .then((data) => data.json())
}

/**
 * Calls the /users/:username api to get the information about the user.
 * It works but should eventually be replaced by a more `secure` version.
 * @param  {object} userData Relevent user data for login.
 * @return {Promise}         Promise that resolves to the JSON user representation.
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

export default {
  getRequests,
  userLogin
}
