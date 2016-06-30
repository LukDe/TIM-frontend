import { userLoginSaga, fetchRequestsSaga } from './global/sagas'
import { newRequestSaga } from './request/sagas'
import { fetchOffersSaga } from './offer/sagas'
import { newOfferSaga } from './offer/sagas'

export default function * rootSaga () {
  yield [
    userLoginSaga(),
    fetchRequestsSaga(),
    newRequestSaga(),
    fetchOffersSaga(),
    newOfferSaga()
  ]
}
