import { browserHistory } from 'react-router'
import { takeLatest } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import Api from '../../containers/App/api'
import * as AC from './index'
import { navbarSelect } from '../navbar'
import * as Types from '../../constants/request'

export function * newRequest (action) {
  try {
    yield put(AC.requestNewPending())
    const msg = yield call(Api.createRequest, action.payload)
    yield call(toastr.success, msg)
    console.log(browserHistory)
    yield put(navbarSelect('RANKING'))
    yield call(browserHistory.push, '/')
  } catch (reason) {
    yield call(toastr.error, reason)
  }
}

export function * newRequestSaga () {
  yield * takeLatest(Types.REQUEST_NEW, newRequest)
}
