import * as React from 'react';

import { GameSetup } from 'pages/game-setup/game-setup'

describe('GameSetup', () => {

  it('should render GameSetup', () => {
    const wrapper = shallow(<GameSetup currentPlayerNum={1} currentNames={[]}/>)
    expect(wrapper.find('[data-test="game-setup"]').length).to.equal(1)
  })

  it('should update state when typing and add name to list', () => {
    const addNameSpy = sinon.spy()
    const newName = 'BANANA'
    const updatedValue = { target: { value: newName}}

    const wrapper = mount(<GameSetup currentPlayerNum={1}
                                     currentNames={[]}
                                     addName={addNameSpy}/>)
    const nameInput = wrapper.find('[data-test="name-input"]').find('.ant-input')

    nameInput.simulate('change', updatedValue)
    expect(wrapper.state('celebrityName')).to.be.equal(newName)

    const addNameButton = wrapper.find('[data-test="add-name-button"]').find('.ant-btn')
    addNameButton.simulate('click')
    expect(addNameSpy.calledWith(newName)).to.be.true
    expect(wrapper.state('celebrityName')).to.be.equal('')
  })

  it('should clear currentNames and increment player on click done', () => {
    const clearForNextPlayerSpy = sinon.spy()

    const wrapper = mount(<GameSetup currentPlayerNum={1}
                                     currentNames={['BANANA']}
                                     clearForNextPlayer={clearForNextPlayerSpy}/>)

    const nextPlayerButton = wrapper.find('[data-test="next-player-button"]').find('.ant-btn')
    nextPlayerButton.simulate('click')
    expect(clearForNextPlayerSpy.calledWith()).to.be.true
    expect(wrapper.state('celebrityName')).to.be.equal('')
  })
})