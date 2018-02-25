import * as React from 'react'

import { NewRound } from 'pages/gameplay/new-round'

describe('NewRound', () => {
  it('should render NewRound', () => {
    const wrapper = shallow(<NewRound />)
    expect(wrapper.find('[data-test="new-round"]').length).to.equal(1)
  })
})