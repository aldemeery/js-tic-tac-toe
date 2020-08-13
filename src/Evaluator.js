class Evaluator {
  constructor(board, lastMove) {
    this.board = board;
    this.lastMove = lastMove;
  }

  isWinning() {
    const { dimension } = this.board;

    const rowIndex = this.getRow();
    const columnIndex = this.getColumn();

    const hasWinningRow = this.evaluate('nextRight', rowIndex * dimension);
    const hasWinningColumn = this.evaluate('nextBelow', columnIndex);
    let hasWinningDiagnoal = false;

    if (this.isOnDiagonal()) {
      hasWinningDiagnoal = this.evaluateDiagnoal();
    }

    return hasWinningRow || hasWinningColumn || hasWinningDiagnoal;
  }

  evaluateDiagnoal() {
    const diagonalIndex = this.getDiagnoal();
    return diagonalIndex === 0
      ? this.evaluate('nextRightDiagonal', 0)
      : this.evaluate('nextLeftDiagonal', this.board.dimension - 1);
  }

  evaluate(direction, index) {
    const cell = this.board.get(index);
    let isWinning = true;

    for (let i = 0; i < this.board.dimension - 1; i += 1) {
      index = this[direction](index);
      // eslint-disable-next-line eqeqeq
      isWinning = isWinning && cell == this.board.get(index);
    }

    return isWinning;
  }

  // eslint-disable-next-line
  nextRight(index) {
    return index + 1;
  }

  // eslint-disable-next-line
  nextLeft(index) {
    return index - 1;
  }

  nextBelow(index) {
    return index + this.board.dimension;
  }

  nextLeftDiagonal(index) {
    return this.nextLeft(this.nextBelow(index));
  }

  nextRightDiagonal(index) {
    return this.nextRight(this.nextBelow(index));
  }

  getRow() {
    const rowIndex = parseInt(this.lastMove / this.board.dimension, 10);

    return this.lastMove % this.board.dimension === 0 ? rowIndex - 1 : rowIndex;
  }

  getColumn() {
    const columnIndex = parseInt(this.lastMove % this.board.dimension, 10);
    return this.lastMove % this.board.dimension === 0
      ? this.board.dimension - 1
      : columnIndex - 1;
  }

  getDiagnoal() {
    const column = this.getColumn();
    const row = this.getRow();

    if (column === row) {
      return 0;
    }

    if (column + row + 1 === this.board.dimension) {
      return this.board.dimension - 1;
    }

    return null;
  }

  isOnDiagonal() {
    const columnIndex = this.getColumn();
    const rowIndex = this.getRow();

    return (
      columnIndex === rowIndex
      || columnIndex + rowIndex + 1 === this.board.dimension
    );
  }
}

export default Evaluator;
