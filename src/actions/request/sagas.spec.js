import { expect } from 'chai'
import { put, call } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import Api from '../../containers/App/api'
import * as AC from './index.js'
import { navbarSelect } from '../navbar'
import * as Sagas from './sagas'

describe('newRequestSaga', function () {
  let gen, payload

  beforeEach(function () {
    payload = {
      username: 'dummy',
      password: 'whatever'
    }
    gen = Sagas.newRequest(AC.requestNew(payload))
  })

  it('Succeeds', function () {
    expect(
      gen.next().value
    ).to.eql(
      put(AC.requestNewPending())
    )
    expect(
      gen.next().value
    ).to.eql(
      call(Api.createRequest, payload)
    )
    expect(
      gen.next('Success message').value
    ).to.eql(
      call(toastr.success, 'Success message')
    )
    expect(
      gen.next().value
    ).to.eql(
      put(navbarSelect('RANKING'))
    )
  })

  it('Fails', function () {
    expect(
      gen.next().value
    ).to.eql(
      put(AC.requestNewPending())
    )
    expect(
      gen.next().value
    ).to.eql(
      call(Api.createRequest, payload)
    )
    expect(
      gen.throw('Error message').value
    ).to.eql(
      call(toastr.error, 'Error message')
    )
  })
})
