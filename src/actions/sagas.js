import { userLoginSaga, fetchRequestsSaga } from './global/sagas'
import { newRequestSaga } from './request/sagas'

export default function * rootSaga () {
  yield [
    userLoginSaga(),
    fetchRequestsSaga(),
    newRequestSaga()
  ]
}
