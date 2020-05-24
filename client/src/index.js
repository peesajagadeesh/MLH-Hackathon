import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
class Square extends React.Component {

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square index={i} value={this.props.valueArray[i]} onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
        <div className="status">{this.props.status}</div>
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        valueArray: Array(9).fill(null)
      }],
      current: 'X',
      stepNumber: 0
    }
    this.handlePressEvent = this.handlePressEvent.bind(this);
  }

  handlePressEvent(index) {
    var history = this.state.history;
    var step = this.state.stepNumber;
    var valueArray = history[step].valueArray.slice();
    if(valueArray[index] || this.calculateWinner(valueArray)) return;
    valueArray[index] = this.state.current;
    history[step + 1] = { valueArray: valueArray };
    var current = this.state.current === 'X' ? 'O' : 'X';
    this.setState({
      history: history,
      current: current,
      stepNumber: step+1
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(step) {
    var history = this.state.history.splice(0, step+1);
    this.setState({
      stepNumber: step,
      current: (step % 2) === 0 ? 'X' : 'O',
      history: history
    });
  }

  render() {
    var history = this.state.history;
    var valueArray = history[this.state.stepNumber].valueArray;

    const winner = this.calculateWinner(valueArray);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.current === 'X' ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    
    return (
      <div className="game">
        <div className="game-board">
          <Board valueArray = {valueArray} onClick = {(i) => this.handlePressEvent(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
