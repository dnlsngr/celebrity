import * as React from 'react'

import { PlayRound } from 'pages/gameplay/play-round'

describe('PlayRound', () => {
  const roundInfo = {
    roundNumber : 1
  }
  const turnInfo = {
    currentName: 'Harrison Ford',
    correctThisTurn: 0,
    skippedThisTurn: 0,
    illegalThisTurn: 0,
    secondsRemaining: 60,
  }

  it('should render PlayRound', () => {
    const wrapper = shallow(<PlayRound roundInfo={roundInfo} turnInfo={turnInfo}/>)
    expect(wrapper.find('[data-test="play-round"]').length).to.equal(1)
  })

  it('should call nameCorrect when correct button clicked', () => {
    const nameCorrectStub = sinon.stub()
    const wrapper = mount(
      <PlayRound roundInfo={roundInfo} turnInfo={turnInfo} nameCorrect={nameCorrectStub}/>)
    wrapper.find('[data-test="correct-button"]').find('.ant-btn').simulate('click')
    expect(nameCorrectStub.calledOnce).to.be.true
  })

  it('should call nameSkipped when correct button clicked', () => {
    const nameSkippedStub = sinon.stub()
    const wrapper = mount(
      <PlayRound roundInfo={roundInfo} turnInfo={turnInfo} nameSkipped={nameSkippedStub}/>)
    wrapper.find('[data-test="skip-button"]').find('.ant-btn').simulate('click')
    expect(nameSkippedStub.calledOnce).to.be.true
  })

  it('should call illegalClue when correct button clicked', () => {
    const illegalClueStub = sinon.stub()
    const wrapper = mount(
      <PlayRound roundInfo={roundInfo} turnInfo={turnInfo} illegalClue={illegalClueStub}/>)
    wrapper.find('[data-test="illegal-clue-button"]').find('.ant-btn').simulate('click')
    expect(illegalClueStub.calledOnce).to.be.true
  })

  it('should render an button to end turn if no currentName is specified', () => {
    const turnInfoNoCurrentName = {
      correctThisTurn: 0,
      skippedThisTurn: 0,
      illegalThisTurn: 0,
      secondsRemaining: 60,
    }
    const wrapper = shallow(<PlayRound roundInfo={roundInfo} turnInfo={turnInfoNoCurrentName}/>)
    expect(wrapper.find('[data-test="end-turn-button"]').length).to.equal(1)
  })
})