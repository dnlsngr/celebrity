import * as React from "react";
import { Input, Button, Card, AppBar, Grid } from "material-ui";
import { connect } from "redux-zero/react";
import { RouterProps } from "react-router";

import actions, { ActionPropTypes } from "actions";
import { CelebrityReduxState } from "store";

import * as styles from "./game-setup.css";
import * as globalStyles from "../global-styles.css";

type GameSetupProps = CelebrityReduxState & ActionPropTypes & RouterProps;

interface GameSetupState {
  celebrityName: string;
}

export class GameSetup extends React.Component<GameSetupProps, GameSetupState> {
  private nameInput;

  constructor(props: GameSetupProps) {
    super(props);
    // We keep state of form elements in component state
    this.state = { celebrityName: "" };

    this.handleUpdateName = this.handleUpdateName.bind(this);
    this.handleAddName = this.handleAddName.bind(this);
    this.handleDeleteName = this.handleDeleteName.bind(this);
    this.handleKeyPressOnInput = this.handleKeyPressOnInput.bind(this);
    this.handleNextPlayer = this.handleNextPlayer.bind(this);
    this.handleBeginGame = this.handleBeginGame.bind(this);
  }

  handleUpdateName(e: any) {
    this.setState({ celebrityName: e.target.value });
  }

  handleAddName(e: any) {
    if (this.state.celebrityName.length > 0) {
      this.props.addName(this.state.celebrityName);
      this.setState({ celebrityName: "" });
    }
  }

  handleDeleteName(index: number) {
    this.props.deleteName(index);
  }

  handleKeyPressOnInput(e: any) {
    if (e.key === "Enter") {
      const dummyAddNameEvent = {};
      this.handleAddName(dummyAddNameEvent);
    }
  }

  handleNextPlayer(e: any) {
    this.props.clearForNextPlayer();
    this.nameInput.focus();
    this.setState({ celebrityName: "" }); // In case they had text in the input
  }

  handleBeginGame(e: any) {
    this.props.finalizePlayers();
    this.props.beginRound(0);
    // We must do this programmatically instead of with a Link so that unit tests work
    // https://github.com/ReactTraining/react-router/issues/4795
    this.props.history.push("/gameplay");
  }

  render() {
    const { currentPlayerNum, currentNames } = this.props.gameSetup;

    const namesEntered = (
      <div className={styles.nameCard}>
        {currentNames.map((name: string, index: number) => (
          <div key={index} className={styles.nameCard}>
            <Card key={index}>
              {`${index + 1}. ${name}`}
              <span
                className={styles.deleteButton}
                onClick={() => this.handleDeleteName(index)}
              >
                X
              </span>
            </Card>
          </div>
        ))}
      </div>
    );

    return (
      <div data-test="game-setup">
        <AppBar position="static">
          <h1
            className={globalStyles.headerText}
          >{`Welcome player ${currentPlayerNum}!`}</h1>
        </AppBar>
        <div className={styles.setupContainer}>
          <h2 className={styles.welcomeInstructions}>
            {`Player ${currentPlayerNum}, please enter names of celebrities below. We recommend you enter 8
            names.`}
          </h2>
          <div className={styles.nameInputContainer}>
            <Input
              className={styles.nameInput}
              type="text"
              data-test="name-input"
              value={this.state.celebrityName}
              placeholder={"Enter Celebrity Name Here"}
              inputRef={input => {
                this.nameInput = input;
              }}
              onChange={this.handleUpdateName}
              onKeyPress={this.handleKeyPressOnInput}
            />
          </div>
          <div className={styles.nameInputAddButton}>
            <Button
              variant="raised"
              onClick={this.handleAddName}
              data-test="add-name-button"
            >
              Add
            </Button>
          </div>
          {namesEntered}
          <div className={styles.nextPlayer}>
            <Button
              variant="raised"
              disabled={currentNames.length === 0}
              onClick={this.handleNextPlayer}
              data-test="next-player-button"
            >
              Ready for next player to enter names
            </Button>
          </div>
          <div className={styles.beginGame}>
            <Button
              variant="raised"
              disabled={
                currentPlayerNum === 1 ||
                (currentPlayerNum === 2 && currentNames.length === 0)
              }
              onClick={this.handleBeginGame}
            >
              All players have entered names
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapToProps = (state: CelebrityReduxState) => state;
export default connect(mapToProps, actions)(GameSetup);
