import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'

import * as Types from '../../constants/global'
import * as AC from '../../actions/global'
import Api from '../../containers/App/api'

export function * fetchRequests () {
  try {
    yield put(AC.fetchRequestsPending())
    const requests = yield call(Api.getRequests)
    yield put(AC.fetchRequestsSuccess(requests))
  } catch (e) {
    yield put(AC.fetchRequestsFail())
  }
}

function * fetchRequestsSaga () {
  yield * takeEvery(Types.GLOBAL_FETCH_REQUESTS, fetchRequests)
}

// -----------------------------------------------------------------

export function * userLogin (credentials) {
  try {
    yield put(AC.userLoginPending())
    const userData = yield call(Api.userLogin, credentials)
    yield put(AC.userLoginSuccess(userData))
  } catch (e) {
    yield put(AC.userLoginFail())
  }
}

function * userLoginSaga () {
  yield * takeLatest(Types.GLOBAL_USER_LOGIN, userLogin)
}

export default function * rootSaga () {
  yield fork(userLoginSaga)
  yield fork(fetchRequestsSaga)
}
