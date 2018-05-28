import actions from "actions";
import * as _ from "lodash";
import { initialState } from "store";
import {
  NEW_ROUND_PAGE,
  TURN_READY_PAGE,
  PLAY_ROUND_PAGE,
  GAME_OVER_PAGE
} from "store";

describe("actions", () => {
  const underTest = actions();

  describe("addName", () => {
    it("should add a name to allNames and gameSetup.currentNames", () => {
      const state = _.clone(initialState);
      const newName = "newName";
      const result = underTest.addName(state, newName);
      expect(result.allNames).to.include(newName);
      expect(result.gameSetup.currentNames).to.contain(newName);
    });
  });

  describe("clearForNextPlayer", () => {
    it("should clear current names and increment currentPlayerNum", () => {
      const state = _.clone(initialState);
      state.gameSetup.currentNames = ["toDelete"];
      state.gameSetup.currentPlayerNum = 1;
      const result = underTest.clearForNextPlayer(state);
      expect(result.gameSetup.currentNames).to.be.empty;
      expect(result.gameSetup.currentPlayerNum).to.equal(2);
    });
  });

  describe("finalizePlayers", () => {
    it("should set numPlayers if the current player has entered a name", () => {
      const state = _.clone(initialState);
      state.gameSetup.currentNames = ["toDelete"];
      state.gameSetup.currentPlayerNum = 2;
      const result = underTest.finalizePlayers(state);
      expect(result.numPlayers).to.equal(2);
    });
    it("should set numPlayers to currentPlayerNum-1 if the current player has not entered anything", () => {
      const state = _.clone(initialState);
      state.gameSetup.currentNames = [];
      state.gameSetup.currentPlayerNum = 3;
      const result = underTest.finalizePlayers(state);
      expect(result.numPlayers).to.equal(2);
    });
  });

  describe("beginRound", () => {
    it("should update namesMissed, reset turn counter, and set current page", () => {
      const state = _.clone(initialState);
      const roundNumber = 0;
      const namesFromLastRound = "name1";
      const allNames = ["name1", "name2"];
      state.roundInfo.remainingNamesForRound = namesFromLastRound;
      state.allNames = allNames;

      const result = underTest.beginRound(state, roundNumber);
      expect(result.currentPage).to.equal(NEW_ROUND_PAGE);
      expect(result.roundInfo.roundNumber).to.equal(roundNumber);
      expect(result.roundInfo.turnNumber).to.equal(-1);
      expect(result.roundInfo.namesMissedFromLastRound).to.equal(
        namesFromLastRound
      );
      expect(result.roundInfo.remainingNamesForRound).to.equal(allNames);
    });
  });

  describe("readyForTurn", () => {
    it("should update turn counter and set current page", () => {
      const state = _.clone(initialState);
      state.roundInfo.turnNumber = 1;

      const result = underTest.readyForTurn(state);
      expect(result.currentPage).to.equal(TURN_READY_PAGE);
      expect(result.roundInfo.turnNumber).to.equal(2);
    });
  });

  describe("beginTurn", () => {
    it("should reset turnInfo with namesForTurn and set current page", () => {
      const state = _.clone(initialState);
      const namesForTurn = ["name1", "name2"];
      state.roundInfo.remainingNamesForRound = namesForTurn;

      const result = underTest.beginTurn(state);
      expect(result.currentPage).to.equal(PLAY_ROUND_PAGE);
      expect(result.turnInfo.namesForTurn.length).to.equal(1);
      expect(result.turnInfo.namesForTurn).to.contain("name1");
      expect(result.turnInfo.skippedOrIllegalNames.length).to.equal(0);
      expect(result.turnInfo.currentName).to.equal("name2");
      expect(result.turnInfo.correctThisTurn).to.equal(0);
      expect(result.turnInfo.skippedThisTurn).to.equal(0);
      expect(result.turnInfo.illegalThisTurn).to.equal(0);
    });
  });

  describe("processName", () => {
    it("nameCorrect should increment correctThisTurn and set next nameForTurn as currentName", () => {
      const state = _.clone(initialState);
      const namesForTurn = ["name1", "name2"];
      state.turnInfo.namesForTurn = namesForTurn;
      state.turnInfo.correctThisTurn = 0;
      state.turnInfo.skippedThisTurn = 0;
      state.turnInfo.illegalThisTurn = 0;

      const result = underTest.nameCorrect(state);
      expect(result.turnInfo.namesForTurn.length).to.equal(1);
      expect(result.turnInfo.namesForTurn).to.contain("name1");
      expect(result.turnInfo.skippedOrIllegalNames.length).to.equal(0);
      expect(result.turnInfo.currentName).to.equal("name2");
      expect(result.turnInfo.correctThisTurn).to.equal(1);
      expect(result.turnInfo.skippedThisTurn).to.equal(0);
      expect(result.turnInfo.illegalThisTurn).to.equal(0);
    });

    it("nameSkipped should increment skippedThisTurn and set next nameForTurn as currentName", () => {
      const state = _.clone(initialState);
      const namesForTurn = ["name1", "name2"];
      const currentName = "name3";
      state.turnInfo.namesForTurn = namesForTurn;
      state.turnInfo.currentName = currentName;
      state.turnInfo.correctThisTurn = 0;
      state.turnInfo.skippedThisTurn = 0;
      state.turnInfo.illegalThisTurn = 0;

      const result = underTest.nameSkipped(state);
      expect(result.turnInfo.namesForTurn.length).to.equal(1);
      expect(result.turnInfo.namesForTurn).to.contain("name1");
      expect(result.turnInfo.skippedOrIllegalNames.length).to.equal(1);
      expect(result.turnInfo.skippedOrIllegalNames).to.contain(currentName);
      expect(result.turnInfo.currentName).to.equal("name2");
      expect(result.turnInfo.correctThisTurn).to.equal(0);
      expect(result.turnInfo.skippedThisTurn).to.equal(1);
      expect(result.turnInfo.illegalThisTurn).to.equal(0);
    });

    it("illegalClue should increment illegalThisTurn and set next nameForTurn as currentName", () => {
      const state = _.clone(initialState);
      const namesForTurn = ["name1", "name2"];
      const currentName = "name3";
      state.turnInfo.namesForTurn = namesForTurn;
      state.turnInfo.currentName = currentName;
      state.turnInfo.correctThisTurn = 0;
      state.turnInfo.skippedThisTurn = 0;
      state.turnInfo.illegalThisTurn = 0;

      const result = underTest.illegalClue(state);
      expect(result.turnInfo.namesForTurn.length).to.equal(1);
      expect(result.turnInfo.namesForTurn).to.contain("name1");
      expect(result.turnInfo.skippedOrIllegalNames.length).to.equal(1);
      expect(result.turnInfo.skippedOrIllegalNames).to.contain(currentName);
      expect(result.turnInfo.currentName).to.equal("name2");
      expect(result.turnInfo.correctThisTurn).to.equal(0);
      expect(result.turnInfo.skippedThisTurn).to.equal(0);
      expect(result.turnInfo.illegalThisTurn).to.equal(1);
    });
  });
});
