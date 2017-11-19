import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'redux-zero/react';

import store from './store';
import AppFrame from 'pages/app-frame';

export const CelebrityRoot = () => {
  return (
    <Provider store={store}>
      <AppFrame />
    </Provider>
  )
};

ReactDOM.render(
  <CelebrityRoot />, document.getElementById('react-root')
);
