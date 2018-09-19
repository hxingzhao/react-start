import React, { Component } from 'react';

export default class MyMenu extends Component {
  /**
   * 点击菜单事件
   * @param {event} el
   */
  selectMenu(el) {
    console.log(el);
  }
  /**
   * 控制子菜单的展开收起
   * @param {event} el
   */
  toggleUl(el) {
    console.log(el);
  }
 
  render() {
    return (
      <div>
        <ul>
          <li onClick={this.toggleUl}>
            <div>1测试</div>
            <ul>
              <li>测试1的二级菜单1</li>
              <li>测试1的二级菜单2</li>
              <li>测试1的二级菜单3</li>
              <li>测试1的二级菜单4</li>
            </ul>
          </li>
          <li>2测试</li>
          <li>3测试</li>
          <li>4测试</li>
          <li>5测试</li>
          <li>6测试</li>
        </ul>
      </div>
    );
  }
}
