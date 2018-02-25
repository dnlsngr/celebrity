import * as React from 'react';
import { connect } from 'redux-zero/react';

import actions, { ActionPropTypes } from 'actions';

interface NewRoundProps extends ActionPropTypes {
}

export class NewRound extends React.Component<NewRoundProps, {}> {
  constructor(props: NewRoundProps){
    super(props);
  }

  render() {
    return (
      <div data-test="new-round">
      </div>
    )
  }
}

export default connect(() => {}, actions)(NewRound);