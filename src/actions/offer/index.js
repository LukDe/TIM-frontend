import * as Types from '../../constants/offer'
import { mkActionCreator } from '../../utils/actions'

export const offersFetch = mkActionCreator(Types.OFFERS_FETCH)
export const offersFetchPending = mkActionCreator(Types.OFFERS_FETCH_PENDING)
export const offersFetchSuccess = mkActionCreator(Types.OFFERS_FETCH_SUCCESS, 'offers')
export const offersFetchFail = mkActionCreator(Types.OFFERS_FETCH_FAIL, 'error')

export const offerNew = mkActionCreator(Types.OFFER_NEW, 'payload')
export const offerNewPending = mkActionCreator(Types.OFFER_NEW_PENDING)
export const offerNewSuccess = mkActionCreator(Types.OFFER_NEW_SUCCESS)
export const offerNewFail = mkActionCreator(Types.OFFER_NEW_FAIL)
