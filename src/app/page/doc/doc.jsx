import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './doc.scss';
import Game from 'game';
export default class Doc extends Component {
  render() {
    return (
      <div>
        <header>
          <Link className="home" to="/home">
            Home
          </Link>
        </header>
        <div className="layout">
          <div className="layout-nav">
            <ul>
              <li>列表一</li>
            </ul>
          </div>
          <div className="layout-content">
            <Route path="/Game" component={Game} />
          </div>
        </div>
      </div>
    );
  }
}
