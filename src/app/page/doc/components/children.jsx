import React from 'react';
function Repeat(props) {
  let items = [];
  //   for (let i = 0; i < props.numTimes; i++) {
  //     items.push(props.children(i));
  //   }
  return (
    <div>
      {props.children[0]('哈哈', 123)}
      {props.children[1]}
    </div>
  );
}
function ListOfTenThings() {
  const a = [];
  let inputDom = null;
  // clickButton
  function clickBtn() {
    console.log(inputDom);
  }
  return (
    <div>
      <Repeat numTimes={10}>
        {(index, a) => (
          <div key={index}>This is item {index + a} in the list</div>
        )}
        <div>test</div>
      </Repeat>
      <div>{a.length > 0 && 'asd'}</div>
      <div>{a.length && 'asd'}</div>
      <input type="text" ref={a => {inputDom = a;}} />
      <input type="button" onClick={clickBtn} value='点击'/>
    </div>
  );
}

export default ListOfTenThings;
