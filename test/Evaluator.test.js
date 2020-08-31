import Board from '../src/Board';
import Evaluator from '../src/Evaluator';

describe('Evaluating winning boards', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  test('Board with winning row', () => {
    let evaluator = new Evaluator(board, 3);
    expect(evaluator.isWinning()).toBe(false);

    board.board = ['X', 'X', 'X', 'O', 'O', '', '', '', ''];
    evaluator = new Evaluator(board, 3);
    expect(evaluator.isWinning()).toBe(true);
  });

  test('Board with winning column', () => {
    let evaluator = new Evaluator(board, 7);
    expect(evaluator.isWinning()).toBe(false);

    board.board = ['X', 'O', 'O', 'X', '', '', 'X', '', ''];
    evaluator = new Evaluator(board, 7);
    expect(evaluator.isWinning()).toBe(true);
  });

  test('Board with winning diagonal', () => {
    let evaluator = new Evaluator(board, 9);
    expect(evaluator.isWinning()).toBe(false);

    board.board = ['X', 'O', 'O', '', 'X', '', '', '', 'X'];
    evaluator = new Evaluator(board, 9);
    expect(evaluator.isWinning()).toBe(true);

    board.board = ['O', 'O', 'X', '', 'X', '', 'X', '', ''];
    evaluator = new Evaluator(board, 7);
    expect(evaluator.isWinning()).toBe(true);
  });
});
