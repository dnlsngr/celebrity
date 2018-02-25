import * as React from 'react';

import { AppFrame } from 'pages/app-frame'
import GameSetup from 'pages/game-setup/game-setup'
import { GAME_SETUP_PAGE } from 'store';

describe('AppFrame', () => {

  it('should render GameSetup in setup mode', () => {
    const wrapper = shallow(<AppFrame currentPage={GAME_SETUP_PAGE} gameSetup={{}} />)
    expect(wrapper.find(GameSetup).length).to.equal(1)
  })
})