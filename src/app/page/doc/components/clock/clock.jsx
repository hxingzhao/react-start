import React, { Component } from 'react';
import Toggle from '../toggle/toggle'
export default class Clock extends Component {
  interval;
  constructor(props) {
    super();
    this.state = {
      date: new Date()
    };
    this.btnRef = React.createRef();
    this.h2Ref = React.createRef();
    this.btnClick = this.btnClick.bind(this);
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
  btnClick() {
    console.log(this.btnRef);
    console.log(this.h2Ref);
    console.log(this.btn2Ref)
  }
  render() {
    return (
      <div>
        <h1>clock</h1>
        <h2 ref={el => this.h2Ref = el}>It is {this.state.date.toLocaleTimeString()}</h2>
        <Toggle ref={this.btnRef} />
        <Toggle inputRef={el => (this.btn2Ref = el)} />
        <button onClick={this.btnClick}>点击</button>
      </div>
    );
  }
}
