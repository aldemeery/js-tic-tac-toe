import Evaluator from './Evaluator';
import Board from './Board';

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

export default UI;
