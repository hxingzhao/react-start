import * as React from "react";
import "./style.scss";
// const logo = require("./assets/svg/logo.svg");
const logo = require("./assets/img/luv.jpg");
function App() {
  return (
    <div className="App">
      <div className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <span className="icons tianqi"></span> */}
        <img src={logo} className="App-logo" alt="logo" alt=""/>
        <h2>Welcome to React-Start</h2>
      </div>
      <p className="App-intro">
      马丁路德金在他的自传里说过这样一段话：人生最痛苦的事，
      莫过于不断努力但梦想永远无法实现，而我们的人生正是如此。
      令人欣慰的是，我听见时间长廊另一端有个声音说，" 也许今天无法实现，明天也不能。
      重要的是，它在你心里。重要的是，你一直在努力。"
      <span>—— 马丁·路德·金</span>
      </p>
    </div>
  );
}

export default App;
