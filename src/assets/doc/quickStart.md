### 一、关于组件的使用

#### 1.props.children 与 props.attr
```
    children: 所有嵌入元素都会载入组件children位置，入口只有一个相对单一。 写法：组件内嵌套着写。
    attr: 可以自定义多个属性来提供入口，比较灵活。 写法： 元素上绑定属性，通过props传递。
    反思：组件可以接受任意元素，包括基础数据类型、React元素或函数。 相当于vue中的插槽,angular中的投影，angularJs也有类似的功能。
```

### 二、组件间的通信。

#### 1.父——>子组件通信
```
    子组件通过props接收父组件传递过来的参数进行通讯。
```
#### 2.子———>父组件通信
```
    *子组件通过props调用绑定的方法来进行通讯。
    *父组件调用子组件中指定的get方法。
```

#### 3.兄弟组件通讯
```
    兄弟组件通讯一般交给父组件来管理，具体： 当某个子组件发布信息时，调用父组件传过来的fn，setState({});
```

### 三、事件相关

#### 1.一些写法会影响性能
```
    class中定义了一些fn，在render中绑定这些方法的时候会有this指向的问题。
    解决方法一： 在constructor中 用bind绑定this。
    解决方法二： 在元素上绑定方法时用箭头函数绑定上下文。
    注意：方法二会存在性能问题，因为在每次渲染该组件的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。
    然而如果这个回调函数作为一个属性传给一个低阶组件（子组件）这些组件可能会进行额外的重新渲染。
```
#### 2.事件传参

```
    方法一：bind(this,param,e)。
    方法二：(e) => { this.fn(param, e) }。
    注意： 事件对象都应该位于参数中最后一位，fn中不传e(事件对象)时，会默认加上这个参。
```

### 表单相关

#### 1.表单少
```
    class SomeForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {value: ''};
            this.inputChange = this.inputChange.bind(this);
            this.inputSubmit = this.inputSubmit.bind(this);
        }
        inputChange(event) {
            this.setState({value: event.target.value});
        }
        inputSubmit(event) {
            console.log('value: ' + this.state.value);
            event.preventDefault();
        }
        render() {
            return(
                <form onSubmit={this.inputSubmit}>
                    <label>
                        Name: 
                        <input type='text' value={this.state.value} onChange={this.inputChange} >
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            )
        }
    }
```
#### 2.可控表单

```
    如果需要对表单进行一些正则匹配这类的操作则需要表单可控。
    改进。。。
    inputChange(event) {
        // 满足需求的相关code --> newValue
        // this.setState({value: newValue})
    }
```

#### 3.表单多

```
    constructor(props) {
        super(props);
        this.state({
            userName: 'hu',
            age: 26,
            jobState: true,
        })
        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ?  target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
            });
    }
    radioChange(e) {
        console.log(e.target.value);
    }

    render() {
        return (
            <form>
                <label>
                    userName:
                    <input type='text' name='userName' value={this.state.userName} onChange={this.inputChange}>
                </label>
                <label>
                    age:
                    <input type='text' name='age' value={this.state.age} onChange={this.inputChange}>
                </label>
                <div onChange={this.radioChange}>
                    <label>
                        jobState: 在职
                        <input type='radio' name='jobState' value='1' checked={this.state.jobState == 1} >
                    </label>
                    <label>
                        jobState: 离职
                        <input type='radio' name='jobState' value='0' checked={this.state.jobState == 0} >
                    </label>
                </div>
            </form>
        )
    }

```
### 三、列表组件
```
    function NumberList(props) {
        const numbers = this.props.numbers;
        const listItem = numbers.map((number,i) => {
            //  如果列表可以重新排序，不建议使用索引来进行排序
            return <li key={number.toString()}>{number}</li>;
        })
        return <ul>{listItem}</ul>
    }
```



