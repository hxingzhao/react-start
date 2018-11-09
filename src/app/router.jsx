import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Home from './page/home/home';
import Doc from './page/doc/doc';

export const TestContext = React.createContext({
    type: 1,
    fn: () => {}
});
export class Router extends React.Component {
    render() {
        return (
            <HashRouter>
                <TestContext.Provider value={{
                  type: 22,
                  fn: () => {
                    console.log(111);
                  }
                }}>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/doc" component={Doc} />
                        <Route exact path="/home" component={Home} />
                    </div>
                </TestContext.Provider>
            </HashRouter>
        );
    }
}

export default Router;
