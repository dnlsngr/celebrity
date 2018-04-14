import * as React from "react";

import { GameplayFrame } from "pages/gameplay/gameplay-frame";
import NewRound from "pages/gameplay/new-round";
import ReadyForTurn from "pages/gameplay/ready-for-turn";
import PlayRound from "pages/gameplay/play-round";
import { NEW_ROUND_PAGE, TURN_READY_PAGE, PLAY_ROUND_PAGE } from "store";

describe("GameplayFrame", () => {
  it("should render NewRound when specified", () => {
    const wrapper = shallow(<GameplayFrame currentPage={NEW_ROUND_PAGE} />);
    expect(wrapper.find(NewRound).length).to.equal(1);
  });

  it("should render ReadyForTurn when specified", () => {
    const wrapper = shallow(<GameplayFrame currentPage={TURN_READY_PAGE} />);
    expect(wrapper.find(ReadyForTurn).length).to.equal(1);
  });

  it("should render PlayRound when specified", () => {
    const wrapper = shallow(<GameplayFrame currentPage={PLAY_ROUND_PAGE} />);
    expect(wrapper.find(PlayRound).length).to.equal(1);
  });
});
