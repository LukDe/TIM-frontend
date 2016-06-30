import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import * as AC from './index'
import * as Types from '../../constants/offer'
import Api from '../../containers/App/api'

export function * fetchOffers () {
  try {
    yield put(AC.offersFetchPending())
    const offers = yield call(Api.getOffers)
    if (offers.error) {
      yield call(toastr.error, offers.error)
      yield put(AC.offersFetchFail(offers.error))
    } else {
      yield put(AC.offersFetchSuccess(offers))
    }
  } catch (e) {
    yield call(toastr.error, 'Error connecting to server')
    yield put(AC.offersFetchFail('Error connecting to server'))
  }
}

export function * fetchOffersSaga () {
  yield * takeEvery(Types.OFFERS_FETCH, fetchOffers)
}
