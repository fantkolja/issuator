import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
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

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
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
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      currentMove: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentMove + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      currentMove: history.length,
    });
  }

  jumpTo(i) {
    this.setState({
      currentMove: i,
      xIsNext: (i % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.currentMove];
    const winner = calculateWinner(current.squares);

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

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        { !winner && <Timer disable={winner} /> }
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      isStopped: false,
    };
    this.timerId = null;
  }

  tick() {
    if (!this.state.isStopped) {
      this.setState({
        time: new Date(),
      });
    }
  }

  componentDidMount() {
    console.log('didMount');
    this.timerId = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    console.log('willUnmount');
    clearInterval(this.timerId);
  }

  handleClick() {
    console.log('Timer toggled to', !this.state.isStopped);
    this.setState({
      isStopped: !this.state.isStopped,
    });
  }

  render() {
    return (
      <FormattedTime time={this.state.time} onClick={() => this.handleClick()} />
    );
  }
}

function FormattedTime(props) {
  return (
    <p onClick={props.onClick}>{props.time.toLocaleTimeString()}</p>
  );
}

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'const',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleSubmit(event) {
    alert(this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            placeholder="Enter your name..."
            value={this.state.name}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// ========================================

ReactDOM.render(
  <main>
    <Game />
    <MyForm />
  </main>,
  document.getElementById('root')
);
