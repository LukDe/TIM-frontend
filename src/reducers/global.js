import R from 'ramda'
import * as Types from '../constants/global'

const initialState = {
  user: {
    isFetching: false,
    data: null,
    error: false
  },
  requests: {
    data: null,
    isFetching: true,
    error: false
  }
}

function globalReducer (state = initialState, action) {
  switch (action.type) {
    case Types.GLOBAL_FETCH_REQUESTS_PENDING:
      return R.pipe(
          R.assocPath(['requests', 'data'], null),
          R.assocPath(['requests', 'isFetching'], true),
          R.assocPath(['requests', 'error'], false)
        )(state)

    case Types.GLOBAL_FETCH_REQUESTS_SUCCESS:
      return R.pipe(
          R.assocPath(['requests', 'data'], action.requests),
          R.assocPath(['requests', 'isFetching'], false),
          R.assocPath(['requests', 'error'], false)
        )(state)

    case Types.GLOBAL_FETCH_REQUESTS_FAIL:
      return R.pipe(
          R.assocPath(['requests', 'isFetching'], false),
          R.assocPath(['requests', 'error'], true)
        )(state)

    case Types.GLOBAL_USER_LOGIN_SUCCESS:
      return R.pipe(
          R.assocPath(['user', 'isFetching'], false),
          R.assocPath(['user', 'data'], action.userData),
          R.assocPath(['user', 'error'], false)
        )(state)

    case Types.GLOBAL_USER_LOGIN_FAIL:
      return R.pipe(
          R.assocPath(['user', 'isFetching'], false),
          R.assocPath(['user', 'data'], null),
          R.assocPath(['user', 'error'], action.reason)
        )(state)

    case Types.GLOBAL_USER_LOGIN_PENDING:
      return R.pipe(
          R.assocPath(['user', 'isFetching'], true),
          R.assocPath(['user', 'data'], null),
          R.assocPath(['user', 'error'], false)
        )(state)

    case Types.GLOBAL_USER_LOGOUT:
      return R.pipe(
          R.assocPath(['user', 'isFetching'], false),
          R.assocPath(['user', 'data'], null),
          R.assocPath(['user', 'error'], false)
        )(state)

    default:
      return state
  }
}

export default globalReducer
