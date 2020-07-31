const Player = (function () {
  function Player(name, symbol, { color = '#fff' }) {
    this.name = name;
    this.symbol = symbol;
    this.color = color;
  }

  return Player;
})();

const Evaluator = (function () {
  function Evaluator(board, lastMove) {
    this.board = board;
    this.lastMove = lastMove;
  }

  Evaluator.prototype.isWinning = function () {
    const dimension = this.board.dimension;

    const rowIndex = this.getRow();
    const columnIndex = this.getColumn();

    const hasWinningRow = this.evaluate('nextRight', rowIndex * dimension);
    const hasWinningColumn = this.evaluate('nextBelow', columnIndex);
    let hasWinningDiagnoal = false;

    if (this.isOnDiagonal()) {
      hasWinningDiagnoal = this.evaluateDiagnoal();
    }

    return hasWinningRow || hasWinningColumn || hasWinningDiagnoal;
  };

  Evaluator.prototype.evaluateDiagnoal = function () {
    const diagonalIndex = this.getDiagnoal();
    return diagonalIndex === 0
      ? this.evaluate('nextRightDiagonal', 0)
      : this.evaluate('nextLeftDiagonal', this.board.dimension - 1);
  };

  Evaluator.prototype.evaluate = function (direction, index) {
    const cell = this.board.get(index);
    let isWinning = true;

    for (let i = 0; i < this.board.dimension - 1; i++) {
      index = this[direction](index);
      isWinning = isWinning && cell == this.board.get(index);
    }

    return isWinning;
  };

  Evaluator.prototype.nextRight = function (index) {
    return index + 1;
  };

  Evaluator.prototype.nextLeft = function (index) {
    return index - 1;
  };

  Evaluator.prototype.nextBelow = function (index) {
    return index + this.board.dimension;
  };

  Evaluator.prototype.nextLeftDiagonal = function (index) {
    return this.nextLeft(this.nextBelow(index));
  };

  Evaluator.prototype.nextRightDiagonal = function (index) {
    return this.nextRight(this.nextBelow(index));
  };

  Evaluator.prototype.getRow = function () {
    const rowIndex = parseInt(this.lastMove / this.board.dimension);

    return this.lastMove % this.board.dimension === 0 ? rowIndex - 1 : rowIndex;
  };

  Evaluator.prototype.getColumn = function () {
    const columnIndex = parseInt(this.lastMove % this.board.dimension);
    return this.lastMove % this.board.dimension === 0
      ? this.board.dimension - 1
      : columnIndex - 1;
  };

  Evaluator.prototype.getDiagnoal = function () {
    const column = this.getColumn();
    const row = this.getRow();

    if (column === row) {
      return 0;
    }

    if (column + row + 1 === this.board.dimension) {
      return this.board.dimension - 1;
    }

    return null;
  };

  Evaluator.prototype.isOnDiagonal = function () {
    const columnIndex = this.getColumn();
    const rowIndex = this.getRow();

    return (
      columnIndex === rowIndex ||
      columnIndex + rowIndex + 1 === this.board.dimension
    );
  };

  return Evaluator;
})();

const Board = (function () {
  function Board(dimension = 3) {
    this.dimension = dimension;
    this.board = new Array(dimension * dimension).fill(null);
  }

  Board.prototype.get = function (index) {
    return this.board[index];
  };

  Board.prototype.put = function (item, index) {
    this.board[index] = item;
  };

  return Board;
})();

