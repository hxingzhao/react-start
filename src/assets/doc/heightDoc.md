### props.children
```
在嵌套组件或元素的时候，如果单独使用了{}，则props.children[index]是一个函数,否则为一个reactDom对象{$$typeof,key,props,type,ref}。

例如：
    <heroList>
        {(...arguments) => <div>这是传过来的信息，用法很灵活。这是props.children[0]得到的是一个fn(...arguments),fn的入参就是这个箭头函数的参</div>}
        <div>这是props.children[1]得到的是一个对象</div>
    </heroList>

```

### 布尔值、Null、Undefined都被忽略
```
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

### 给组件添加类型检查
```
方法一：需要装prop-type插件 
用法 MyComponent.propTypes = {
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
}

```

### ref.

#### 创建
```
    函数组件不需要用React.createRef()创建，class组件则需要。
```

#### 函数组件访问ref用法
```
    // 在函数组件中只能拿到绑定元素的dom (元素对象).
    import React from 'react';
    function CommonInput() {
        let inputDom = null;
        function clickBtn() {
            console.log(inputDom);
        }
        return (
            <div>
                <input type='text' ref={(e) => inputDom= e}>
                <button onClick={clickBtn}>
            </div>
        )
    }
```
#### 类组件访问ref用法
```
    // 在class组件中分两种情况。
    1. 绑定在非组件元素上获取到的是绑定元素的事件对象.
    2. 绑定在组件上获取到的是绑定组件的实例。既然能拿到实例那就很灵活了。
    3. 两种情况都绑定在ref.current属性上，并且无法获取到dom对象。
    详情见clock组件
    btnClick() {
        console.log(this.btnRef);
        console.log(this.h2Ref);
    }
    render() {
        return (
        <div>
            <h1>clock</h1>
            <h2 ref={this.h2Ref}>It is {this.state.date.toLocaleTimeString()}</h2>
            <Toggle ref={this.btnRef} />
            <button onClick={this.btnClick}>点击</button>
        </div>
        );
    }
```

#### ref={this.refObj} 与ref={(el) => this.refNode = el} (回调)
```
ref={el => this.refNode = el} 处理父组件无法获取子组件dom的情况
```

### 非受控组件
```
    给表单添加默认值defaultValue、defaultChecked
    file始终是一个非受控组件,应该使用File API与文件进行交互。
```

### 性能优化 
#### Chrome Performance 归档组件
```
在开发模式下，在支持的浏览器内使用性能工具可以直观的了解组件何时挂载，更新和卸载。
1.在项目地址栏内添加查询字符串 ?react_perf（例如， http://localhost:3000/?react_perf）。
2.打开Chrome开发工具Performance 标签页点击Record.
3.执行你想要分析的动作。不要记录超过20s，不然Chrome可能会挂起。
4.停止记录。
5.React事件将会被归类在 User Timing标签下。
```
#### 避免重复渲染
```
如果你知道在某些情况下你的组件不需要更新，你可以在shouldComponentUpdate内返回false来跳过整个渲染进程，
该进程包括了对该组件和之后的内容调用render()指令。
shouldComponentUpdate(nextProps,nextState) {
    // 这儿处理就比较灵活了，可以针对不同的条件来判断是否更新。
    return result
}
```

### 协调（Reconciliation）

#### 不同类型的DOM元素
```
    每当跟元素有不同类型，React将卸载旧树并重新构建新树。
    当树被卸载，旧的DOM节点将被销毁。组件实例会调用componentWillUnmount()。
    当构建一棵新树，新的DOM节点被插入到DOM中。
    组件实例将依次调用componentWillMount()和componentDidMount()。任何与旧树有关的状态都将丢弃。
    *这个根节点下所有的组件都将会被卸载，同时他们的状态将被销毁。
    <div> 
        <Counter/>
    </div>
    --- >
    <span> 
        <Counter/>
    </span>
```

#### 相同类型的DOM元素
```
    比较相同类型DOM元素的时候，React则会比较二者的属性，保持相同的底层DOM节点，并更新变化的属性。
    <div className='before' />
    <div className='after' />
    当更新style时，react同样知道仅更新变更的属性。
    <div style={{color: 'red', fontWeight: 'bold'}} />
    <div style={{color: 'green', fontWeight: 'bold'}} />
    在处理完DOM元素之后，React递归其子元素。
```

#### 相同类型的组件元素
```
    当组件更新时，实例仍保持一致，以让状态能够在渲染之间保留。React通过更新底层组件实例的props来产生新元素，并在底层实例上依次调用componentWillReceiveProps() 和 componentWillUpdate() 方法。
    接下来，render()方法被调用，同时对比算法会递归处理之前的结果和新的结果。
    *简单说就是props变化会触发componentWillReceiveProps()的调用 - > shouldComponentUpdate() --true-->  componentWillUpdate()
```    

#### 递归子节点
```
    React使用key来匹配原本树的子节点和新树的子节点。
    万不得已，你可以传递他们在数组中的索引作为key。若元素没有重排，该方法效果不错，但重排会使得其变慢。
    *当索引用作key时，组件状态在重新排序时也会有问题。组件实例基于key进行更新和重用。如果key是索引，则item的顺序变化会改变key值。
    这将导致非受控组件的状态可能会以意想不到的方式混淆和更新。
```

### Object.is() ，==，=== 的区别
```
    == 会进行隐式转换
    === 将数字值-0和+0视为相等，并认为Number.NaN不等于NaN。但Object.is()相等。 
```




