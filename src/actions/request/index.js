import { mkActionCreator } from '../../utils/actions'
import * as Types from '../../constants/request'

export const requestNew = mkActionCreator(Types.REQUEST_NEW, 'payload')
export const requestNewPending = mkActionCreator(Types.REQUEST_NEW_PENDING)
export const requestNewSuccess = mkActionCreator(Types.REQUEST_NEW_SUCCESS)
export const requestNewFail = mkActionCreator(Types.REQUEST_NEW_FAIL)
