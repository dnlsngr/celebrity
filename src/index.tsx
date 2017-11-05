import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppBar } from  'react-toolbox/lib/app_bar';

export interface CelebrityRootProps {
  testProp: string
}

export const CelebrityRoot = (props: CelebrityRootProps) => {
  const { testProp } = props;
  return (
    <AppBar>
      <div>{`Here is a test prop: ${testProp}` }</div>
    </AppBar>
  )
}

ReactDOM.render(
  <CelebrityRoot testProp="BANANA" />, document.getElementById('react-root')
)