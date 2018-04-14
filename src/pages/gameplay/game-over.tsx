import * as React from "react";
import { connect } from "redux-zero/react";
import { RouterProps } from "react-router";

import actions, { ActionPropTypes } from "actions";
import { CelebrityReduxState } from "store";

type GameOverProps = CelebrityReduxState & ActionPropTypes & RouterProps;

export class GameOver extends React.Component<GameOverProps, {}> {
  constructor(props: GameOverProps) {
    super(props);
  }

  render() {
    return <div data-test="game-over">GAME OVER</div>;
  }
}

export default connect(() => {}, actions)(GameOver);
