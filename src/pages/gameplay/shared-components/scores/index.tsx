import * as React from "react";
import { Card } from "material-ui";
import { ScoresState } from "store";

import * as styles from "./scores.css";

export const Scores = (props: ScoresState) => {
  const { team1, team2 } = props;
  return (
    <Card data-test="scores" className={styles.scoresCard}>
      <div key="1" data-test="team-score">
        {`Team 1: ${team1}`}
      </div>
      <div key="2" data-test="team-score">
        {`Team 2: ${team2}`}
      </div>
    </Card>
  );
};
