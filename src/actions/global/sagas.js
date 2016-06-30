import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

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

export function * fetchRequestsSaga () {
  yield * takeEvery(Types.GLOBAL_FETCH_REQUESTS, fetchRequests)
}

// -----------------------------------------------------------------

export function * userLogin (action) {
  try {
    yield put(AC.userLoginPending())
    const userData = yield call(Api.userLogin, action.credentials)
    if (userData.error) {
      yield put(AC.userLoginFail(userData.error))
      yield call(toastr.error, userData.error)
    } else {
      yield put(AC.userLoginSuccess(userData))
      yield call(toastr.success, 'Login Successful!')
    }
  } catch (reason) {
    yield call(toastr.error, 'Error connecting to server')
    yield put(AC.userLoginFail('Error connecting to server'))
  }
}

export function * userLoginSaga () {
  yield * takeEvery(Types.GLOBAL_USER_LOGIN, userLogin)
}
