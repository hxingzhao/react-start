import React, { Component } from 'react';

// function CustomTextInput(props) {
//     return (
//         <div>
//             <input ref={props.inputRef} />
//         </div>
//     );
// }
class CustomTextInput extends React.Component {
    render() {
        return (
            <div>
                <input ref={this.props.inputRef} />
            </div>
        );
    }
}

export default class Parent extends React.Component {
    clickBtn() {
        console.log(this.inputElement);
    }
    render() {
        return (
            <div>
                <CustomTextInput inputRef={el => (this.inputElement = el)} />
                <button
                    onClick={() => {
                        this.clickBtn();
                    }}
                >
                    点击
                </button>
            </div>
        );
    }
}
