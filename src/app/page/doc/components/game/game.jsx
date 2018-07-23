import React, { Component } from 'react'

class Square extends Component {
    render() {
      return <button className="square">{this.props.value}</button>;
    }
  }

  
  export default class Board extends Component {
    const status = 'Next player: X';
    renderSquare(i) {
        return <Square value={i} /> 
    }
    render() {
        return (
            <div>
              <div className="status">{status}</div>
              <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
              </div>
              <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
              </div>
              <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
              </div>
            </div>
          );
  }
}

export default class Game extends Component {
    render() {
        return (
           <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
        )
    }
}
