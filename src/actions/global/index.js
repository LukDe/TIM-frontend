import * as Types from '../../constants/global'
import { mkActionCreator } from '../../utils/actions'

// User Login
export const userLogin = mkActionCreator(Types.GLOBAL_USER_LOGIN, 'credentials')
export const userLoginPending = mkActionCreator(Types.GLOBAL_USER_LOGIN_PENDING)
export const userLoginSuccess = mkActionCreator(Types.GLOBAL_USER_LOGIN_SUCCESS, 'userData')
export const userLoginFail = mkActionCreator(Types.GLOBAL_USER_LOGIN_FAIL, 'reason')
// User Logout
export const userLogout = mkActionCreator(Types.GLOBAL_USER_LOGOUT)
// Fetch requests
export const fetchRequests = mkActionCreator(Types.GLOBAL_FETCH_REQUESTS)
export const fetchRequestsPending = mkActionCreator(Types.GLOBAL_FETCH_REQUESTS_PENDING)
export const fetchRequestsSuccess = mkActionCreator(Types.GLOBAL_FETCH_REQUESTS_SUCCESS, 'requests')
export const fetchRequestsFail = mkActionCreator(Types.GLOBAL_FETCH_REQUESTS_FAIL)
