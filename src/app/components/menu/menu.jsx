import React, { Component } from 'react';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: null,
        };
      }
  /**
   * 列表选中事件
   * @param {Item} item 选中项
   **/
  selectList(item) {}

  /**
   * 列表展开或关闭事件
   * @param {string} open 展开状态
   * **/
  toggle(open) {}

  render() {
    return (
      <div>
        <ul>
          <li>1</li>
        </ul>
      </div>
    );
  }
}
