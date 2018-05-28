import { getRoundMessage } from "pages/gameplay/gameplay-helpers";

describe("Gameplay Helper getRoundMessage", () => {
  it("should return a valid message for a valid round", () => {
    const message = getRoundMessage(0);
    expect(message.indexOf("Round 1")).to.be.above(-1);
  });
});
