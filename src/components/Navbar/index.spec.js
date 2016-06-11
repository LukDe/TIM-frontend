import mockery from 'mockery'
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import Navbar from './index'
import NavbarItem from '../NavbarItem'

describe('<Navbar />', function () {
  const doc = require('jsdom').jsdom('<!doctype html><html><body></body></html>')
  const window = doc.defaultView
  global.$ = global.jQuery = require('jquery')(window)

  beforeEach(function () {
    // Mocks the image files, preventing errors on import.
    mockery.enable()
    mockery.registerMock('../../img/tim_gradient.svg', '')
  })

  it('should contain three <NavbarItem />', function () {
    const wrapper = shallow(
      <Navbar selection="RANKING" onClick={() => {}} />
    )
    expect(wrapper.find(NavbarItem)).to.have.length(3)
  })

  it('should have onClick function called when <NavbarItem /> is clicked', function () {
    const onClick = sinon.spy()
    const wrapper = shallow(
      <Navbar selection="RANKING" onClick={onClick} />
    )
    expect(onClick.calledOnce).to.be.false
    wrapper.find(NavbarItem).at(0).simulate('click')
    expect(onClick.calledOnce).to.be.true
    wrapper.find(NavbarItem).at(1).simulate('click')
    expect(onClick.calledTwice).to.be.true
    wrapper.find(NavbarItem).at(2).simulate('click')
    expect(onClick.calledThrice).to.be.true
  })

  it('renders a dropdown when username is passed', function () {
    const wrapper = shallow(
      <Navbar selection="RANKING" onClick={() => {}} username="kitten" />
    )
    expect(wrapper).to.have.descendants('.ui.dropdown.item')
  })

  it('renders a button when username is not passed', function () {
    const wrapper = shallow(
      <Navbar selection="RANKING" onClick={() => {}} />
    )
    expect(wrapper).to.not.have.descendants('.ui.dropdown.item')
  })
})
