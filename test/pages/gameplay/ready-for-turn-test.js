import * as React from 'react'

import { ReadyForTurn } from 'pages/gameplay/ready-for-turn'

describe('ReadyForTurn', () => {
  it('should render ReadyForTurn', () => {
    const wrapper = shallow(<ReadyForTurn />)
    expect(wrapper.find('[data-test="ready-for-turn"]').length).to.equal(1)
  })
})