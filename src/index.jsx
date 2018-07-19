import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './assets/fonts/iconfont.scss';
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
