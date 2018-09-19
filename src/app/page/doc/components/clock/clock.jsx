import React, { Component } from 'react';
import Toggle from '../toggle/toggle'
export default class Clock extends Component {
  interval;
  constructor(props) {
    super();
    this.state = {
      date: new Date()
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h1>clock</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
        <Toggle/>
      </div>
    );
  }
}
