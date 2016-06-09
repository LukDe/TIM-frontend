import {
  GLOBAL_USER_LOGIN,
  GLOBAL_FETCH_REQUESTS,
  GLOBAL_USER_LOGOUT
} from '../../constants/global'

export const userLogin = (credentials) => ({
  type: GLOBAL_USER_LOGIN,
  credentials
})

export const userLogout = () => ({
  type: GLOBAL_USER_LOGOUT
})

export const fetchRequests = () => ({
  type: GLOBAL_FETCH_REQUESTS
})
