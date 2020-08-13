import Board from '../src/Board';

test('Board construction', () => {
  const board = new Board();
  expect(board.board).toStrictEqual(new Array(9).fill(''));
  expect(board.dimension).toBe(3);
});

test('Getting cells from board', () => {
  const board = new Board();
  expect(board.get(1)).toBe('');
  board.board[1] = 'X';
  expect(board.get(1)).toBe('X');
});

test('Setting cells of board', () => {
  const board = new Board();
  board.put('X', 1);
  expect(board.get(1)).toBe('X');
});

test('Checkinf if a board is filled', () => {
  const board = new Board();
  expect(board.isFilled()).toBe(false);
  board.board = new Array(9).fill('X');
  expect(board.isFilled()).toBe(true);
});
