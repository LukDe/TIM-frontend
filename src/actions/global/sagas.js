import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import {
  GLOBAL_FETCH_REQUESTS,
  GLOBAL_FETCH_REQUESTS_FAIL,
  GLOBAL_FETCH_REQUESTS_SUCCESS,
  GLOBAL_FETCH_REQUESTS_PENDING,
  GLOBAL_USER_LOGIN,
  GLOBAL_USER_LOGIN_SUCCESS,
  GLOBAL_USER_LOGIN_FAIL,
  GLOBAL_USER_LOGIN_PENDING
} from '../../constants/global'
import Api from '../../containers/App/api'

export function * fetchRequests () {
  try {
    yield put({ type: GLOBAL_FETCH_REQUESTS_PENDING })
    const requests = yield call(Api.getRequests)
    yield put({ type: GLOBAL_FETCH_REQUESTS_SUCCESS, requests })
  } catch (e) {
    yield put({ type: GLOBAL_FETCH_REQUESTS_FAIL })
  }
}

function * fetchRequestsSaga () {
  yield * takeEvery(GLOBAL_FETCH_REQUESTS, fetchRequests)
}

// -----------------------------------------------------------------

export function * userLogin (credentials) {
  try {
    yield put({ type: GLOBAL_USER_LOGIN_PENDING })
    const userData = yield call(Api.userLogin, credentials)
    yield put({ type: GLOBAL_USER_LOGIN_SUCCESS, userData })
  } catch (e) {
    yield put({ type: GLOBAL_USER_LOGIN_FAIL })
  }
}

function * userLoginSaga () {
  yield * takeLatest(GLOBAL_USER_LOGIN, userLogin)
}

export default function * rootSaga () {
  yield fork(userLoginSaga)
  yield fork(fetchRequestsSaga)
}
