import Board from '../src/Board';
import Evaluator from '../src/Evaluator';

test('Board with winning row', () => {
  const board = new Board();

  let evaluator = new Evaluator(board, 3);
  expect(evaluator.isWinning()).toBe(false);

  board.board = ['X', 'X', 'X', 'O', 'O', '', '', '', ''];
  evaluator = new Evaluator(board, 3);
  expect(evaluator.isWinning()).toBe(true);
});

test('Board with winning column', () => {
  const board = new Board();

  let evaluator = new Evaluator(board, 7);
  expect(evaluator.isWinning()).toBe(false);

  board.board = ['X', 'O', 'O', 'X', '', '', 'X', '', ''];
  evaluator = new Evaluator(board, 7);
  expect(evaluator.isWinning()).toBe(true);
});

test('Board with winning diagonal', () => {
  const board = new Board();
  let evaluator = new Evaluator(board, 9);
  expect(evaluator.isWinning()).toBe(false);

  board.board = ['X', 'O', 'O', '', 'X', '', '', '', 'X'];
  evaluator = new Evaluator(board, 9);
  expect(evaluator.isWinning()).toBe(true);

  board.board = ['O', 'O', 'X', '', 'X', '', 'X', '', ''];
  evaluator = new Evaluator(board, 7);
  expect(evaluator.isWinning()).toBe(true);
});
