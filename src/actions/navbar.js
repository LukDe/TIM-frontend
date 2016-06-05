import { NAVBAR_SELECT } from '../constants/navbar'

export function navbarSelect (selection) {
  return {
    type: NAVBAR_SELECT,
    selection
  }
}
