import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import * as AC from './index'
import * as Types from '../../constants/offer'
import Api from '../../containers/App/api'

import { browserHistory } from 'react-router'
import { takeLatest } from 'redux-saga'
import { navbarSelect } from '../navbar'

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

export function * newOffer (action) {
  try {
    yield put(AC.offerNewPending())
    const msg = yield call(Api.createOffer, action.payload)
    yield call(toastr.success, msg)
    yield put(navbarSelect('RANKING'))
    yield call(browserHistory.push, '/')
  } catch (reason) {
    yield call(toastr.error, reason)
  }
}

export function * newOfferSaga () {
  yield * takeLatest(Types.OFFER_NEW, newOffer)
}
