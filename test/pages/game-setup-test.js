import * as React from 'react';

import { GameSetup } from 'pages/game-setup'

describe('GameSetup', () => {
  const gameSetup = {}

  it('should render GameSetup', () => {
    const wrapper = shallow(<GameSetup />)
    expect(wrapper.find('div').length).to.equal(1)
  })
})