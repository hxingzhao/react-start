import * as React from "react";
import "./home.scss";
import { Link } from "react-router-dom";
// const logo = require("./assets/svg/logo.svg");
const logo = require("../../../assets/img/luv.jpg");
function Home() {
  return (
    <div className="Home">
      <div className="Home-header">
        {/* <img src={logo} className="Home-logo" alt="logo" /> */}
        {/* <span className="icons tianqi"></span> */}
        <img src={logo} className="Home-logo" alt="logo" alt="" />
        <h2>Welcome to React-Start</h2>
      </div>
      <p className="Home-intro">
        马丁路德金在他的自传里说过这样一段话：人生最痛苦的事，
        莫过于不断努力但梦想永远无法实现，而我们的人生正是如此。
        令人欣慰的是，我听见时间长廊另一端有个声音说，"
        也许今天无法实现，明天也不能。
        重要的是，它在你心里。重要的是，你一直在努力。"
        <span>—— 马丁·路德·金</span>
      </p>
      <span className="go-dir">
        <Link to="/doc">Start</Link>
      </span>
    </div>
  );
}

export default Home;
