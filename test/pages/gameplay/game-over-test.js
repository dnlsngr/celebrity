import * as React from "react";

import { GameOver } from "pages/gameplay/game-over";

describe("GameOver", () => {
  it("should render GameOver", () => {
    const scores = { team1: 1, team2: 0 };
    const wrapper = shallow(<GameOver scores={scores} />);
    expect(wrapper.find('[data-test="game-over"]').length).to.equal(1);
  });
});
