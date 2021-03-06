import * as React from "react";

import { GameSetup } from "pages/game-setup";

describe("GameSetup", () => {
  it("should render GameSetup", () => {
    const gameSetupProps = {
      currentPlayerNum: 1,
      currentNames: []
    };
    const wrapper = shallow(<GameSetup gameSetup={gameSetupProps} />);
    expect(wrapper.find('[data-test="game-setup"]').length).to.equal(1);
  });

  it("should update state when typing and add name to list", () => {
    const addNameSpy = sinon.spy();
    const newName = "BANANA";
    const updatedValue = { target: { value: newName } };

    const gameSetupProps = {
      currentPlayerNum: 1,
      currentNames: []
    };
    const wrapper = mount(
      <GameSetup gameSetup={gameSetupProps} addName={addNameSpy} />
    );
    const nameInput = wrapper.find('[data-test="name-input"]').find("input");

    nameInput.simulate("change", updatedValue);
    expect(wrapper.state("celebrityName")).to.be.equal(newName);

    const addNameButton = wrapper
      .find('[data-test="add-name-button"]')
      .find("button");
    addNameButton.simulate("click");
    expect(addNameSpy.calledWith(newName)).to.be.true;
    expect(wrapper.state("celebrityName")).to.be.equal("");
  });

  it("should clear currentNames and increment player on click done", () => {
    const clearForNextPlayerSpy = sinon.spy();

    const gameSetupProps = {
      currentPlayerNum: 1,
      currentNames: ["BANANA"]
    };
    const wrapper = mount(
      <GameSetup
        gameSetup={gameSetupProps}
        clearForNextPlayer={clearForNextPlayerSpy}
      />
    );

    const nextPlayerButton = wrapper
      .find('[data-test="next-player-button"]')
      .find("button");
    nextPlayerButton.simulate("click");
    expect(clearForNextPlayerSpy.calledWith()).to.be.true;
    expect(wrapper.state("celebrityName")).to.be.equal("");
  });
});
