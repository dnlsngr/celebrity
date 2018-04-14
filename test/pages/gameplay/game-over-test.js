import * as React from "react";

import { GameOver } from "pages/gameplay/game-over";

describe("GameOver", () => {
  it("should render GameOver", () => {
    const wrapper = shallow(<GameOver />);
    expect(wrapper.find('[data-test="game-over"]').length).to.equal(1);
  });
});
