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
 * Logs the user in, given its relevant data.
 * The function is still a mocked one (backend not ready).
 * @param  {object} userData Relevent user data for login.
 * @return {Promise}         Promise that resolves to the JSON user representation.
 */
 // FIXME: Use the real implementation
function userLogin (credentials) {
  const userData = {
    userame: 'bob',
    email: 'ararar@example.com'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(userData)
    }, 1500)
  })
}

export default {
  getRequests,
  userLogin
}
