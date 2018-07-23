import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Home from './page/home/home';
import Doc from './page/doc/doc';
export class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={Home} />  
          <Route path="/doc" component={Doc} />
          <Route exact path="/home" component={Home} />
        </div>
      </HashRouter>
    );
  }
}

export default Router;
