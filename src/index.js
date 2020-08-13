/* eslint-disable no-plusplus */
const Player = (function () {
  function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.score = 0;
  }

  return Player;
}());

const Evaluator = (function () {
  function Evaluator(board, lastMove) {
    this.board = board;
    this.lastMove = lastMove;
  }

  Evaluator.prototype.isWinning = function () {
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
      // eslint-disable-next-line eqeqeq
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
    const rowIndex = parseInt(this.lastMove / this.board.dimension, 10);

    return this.lastMove % this.board.dimension === 0 ? rowIndex - 1 : rowIndex;
  };

  Evaluator.prototype.getColumn = function () {
    const columnIndex = parseInt(this.lastMove % this.board.dimension, 10);
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
      columnIndex === rowIndex
      || columnIndex + rowIndex + 1 === this.board.dimension
    );
  };

  return Evaluator;
}());

const Board = (function () {
  function Board(dimension = 3) {
    this.dimension = dimension;
    this.board = new Array(dimension * dimension).fill('');
  }

  Board.prototype.get = function (index) {
    return this.board[index];
  };

  Board.prototype.put = function (item, index) {
    this.board[index] = item;
  };

  Board.prototype.isFilled = function () {
    return this.board.filter(e => e).length === (this.dimension * this.dimension);
  };

  return Board;
}());

const UI = (function () {
  const hideAnnouncement = () => {
    const announcementNode = document.querySelector('#announcement');
    announcementNode.style.display = 'none';
  };

  const displayWinner = (winner) => {
    const announcementNode = document.querySelector('#announcement');
    announcementNode.style.display = 'block';
    announcementNode.textContent = `${winner.name} wins!`;
  };

  const displayDraw = () => {
    const announcementNode = document.querySelector('#announcement');
    announcementNode.style.display = 'block';
    announcementNode.textContent = 'Draw!';
  };

  const displayPlayerInfo = (playerX, playerO) => {
    const p1NameNode = document.querySelector('#p1');
    const p2NameNode = document.querySelector('#p2');
    const p1ScoreNode = document.querySelector('#p1score');
    const p2ScoreNode = document.querySelector('#p2score');

    p1NameNode.textContent = playerX.name;
    p1ScoreNode.textContent = playerX.score;

    p2NameNode.textContent = playerO.name;
    p2ScoreNode.textContent = playerO.score;
  };

  const registerEventListeners = (game) => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((el) => {
      el.addEventListener('click', (e) => {
        const index = e.target.dataset.index - 1;
        if (!game.board.get(index) && !game.finished) {
          game.board.put(game.currentPlayer.symbol, index);
          game.render();
          const winning = new Evaluator(game.board, index + 1).isWinning();
          if (winning) {
            game.currentPlayer.score += 1;
            UI.displayPlayerInfo(game.playerX, game.playerO);
            UI.displayWinner(game.currentPlayer);
            game.finished = true;
          } else if (game.board.isFilled()) {
            UI.displayDraw();
          } else {
            game.switchPlayers();
          }
        }
      });
    });

    const settingBtn = document.querySelector('#settings');
    settingBtn.addEventListener('click', () => {
      const modal = document.querySelector('#modal');
      modal.style.display = 'block';
    });

    const resetBtn = document.querySelector('#reset');
    resetBtn.addEventListener('click', () => {
      game.currentPlayer = game.playerX;
      game.board = new Board();
      game.finished = false;
      game.render();
      UI.hideAnnouncement();
    });
  };

  return {
    hideAnnouncement,
    displayWinner,
    displayDraw,
    registerEventListeners,
    displayPlayerInfo,
  };
}());

const Game = (function () {
  function Game(board) {
    this.board = board;
    this.playerX = null;
    this.playerO = null;
    this.currentPlayer = null;
    this.finished = false;
  }

  Game.prototype.render = function () {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((el, i) => {
      el.textContent = this.board.get(i);
    });
  };

  Game.prototype.run = function () {
    const game = this;
    game.bootstrap();

    UI.registerEventListeners(game);
  };

  Game.prototype.bootstrap = function () {
    const game = this;
    document.getElementById('confirm').addEventListener('click', () => {
      const p1 = document.querySelector('#p1input');
      const p2 = document.querySelector('#p2input');

      const p1Name = p1.value || p1.placeholder;
      const p2Name = p2.value || p2.placeholder;

      document.querySelector('#modal').style.display = 'none';
      [game.playerX, game.playerO] = [new Player(p1Name, 'X'), new Player(p2Name, 'O')];
      game.currentPlayer = game.playerX;
      game.board = new Board();
      game.finished = false;
      game.render();
      UI.hideAnnouncement();

      UI.displayPlayerInfo(game.playerX, game.playerO);
    });
  };

  Game.prototype.switchPlayers = function () {
    this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
  };

  return Game;
}());

const game = new Game(new Board());
game.run();
