import * as React from "react";
import { AppBar, Button, Card } from "material-ui";
import { connect } from "redux-zero/react";
import { RouterProps } from "react-router";

import actions, { ActionPropTypes } from "actions";
import { CelebrityReduxState } from "store";
import { getRoundMessage, getRoundRules } from "../gameplay-helpers";

import * as styles from "./new-round.css";
import * as globalStyles from "../../global-styles.css";

type NewRoundProps = CelebrityReduxState & ActionPropTypes & RouterProps;

export class NewRound extends React.Component<NewRoundProps, {}> {
  constructor(props: NewRoundProps) {
    super(props);

    this.beginRound = this.beginRound.bind(this);
    this.generateNamesMissed = this.generateNamesMissed.bind(this);
  }

  beginRound(e: any) {
    this.props.readyForTurn();
  }

  generateNamesMissed(names: string[]) {
    return (
      <div data-test="names-missed" className={styles.namesMissed}>
        <h2>Here are the names you missed</h2>
        {names.map((name: string, index: number) => (
          <Card key={index} className={styles.namesMissedCard}>
            {name}
          </Card>
        ))}
      </div>
    );
  }

  render() {
    const { roundNumber, namesMissedFromLastRound } = this.props.roundInfo;

    const namesMissed =
      namesMissedFromLastRound.length > 0
        ? this.generateNamesMissed(namesMissedFromLastRound)
        : null;
    return (
      <div data-test="new-round">
        <AppBar position="static">
          <h1
            data-test="round-start-header"
            className={globalStyles.headerText}
          >
            {getRoundMessage(roundNumber)}
          </h1>
        </AppBar>
        <div className={styles.newRoundContainer}>
          {namesMissed}
          <div className={styles.roundRules}>{getRoundRules(roundNumber)}</div>
          <Button
            variant="raised"
            data-test="begin-round-button"
            onClick={this.beginRound}
            className={styles.beginRoundButton}
          >
            Got It
          </Button>
        </div>
      </div>
    );
  }
}

const mapToProps = (state: CelebrityReduxState) => state;
export default connect(mapToProps, actions)(NewRound);
