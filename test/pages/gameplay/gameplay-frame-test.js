import * as React from 'react';

import { GameplayFrame } from 'pages/gameplay/gameplay-frame'
import NewRound from 'pages/gameplay/new-round'
import { NEW_ROUND_PAGE } from 'store'

describe('GameplayFrame', () => {

  it('should render NewRound by default', () => {
    const wrapper = shallow(<GameplayFrame currentPage={NEW_ROUND_PAGE} />)
    expect(wrapper.find(NewRound).length).to.equal(1)
  })
})