import 'babel-polyfill'
/* eslint-disable padded-blocks */
import { expect } from 'chai'
import { put, call } from 'redux-saga/effects'

import Api from '../../containers/App/api'
import * as Types from '../../constants/global'
import { fetchRequests, userLogin } from './sagas'

describe('fetchRequestsSaga', function () {
  let gen

  beforeEach(function () {
    gen = fetchRequests()
  })

  it('creates PENDING and SUCCESS actions', function () {
    expect(
      gen.next().value
    ).to.be.eql(
      put({ type: Types.GLOBAL_FETCH_REQUESTS_PENDING })
    )

    expect(
      gen.next().value
    ).to.be.eql(
      call(Api.getRequests)
    )

    const requests = [{b: 'b'}, {c: 'c'}, {d: 'd'}, {a: 'a'}]
    expect(
      gen.next(requests).value
    ).to.be.eql(
      put({ type: Types.GLOBAL_FETCH_REQUESTS_SUCCESS, requests }))
  })

  it('creates PENDING and FAIL actions', function () {
    expect(
      gen.next().value
    ).to.be.eql(
      put({ type: Types.GLOBAL_FETCH_REQUESTS_PENDING })
    )

    expect(
      gen.next().value
    ).to.be.eql(
      call(Api.getRequests)
    )

    expect(
      gen.throw({ error: 'Any error' }).value
    ).to.be.eql(
      put({ type: Types.GLOBAL_FETCH_REQUESTS_FAIL })
    )
  })

})

describe('userLoginSaga', function () {
  let gen, credentials
  beforeEach(function () {
    credentials = {
      username: 'blabla',
      password: '123123'
    }
    gen = userLogin(credentials)
  })

  it('sends PENDING and SUCCESS actions', function () {
    expect(
      gen.next().value
    ).to.be.eql(
      put({ type: Types.GLOBAL_USER_LOGIN_PENDING })
    )

    expect(
      gen.next().value
    ).to.be.eql(
      call(Api.userLogin, credentials)
    )

    const userData = { username: 'blabla', email: 'ao@example.org' }
    expect(
      gen.next(userData).value
    ).to.be.eql(
      put({ type: Types.GLOBAL_USER_LOGIN_SUCCESS, userData })
    )
  })

  it('sends PENDING and FAIL actions', function () {
    expect(
      gen.next().value
    ).to.be.eql(
      put({ type: Types.GLOBAL_USER_LOGIN_PENDING })
    )

    expect(
      gen.next().value
    ).to.be.eql(
      call(Api.userLogin, credentials)
    )

    expect(
      gen.throw({ error: 'any error' }).value
    ).to.be.eql(
      put({ type: Types.GLOBAL_USER_LOGIN_FAIL })
    )
  })
})
