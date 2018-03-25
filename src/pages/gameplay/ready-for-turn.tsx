import * as React from 'react';
import { connect } from 'redux-zero/react';
import { RouterProps } from 'react-router'

import actions, { ActionPropTypes } from 'actions';
import { CelebrityReduxState } from 'store'

type ReadyForTurnProps = CelebrityReduxState & ActionPropTypes & RouterProps

export class ReadyForTurn extends React.Component<ReadyForTurnProps, {}> {
  constructor(props: ReadyForTurnProps){
    super(props);
  }

  render() {
    return (
      <div data-test="ready-for-turn">
        READY FOR TURN
      </div>
    )
  }
}

export default connect(() => {}, actions)(ReadyForTurn);