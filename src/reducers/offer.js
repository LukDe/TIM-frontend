import R from 'ramda'

import * as Types from '../constants/offer'

const initialState = {
  data: null,
  error: false,
  isFetching: false
}

function offerReducer (state = initialState, action) {
  switch (action.type) {
    case Types.OFFERS_FETCH_PENDING:
      return R.pipe(
        R.assoc('data', null),
        R.assoc('error', false),
        R.assoc('isFetching', true)
      )(state)

    case Types.OFFERS_FETCH_SUCCESS:
      return R.pipe(
        R.assoc('data', action.offers),
        R.assoc('error', false),
        R.assoc('isFetching', false)
      )(state)

    case Types.OFFERS_FETCH_FAIL:
      return R.pipe(
        R.assoc('data', null),
        R.assoc('error', true),
        R.assoc('isFetching', false)
      )(state)

    default:
      return state
  }
}

export default offerReducer
