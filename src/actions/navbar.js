import * as Types from '../constants/navbar'
import { mkActionCreator } from '../utils/actions'

export const navbarSelect = mkActionCreator(Types.NAVBAR_SELECT, 'selection')
