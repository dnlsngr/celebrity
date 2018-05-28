import * as React from "react";

import { ReadyForTurn } from "pages/gameplay/ready-for-turn";

describe("ReadyForTurn", () => {
  const scores = [{ teamNumber: 1, score: 0 }, { teamNumber: 2, score: 0 }];

  it("should render ReadyForTurn without scores without rules on first turn first round", () => {
    const roundInfo = {
      roundNumber: 1,
      turnNumber: 1
    };
    const wrapper = shallow(
      <ReadyForTurn scores={scores} roundInfo={roundInfo} />
    );
    expect(wrapper.find('[data-test="ready-for-turn"]').length).to.equal(1);
    expect(wrapper.find('[data-test="rules"]').length).to.equal(0);
    expect(wrapper.find('[data-test="team-score"]').length).to.equal(0);
  });

  it("should render ReadyForTurn with scores with rules on second turn", () => {
    const roundInfo = {
      roundNumber: 1,
      turnNumber: 2
    };
    const turnInfo = {
      correctThisTurn: 1
    };
    const wrapper = shallow(
      <ReadyForTurn scores={scores} roundInfo={roundInfo} turnInfo={turnInfo} />
    );
    expect(wrapper.find('[data-test="ready-for-turn"]').length).to.equal(1);
    expect(wrapper.find('[data-test="rules"]').length).to.equal(1);
    expect(wrapper.find('[data-test="team-score"]').length).to.equal(2);
  });

  it("should render ReadyForTurn with scores without rules on second round first turn", () => {
    const roundInfo = {
      roundNumber: 2,
      turnNumber: 1
    };
    const turnInfo = {
      correctThisTurn: 1
    };
    const wrapper = shallow(
      <ReadyForTurn scores={scores} roundInfo={roundInfo} turnInfo={turnInfo} />
    );
    expect(wrapper.find('[data-test="ready-for-turn"]').length).to.equal(1);
    expect(wrapper.find('[data-test="rules"]').length).to.equal(0);
    expect(wrapper.find('[data-test="team-score"]').length).to.equal(2);
  });

  it("should call beginTurn when button is clicked", () => {
    const roundInfo = {
      roundNumber: 1
    };
    const beginTurnStub = sinon.stub();
    const wrapper = mount(
      <ReadyForTurn
        scores={[]}
        roundInfo={roundInfo}
        beginTurn={beginTurnStub}
      />
    );
    wrapper
      .find('[data-test="begin-turn-button"]')
      .find("button")
      .simulate("click");
    expect(beginTurnStub.calledOnce).to.be.true;
  });
});
