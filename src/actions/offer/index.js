import { mkActionCreator } from '../../utils/actions'
import * as Types from '../../constants/offer'

export const offerNew = mkActionCreator(Types.OFFER_NEW, 'payload')
export const offerNewPending = mkActionCreator(Types.OFFER_NEW_PENDING)
export const offerNewSuccess = mkActionCreator(Types.OFFER_NEW_SUCCESS)
export const offerNewFail = mkActionCreator(Types.OFFER_NEW_FAIL)
