import Game from '../src/Game';
import Board from '../src/Board';
import Player from '../src/Player';

test('Switching players.', () => {
  const game = new Game(new Board());
  const playerX = new Player('John', 'X');
  const playerO = new Player('Jane', 'O');
  game.playerX = playerX;
  game.playerO = playerO;
  game.currentPlayer = playerX;

  game.switchPlayers();
  expect(game.currentPlayer).toBe(playerO);
  game.switchPlayers();
  expect(game.currentPlayer).toBe(playerX);
});
