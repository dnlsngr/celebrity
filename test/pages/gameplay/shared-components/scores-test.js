import * as React from "react";

import { Scores } from "pages/gameplay/shared-components/scores";

describe("Scores", () => {
  it("should render Scores", () => {
    const wrapper = shallow(<Scores team1={1} team2={0} />);
    expect(wrapper.find('[data-test="scores"]').length).to.equal(1);
  });
});
