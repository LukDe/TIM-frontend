import { expect } from 'chai'
import { put, call } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'

import Api from '../../containers/App/api'
import * as Types from '../../constants/global'
import * as Sagas from './sagas'

describe('fetchRequestsSaga', function () {
  let gen

  beforeEach(function () {
    gen = Sagas.fetchRequests()
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
      put({ type: Types.GLOBAL_FETCH_REQUESTS_SUCCESS, requests })
    )

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

  it('handles SERVER connection issues', function () {

  })

})

describe('userLoginSaga', function () {
  let gen, action
  beforeEach(function () {
    action = {
      credentials: {
        username: 'blabla',
        password: '123123'
      }
    }
    gen = Sagas.userLogin(action)
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
      call(Api.userLogin, action.credentials)
    )

    const userData = { username: 'blabla', email: 'ao@example.org' }
    expect(
      gen.next(userData).value
    ).to.be.eql(
      put({ type: Types.GLOBAL_USER_LOGIN_SUCCESS, userData })
    )

    expect(
      gen.next().value
    ).to.be.eql(
      call(toastr.success, 'Login Successful!')
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
      call(Api.userLogin, action.credentials)
    )

    expect(
      gen.next({ error: 'An error' }).value
    ).to.be.eql(
      put({ type: Types.GLOBAL_USER_LOGIN_FAIL, reason: 'An error' })
    )

    expect(
      gen.next().value
    ).to.be.eql(
      call(toastr.error, 'An error')
    )
  })

  it('it handles connectivity issues', function () {
    expect(
      gen.next().value
    ).to.be.eql(
      put({ type: Types.GLOBAL_USER_LOGIN_PENDING })
    )

    expect(
      gen.next().value
    ).to.be.eql(
      call(Api.userLogin, action.credentials)
    )

    expect(
      gen.throw({ error: 'Connect error' }).value
    ).to.be.eql(
      call(toastr.error, 'Error connecting to server')
    )

    expect(
      gen.next().value
    ).to.be.eql(
      put({ type: Types.GLOBAL_USER_LOGIN_FAIL, reason: 'Error connecting to server' })
    )
  })
})
