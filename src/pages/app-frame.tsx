import * as React from 'react';
import { connect } from 'redux-zero/react';
import { AppBar } from  'react-toolbox/lib/app_bar';

import { CelebrityReduxState } from '../store';

export interface CelebrityRootProps {
  currentPage: string
}

const AppFrame = (props: CelebrityRootProps) => {
  const { currentPage } = props;
  return (
    <div>
      <AppBar>
        {currentPage}
      </AppBar>
    </div>
  )
}

const mapToProps = ( state: CelebrityReduxState ) => state;

export default connect(mapToProps)(AppFrame);