import { browserHistory } from 'react-router'
import { takeLatest } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import Api from '../../containers/App/api'
import * as AC from './index'
import { navbarSelect } from '../navbar'
import * as Types from '../../constants/offer'

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
