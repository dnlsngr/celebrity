import * as React from "react";

import { ReadyForTurn } from "pages/gameplay/ready-for-turn";

describe("ReadyForTurn", () => {
  it("should render ReadyForTurn with scores", () => {
    const scores = [{ teamNumber: 1, score: 0 }, { teamNumber: 2, score: 0 }];
    const roundInfo = {
      roundNumber: 1
    };
    const wrapper = shallow(
      <ReadyForTurn scores={scores} roundInfo={roundInfo} />
    );
    expect(wrapper.find('[data-test="ready-for-turn"]').length).to.equal(1);
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
