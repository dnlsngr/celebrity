import * as React from "react";

import { NewRound } from "pages/gameplay/new-round";

describe("NewRound", () => {
  it("should render NewRound with proper roundNumber", () => {
    const roundInfoProps = {
      roundNumber: 1,
      namesMissedFromLastRound: []
    };
    const wrapper = shallow(<NewRound roundInfo={roundInfoProps} />);
    expect(wrapper.find('[data-test="new-round"]').length).to.equal(1);
    expect(
      wrapper.find('[data-test="round-start-header"]').text()
    ).to.have.string("Round 1");
  });

  it("should show no names missed if none are provided", () => {
    const roundInfoProps = {
      roundNumber: 1,
      namesMissedFromLastRound: []
    };
    const wrapper = shallow(<NewRound roundInfo={roundInfoProps} />);
    expect(wrapper.find('[data-test="names-missed"]').length).to.equal(0);
  });

  it("should show names missed if they are provided", () => {
    const NAME_MISSED = "NAME_MISSED";
    const roundInfoProps = {
      roundNumber: 1,
      namesMissedFromLastRound: [NAME_MISSED]
    };
    const wrapper = shallow(<NewRound roundInfo={roundInfoProps} />);
    expect(wrapper.find('[data-test="names-missed"]').length).to.equal(1);
    expect(
      wrapper
        .find('[data-test="names-missed"]')
        .childAt(1)
        .html()
    ).to.contain(NAME_MISSED);
  });

  it("should start turn when clicking Begin Round", () => {
    const readyForTurnStub = sinon.stub();
    const roundInfoProps = {
      roundNumber: 1,
      namesMissedFromLastRound: []
    };
    const wrapper = mount(
      <NewRound roundInfo={roundInfoProps} readyForTurn={readyForTurnStub} />
    );
    const beginRoundButton = wrapper
      .find('[data-test="begin-round-button"]')
      .find("button");
    beginRoundButton.simulate("click");
    expect(readyForTurnStub.calledOnce).to.be.true;
  });
});
