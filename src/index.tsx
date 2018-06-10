require("./favicon.ico");

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "redux-zero/react";
import { BrowserRouter, Route } from "react-router-dom";

import store from "./store";
import GameplayFrame from "pages/gameplay/gameplay-frame";
import GameSetup from "pages/game-setup";

import * as styles from "./page-styles.css";

export const CelebrityRoot = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={styles.page}>
          <Route exact path="/" component={GameSetup} />
          <Route path="/gameplay" component={GameplayFrame} />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<CelebrityRoot />, document.getElementById("react-root"));
