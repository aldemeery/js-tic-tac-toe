import UI from './UI';
import Board from './Board';
import Player from './Player';

class Game {
  constructor(board) {
    this.board = board;
    this.playerX = null;
    this.playerO = null;
    this.currentPlayer = null;
    this.finished = false;
  }

  render() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((el, i) => {
      el.textContent = this.board.get(i);
    });
  }

  run() {
    const game = this;
    game.bootstrap();

    UI.registerEventListeners(game);
  }

  bootstrap() {
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
  }

  switchPlayers() {
    this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
  }
}

export default Game;
