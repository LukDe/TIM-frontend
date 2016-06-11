import jsdom from 'jsdom'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Link } from 'react-router'

import NavbarItem from './index'

// Sets a fake DOM for testing.
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

describe('<NavbarItem />', function () {
  let onClick, navbarItem

  beforeEach(function () {
    onClick = sinon.spy()
    navbarItem = (
      <NavbarItem to="/ranking"
                  icon="doctor"
                  onClick={onClick}
                  name="Ranking"
                  selected={true} />
    )
  })

  it('should contain one <Link /> component', function () {
    const wrapper = shallow(navbarItem)
    expect(wrapper).to.have.exactly(1).descendants(Link)
  })

  it('should call onClick when clicked', function () {
    const wrapper = shallow(navbarItem)
    expect(onClick.calledOnce).to.be.false
    wrapper.find(Link).simulate('click')
    expect(onClick.calledOnce).to.be.true
  })

  it('should have an `active` class when selected', function () {
    const wrapper = mount(navbarItem)
    expect(wrapper.find(Link)).to.have.className('active')
    wrapper.setProps({ selected: false })
    expect(wrapper.find(Link)).to.not.have.className('active')
  })
})
