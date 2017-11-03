import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface CelebrityRootProps {
  testProp: string
}

export const CelebrityRoot = (props: CelebrityRootProps) => {
  const { testProp } = props;
  return (
    <div>{`Here is a test prop: ${testProp}` }</div>
  )
}

ReactDOM.render(
  <CelebrityRoot testProp="BANANA" />, document.getElementById('react-root')
)