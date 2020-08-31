class Board {
  constructor(dimension = 3) {
    this.dimension = dimension;
    this.board = new Array(dimension * dimension).fill('');
  }

  get(index) {
    return this.board[index];
  }

  put(item, index) {
    this.board[index] = item;
  }

  isFilled() {
    return this.board.filter(e => e).length === (this.dimension * this.dimension);
  }
}

export default Board;
