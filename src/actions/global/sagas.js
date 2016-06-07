import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {
  GLOBAL_FETCH_REQUESTS,
  GLOBAL_FETCH_REQUESTS_FAIL,
  GLOBAL_FETCH_REQUESTS_SUCCESS,
  GLOBAL_FETCH_REQUESTS_PENDING
} from '../../constants/global'
import Api from '../../containers/App/api'

function * fetchRequests () {
  try {
    yield put({ type: GLOBAL_FETCH_REQUESTS_PENDING })
    const requests = yield call(Api.getRequests)
    yield put({ type: GLOBAL_FETCH_REQUESTS_SUCCESS, requests })
  } catch (e) {
    console.log(`error: ${e}`)
    yield put({ type: GLOBAL_FETCH_REQUESTS_FAIL })
  }
}

export function * fetchRequestsSaga () {
  yield * takeEvery(GLOBAL_FETCH_REQUESTS, fetchRequests)
}
