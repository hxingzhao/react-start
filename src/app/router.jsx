import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./page/home/home";
import Doc from "./page/doc/doc";
export class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/doc" component={Doc} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
