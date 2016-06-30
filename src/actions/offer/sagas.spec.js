import { expect } from 'chai'
import { put, call } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import { fetchOffers } from './sagas'
import * as AC from './index'
import Api from '../../containers/App/api'

describe('fetchOffersSaga', function () {
  let gen

  beforeEach(function () {
    gen = fetchOffers()
  })

  it('it succeeds returning the offers', function () {
    expect(
      gen.next().value
    ).to.eql(
      put(AC.offersFetchPending())
    )

    expect(
      gen.next().value
    ).to.eql(
      call(Api.getOffers)
    )

    const offers = []

    expect(
      gen.next(offers).value
    ).to.eql(
      put(AC.offersFetchSuccess(offers))
    )
  })

  it('fails from a server error', function () {
    expect(
      gen.next().value
    ).to.eql(
      put(AC.offersFetchPending())
    )

    expect(
      gen.next().value
    ).to.eql(
      call(Api.getOffers)
    )

    expect(
      gen.next({ error: 'Some error' }).value
    ).to.eql(
      call(toastr.error, 'Some error')
    )

    expect(
      gen.next().value
    ).to.eql(
      put(AC.offersFetchFail('Some error'))
    )
  })

  it('fails from connection error', function () {
    expect(
      gen.next().value
    ).to.eql(
      put(AC.offersFetchPending())
    )

    expect(
      gen.next().value
    ).to.eql(
      call(Api.getOffers)
    )

    expect(
      gen.throw({ error: 'Some error' }).value
    ).to.eql(
      call(toastr.error, 'Error connecting to server')
    )

    expect(
      gen.next().value
    ).to.eql(
      put(AC.offersFetchFail('Error connecting to server'))
    )
  })
})
