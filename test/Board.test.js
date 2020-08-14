import Board from '../src/Board';

describe('Board', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  test('Board construction', () => {
    expect(board.board).toStrictEqual(new Array(9).fill(''));
    expect(board.dimension).toBe(3);
  });

  test('Getting cells from board', () => {
    expect(board.get(1)).toBe('');
    board.board[1] = 'X';
    expect(board.get(1)).toBe('X');
  });

  test('Setting cells of board', () => {
    board.put('X', 1);
    expect(board.get(1)).toBe('X');
  });

  test('Checking if a board is filled', () => {
    expect(board.isFilled()).toBe(false);
    board.board = new Array(9).fill('X');
    expect(board.isFilled()).toBe(true);
  });
});
