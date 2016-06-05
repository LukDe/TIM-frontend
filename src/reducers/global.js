import R from 'ramda'
import {
  GLOBAL_FETCH_REQUESTS_PENDING,
  GLOBAL_FETCH_REQUESTS_SUCCESS,
  GLOBAL_FETCH_REQUESTS_FAIL
} from '../constants/global'

const initialState = {
  requests: {
    data: null,
    isFetching: true,
    error: false
  }
}

function globalReducer (state = initialState, action) {
  switch (action.type) {
    case GLOBAL_FETCH_REQUESTS_PENDING:
      return R.pipe(
          R.assocPath(['requests', 'data'], null),
          R.assocPath(['requests', 'isFetching'], true),
          R.assocPath(['requests', 'error'], false)
        )(state)

    case GLOBAL_FETCH_REQUESTS_SUCCESS:
      return R.pipe(
          R.assocPath(['requests', 'data'], action.requests),
          R.assocPath(['requests', 'isFetching'], false),
          R.assocPath(['requests', 'error'], false)
        )(state)

    case GLOBAL_FETCH_REQUESTS_FAIL:
      return R.pipe(
          R.assocPath(['requests', 'isFetching'], false),
          R.assocPath(['requests', 'error'], true)
        )(state)

    default:
      return state
  }
}

export default globalReducer
