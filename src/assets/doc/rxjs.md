#### 将事件改为rxjs监听
```
    const node$ = Rx.Observable.fromEvent(node, 'keyup');
```
#### 操作符zip
```
    const area$ = Rx.Observable.zip(width$,height$,(w,l)=> { return l*w});
    将多个流合并，当所有合并的流状态都发生变化时触发。
    ----1-------------2--------------
    -----------4--------------5------
    ---------(1,4)-----------(2,5)---
```
#### 操作符combineLatest
```
    const area$ = Rx.Observable.操作符combineLatest(width$,height$,(w,l)=> { return l*w});
    将多个流合并，任意一条流状态发生变化就触发但必须保证两个流都有值。
    ----1-------------2-----------------
    ----------4------------------5------
    --------(1,4)---(2,4)------(2,5)----
```