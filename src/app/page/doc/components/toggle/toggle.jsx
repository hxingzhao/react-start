import React, { Component } from 'react';
function UserGreeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    <h1>Please sign up.</h1>;
  }
}

export default class Toggle extends Component {
  constructor(props) {
    super();
    this.state = {
      isToggleOn: true
    };
    this.clickBtn = this.clickBtn.bind(this);
  }
  clickBtn() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.clickBtn}>
          {this.state.isToggleOn ? 'true' : 'false'}
        </button>
        <UserGreeting isLoggedIn={this.state.isToggleOn} />
      </div>
    );
  }
}
