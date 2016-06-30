import * as Types from '../../constants/offer'
import { mkActionCreator } from '../../utils/actions'

export const offersFetch = mkActionCreator(Types.OFFERS_FETCH)
export const offersFetchPending = mkActionCreator(Types.OFFERS_FETCH_PENDING)
export const offersFetchSuccess = mkActionCreator(Types.OFFERS_FETCH_SUCCESS, 'offers')
export const offersFetchFail = mkActionCreator(Types.OFFERS_FETCH_FAIL, 'error')
