import React, { Component } from 'react';

class Columns extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return this.props.userList.map(userInfo => {
            <React.Fragment key={userInfo.id}>
                <p>{userInfo.name}</p>
            </React.Fragment>;
        });
    }
}

export default class MyFragment extends React.Component {
    userArr = [
        { id: 312345, name: 'hu' },
        { id: 324324, name: 'xin' },
        { id: 123113, name: 'zha' }
    ];
    constructor(props) {
        super(props);
    }
    render() {
        return <Columns userList={this.userArr} />;
    }
}
